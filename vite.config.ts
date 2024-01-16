/**@type{import('vite').UserConfig} */
import { rezact } from "@rezact/rezact/vite-plugin";
import { rezact_mdx } from "@rezact/rezact/vite-mdx-plugin";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import rehypeHighlight from "rehype-highlight";
import mdx from "@mdx-js/rollup";

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
  ],
};
