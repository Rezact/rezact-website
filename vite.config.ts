/**@type{import('vite').UserConfig} */
import { rezact } from "@rezact/rezact/vite-plugin";
import { rezact_mdx } from "@rezact/rezact/vite-mdx-plugin";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import rehypeHighlight from "rehype-highlight";
import mdx from "@mdx-js/rollup";
import { resolve } from "path";
import * as fs from "fs";
import * as path from "path";
import { routes } from "./src/routes";

function writeToFileSync(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
}

function rezactBuild() {
  return {
    name: "rezact-build",

    writeBundle(options, bundle) {
      const indexFilePath = resolve(__dirname, "index.html");
      const _idxFileText = fs.readFileSync(indexFilePath, "utf-8");

      const bundleMapped = {};
      Object.keys(bundle).forEach((key) => {
        const path = bundle[key].facadeModuleId?.replace(/\.(tsx|jsx)$/, "");
        if (path) bundleMapped[path] = bundle[key];
      });

      const mappedRoutes = routes.map((route) => {
        const path = route.component.toString().split(/["'`]/)[1];
        const resolvedPath = resolve(__dirname, path);
        const htmlFilePath = __dirname + "/dist" + route.path + ".html";
        if (route.path !== "/" && !route.path.includes(":")) {
          let idxFileText = _idxFileText;
          writeToFileSync(htmlFilePath, idxFileText);
        }
      });
      // fs.writeFileSync("bundle.json", JSON.stringify(bundle, null, 2));
    },
  };
}

export default {
  resolve: {
    alias: {
      src: "/src",
      rezact: "@rezact/rezact",
    },
  },
  build: {
    target: "esnext",
    modulePreload: {
      polyfill: false,
    },
  },
  esbuild: {
    jsxFactory: "xCreateElement",
    jsxFragment: "xFragment",
  },
  plugins: [
    mdx({
      pragma: "r.xCreateElement",
      pragmaFrag: "r.xFragment",
      jsxRuntime: "classic",
      pragmaImportSource: "@rezact/rezact/mdx",
      remarkPlugins: [
        remarkFrontmatter,
        [remarkMdxFrontmatter, { name: "fm" }],
      ],
      rehypePlugins: [rehypeHighlight],
    }),
    rezact(),
    rezact_mdx(),
    rezactBuild(),
  ],
};
