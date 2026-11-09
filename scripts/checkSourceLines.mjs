import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative, resolve } from "node:path";

const maxLines = 120;
const sourceExtensions = new Set([
	".ts",
	".tsx",
	".js",
	".jsx",
	".mts",
	".cts",
	".mjs",
	".cjs",
]);

async function collectSourceFiles(directory) {
	const entries = await readdir(directory, { withFileTypes: true });
	const files = [];

	for (const entry of entries) {
		const entryPath = join(directory, entry.name);

		if (entry.isDirectory()) {
			files.push(...(await collectSourceFiles(entryPath)));
		} else if (entry.isFile() && sourceExtensions.has(extname(entry.name))) {
			files.push(entryPath);
		}
	}

	return files.sort();
}

async function main() {
	const sourceRoot = resolve(process.argv[2] ?? "src");
	const files = await collectSourceFiles(sourceRoot);
	let violations = 0;

	for (const filePath of files) {
		const source = await readFile(filePath, "utf8");
		const lines = source === "" ? [] : source.split(/\r\n|\r|\n/);
		const lineCount = lines.length - Number(/(?:\r\n|\r|\n)$/.test(source));

		if (lineCount > maxLines) {
			console.error(
				`${relative(process.cwd(), filePath)}: ${lineCount} строк, лимит ${maxLines}`,
			);
			violations += 1;
		}
	}

	console.log(
		`Проверено файлов: ${files.length}. Превышений лимита: ${violations}.`,
	);
	process.exitCode = violations > 0 ? 1 : 0;
}

main().catch((error) => {
	console.error(`Не удалось проверить исходники: ${error.message}`);
	process.exitCode = 1;
});
