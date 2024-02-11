import { CodeEditor } from "src/components/CodeEditor";
import { rezact } from "src/lib/rezact/vite-plugin";
import * as prettier from "prettier/standalone";
import prettierPluginBabel from "prettier/plugins/babel";
import prettierPluginEstree from "prettier/plugins/estree";

const rzVite: any = rezact();

let runIfIdle;

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function Page() {
  console.log(rzVite);
  const editorRef: any = {};
  const outputRef: any = {};

  const mnt = async () => {
    console.log("mounted");
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/esbuild-wasm@0.20.0/lib/browser.min.js";
    document.head.appendChild(script);

    let esbuild;
    while (!esbuild) {
      await delay(100);
      esbuild = window["esbuild"];
    }

    esbuild
      .initialize({
        wasmURL:
          "https://cdn.jsdelivr.net/npm/esbuild-wasm@0.20.0/esbuild.wasm",
      })
      .then(() => {
        const output = document.querySelector("#output .outer");
        let debounceTimeout: any = 0;
        let isRunning = false;
        let needsRun = false;

        const input = editorRef.elm;
        input.editor.onKeyUp(() => {
          clearTimeout(debounceTimeout);
          debounceTimeout = setTimeout(runIfIdle, 50);
        });

        runIfIdle = async () => {
          clearTimeout(debounceTimeout);

          if (isRunning) {
            needsRun = true;
            return;
          }

          isRunning = true;
          needsRun = false;

          const inputValue = input.editor.getValue();
          var code, warnings, errors;
          try {
            ({ code, warnings } = await esbuild.transform(inputValue, {
              target: "esnext",
              loader: "tsx",
              jsxFactory: "xCreateElement",
              jsxFragment: "xFragment",
            }));
          } catch (error) {
            ({ errors, warnings } = error);
            if (!errors) {
              output.textContent = (error && error.message) || error + "";
              isRunning = false;
              if (needsRun) runIfIdle();
              return;
            }
          }
          if (warnings)
            warnings = await esbuild.formatMessages(warnings, {
              kind: "warning",
              color: false,
            });
          if (errors)
            errors = await esbuild.formatMessages(errors, {
              kind: "error",
              color: false,
            });

          if (
            (warnings && warnings.length > 0) ||
            (errors && errors.length > 0)
          ) {
            console.log(warnings, errors);
            outputRef.elm.editor.setValue(warnings + "\n" + errors);
            isRunning = false;
            if (needsRun) runIfIdle();
            return;
          }

          const results = rzVite.transform(code, "test.tsx");
          const formatted = await prettier.format(
            results.code.replaceAll("/* @__PURE__ */ ", ""),
            {
              parser: "babel",
              plugins: [prettierPluginBabel, prettierPluginEstree],
            },
          );

          outputRef.elm.editor.setValue(formatted);
          document.getElementById("rezact-output-script")?.remove();
          const script = document.createElement("script");
          script.id = "rezact-output-script";
          script.type = "module";
          script.textContent =
            formatted +
            `
            const output = document.getElementById("rezact-playground-output")
            const shadow = output.shadowRoot || output.attachShadow({ mode: "open" })
            let shadowDiv = shadow.getElementById("shadow-div");
            if (!shadowDiv) {
              shadowDiv = document.createElement("div")
              shadowDiv.id = "shadow-div"
              shadow.appendChild(shadowDiv)
            }
            try {
              render(shadowDiv, App)
            } catch (e) {
              const error = shadowDiv.getElementById("error") || document.createElement("pre")
              error.id = "error"
              error.textContent = e.stack
              shadowDiv.appendChild(error)
            }
          `;
          document.body.appendChild(script);

          isRunning = false;
          if (needsRun) runIfIdle();
        };

        runIfIdle();
      });
  };
  return (
    <div>
      <div
        class="flex"
        onMount={() => {
          document.head.parentElement!.className = "h-full bg-zinc-200";
        }}
      >
        <div class=" w-1/2">
          <CodeEditor ref={editorRef} class="" />
        </div>
        <div class="w-1/2">
          <CodeEditor ref={outputRef} class="" />
        </div>
      </div>
      <div id="rezact-playground-output"></div>
      <span onMount={mnt}></span>
    </div>
  );
}
