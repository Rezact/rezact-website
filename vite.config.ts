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
const isBuild = process.env.npm_lifecycle_event === "build";

let rollupInput = {};
if (isBuild) {
  const indexFilePath = resolve(__dirname, "index.html");
  const _idxFileText = fs.readFileSync(indexFilePath, "utf-8");

  const mappedRoutes = routes.map((route) => {
    const htmlFilePath = __dirname + route.path + ".html";
    if (route.path !== "/" && !route.path.includes(":")) {
      let idxFileText = _idxFileText;
      writeToFileSync(htmlFilePath, idxFileText);
      rollupInput[route.path.replace(/\//g, "")] = resolve(htmlFilePath);
    }
  });
}

function writeToFileSync(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
}

function deleteFileAndEmptyDirs(filePath) {
  // Delete the file
  fs.unlinkSync(filePath);

  // Recursively remove parent directories if empty
  let dirPath = path.dirname(filePath);
  while (dirPath !== path.resolve(dirPath, "..")) {
    if (fs.readdirSync(dirPath).length === 0) {
      fs.rmdirSync(dirPath);
      dirPath = path.resolve(dirPath, "..");
    } else {
      break;
    }
  }
}

function rezactBuild({ routes }) {
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
        const htmlFilePath = __dirname + route.path + ".html";
        if (route.path !== "/" && !route.path.includes(":")) {
          let idxFileText = _idxFileText;
          deleteFileAndEmptyDirs(htmlFilePath);
        }
      });
      // fs.writeFileSync("bundle.json", JSON.stringify(bundle, null, 2));
    },
  };
}

console.log("rollupInput", rollupInput);

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
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        ...rollupInput,
      },
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
    rezactBuild({ routes }),
  ],
};
