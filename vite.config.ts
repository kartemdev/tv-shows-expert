import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev
export default defineConfig({
	base: "/tv-shows-expert/",
	plugins: [react(), tsconfigPaths()],
	server: {
		port: 3000,
		open: true,
	},
	build: {
		outDir: "dist",
		sourcemap: false,
		minify: "esbuild",
	},
});
