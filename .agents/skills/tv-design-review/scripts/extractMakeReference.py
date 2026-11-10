#!/usr/bin/env python3
"""Extract a Figma Make reference as data without running its application."""

import argparse
import io
import json
import re
import subprocess
import sys
from pathlib import Path
from zipfile import BadZipFile, ZipFile


def write_file(root, name, data):
    target = root / name
    if not target.resolve().is_relative_to(root.resolve()):
        raise ValueError(f"Archive path escapes output directory: {name!r}")
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_bytes(data)


def git(repository, *args, data=None):
    return subprocess.run(
        ["git", f"--git-dir={repository}", *args],
        input=data,
        capture_output=True,
        check=True,
    ).stdout


def extract_repository(data, output, index):
    repository = output / "repositories" / f"repo{index}.git"
    sources = output / "sources" / f"repo{index}"
    subprocess.run(
        ["git", "init", "--bare", str(repository)],
        capture_output=True,
        check=True,
    )
    with ZipFile(io.BytesIO(data)) as archive:
        commit = json.loads(archive.read("manifest.json"))["commit_sha"]
        if not isinstance(commit, str) or not re.fullmatch(r"[0-9a-f]{40}", commit):
            raise ValueError("Invalid commit SHA in repository manifest")
        for name in archive.namelist():
            if name.endswith(".pack"):
                git(repository, "index-pack", "--stdin", data=archive.read(name))

    count = 0
    for record in git(repository, "ls-tree", "-r", "-z", commit).split(b"\0"):
        if not record:
            continue
        attributes, name = record.split(b"\t", 1)
        mode, kind, object_id = attributes.split(b" ", 2)
        if kind != b"blob" or mode not in (b"100644", b"100755"):
            continue
        contents = git(repository, "cat-file", "blob", object_id.decode("ascii"))
        write_file(sources, name.decode("utf-8"), contents)
        count += 1
    return {
        "commit": commit,
        "sourceDirectory": str(sources.relative_to(output)),
        "files": count,
    }


def extract(source, output):
    output.mkdir(parents=True, exist_ok=False)
    reference = {"file": source.name, "repositories": []}
    with ZipFile(source) as archive:
        names = archive.namelist()
        for name in ("meta.json", "thumbnail.png"):
            if name in names:
                write_file(output, name, archive.read(name))
        for name in names:
            if name.startswith("images/") and not name.endswith("/"):
                write_file(output, name, archive.read(name))
        repositories = sorted(
            name for name in names
            if name.startswith("make_repos/") and name.endswith(".zip")
        )
        for index, name in enumerate(repositories, start=1):
            entry = extract_repository(archive.read(name), output, index)
            reference["repositories"].append({"archive": name, **entry})
    write_file(
        output,
        "reference.json",
        (json.dumps(reference, ensure_ascii=False, indent=2) + "\n").encode(),
    )
    return reference


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=Path, help="Path to a .make archive")
    parser.add_argument("--output", required=True, type=Path, help="New output directory")
    args = parser.parse_args()
    try:
        reference = extract(args.source.resolve(), args.output.resolve())
    except (OSError, ValueError, KeyError, BadZipFile, subprocess.CalledProcessError) as error:
        print(f"Cannot extract reference: {error}", file=sys.stderr)
        return 1
    print(json.dumps({"output": str(args.output.resolve()), **reference}, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    sys.exit(main())
