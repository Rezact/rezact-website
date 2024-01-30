import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import { Btn } from "./Buttons";

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "json") {
      return new jsonWorker();
    }
    if (label === "css" || label === "scss" || label === "less") {
      return new cssWorker();
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return new htmlWorker();
    }
    if (label === "typescript" || label === "javascript") {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

// extra libraries
var libSource = `
declare class MySession {
    static token: string;
}
`;

var libUri = "ts:filename/mysession.d.ts";
monaco.languages.typescript.javascriptDefaults.addExtraLib(libSource, libUri);
// When resolving definitions and references, the editor will try to use created models.
// Creating a model for the library allows "peek definition/references" commands to work with the library.
monaco.editor.createModel(libSource, "typescript", monaco.Uri.parse(libUri));

const executeAction = {
  id: "run-code",
  label: "Run Code",
  keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
  run: function () {
    // Your code execution logic here
    // in this case do nothing as the key stroke is handled by the parent element to the editor
  },
};

monaco.editor.addEditorAction(executeAction);

const code =
  localStorage.getItem("code") ||
  `
(async () => {
    // Async operations here
    await fetch("/")
    // More code here
})();
`;

export function CodeEditor() {
  let editor: any = {};
  let output: any = {};
  const codeEdit = (elm) => {
    const code = elm.innerText;
    elm.innerText = "";
    elm.editor = monaco.editor.create(elm, {
      value: code,
      language: elm.dataset.lang || "typescript",
      theme: "vs-dark",
    });
  };

  //   const toggleTheme = () => {
  //     const theme = editor._themeService._theme.id;
  //     if (theme === "vs-dark") {
  //       editor.updateOptions({
  //         theme: "vs",
  //       });
  //     } else {
  //       editor.updateOptions({
  //         theme: "vs-dark",
  //       });
  //     }
  //   };

  const run = async () => {
    const code = editor.elm.editor.getValue();
    localStorage.setItem("code", code);
    try {
      const originalConsoleLog = console.log;
      //   const originalConsoleError = console.error;
      console.log = (...args) => {
        args.forEach((arg) => {
          originalConsoleLog(arg);
          const currentEditorValue = output.elm.editor.getValue();
          const argStr = typeof arg === "string" ? arg : JSON.stringify(arg);
          output.elm.editor.setValue(currentEditorValue + "\n" + argStr);
        });
      };

      output.elm.editor.setValue("");
      await eval?.(code);
      console.log = originalConsoleLog;
    } catch (err: any) {
      output.elm.editor.setValue(err.message);
    }
  };

  const keyDown = (ev) => {
    if (ev.ctrlKey && ev.key === "Enter") {
      ev.preventDefault();
      run();
    }

    if (ev.ctrlKey && ev.key === "s") {
      ev.preventDefault();
      const code = editor.elm.editor.getValue();
      localStorage.setItem("code", code);
    }
  };

  return (
    <>
      <div
        ref={editor}
        onKeyDown={keyDown}
        class=" h-64 w-full whitespace-pre"
        onMount={codeEdit}
      >
        {code}
      </div>
      <div
        ref={output}
        onKeyDown={keyDown}
        data-lang="plaintext"
        class="mt-2 h-64 w-full whitespace-pre"
        onMount={codeEdit}
      >
        {"// Output"}
      </div>
      <div
        onKeyDown={keyDown}
        data-lang="plaintext"
        class="mt-2 h-64 w-full whitespace-pre"
        onMount={codeEdit}
      >
        {"// Output"}
      </div>

      <div
        onKeyDown={keyDown}
        data-lang="plaintext"
        class="mt-2 h-64 w-full whitespace-pre"
        onMount={codeEdit}
      >
        {"// Output"}
      </div>

      <div class="mt-2 flex gap-2">
        {/* <Btn onClick={toggleTheme}>Toggle Theme</Btn> */}
        <Btn onClick={run}>Run</Btn>
      </div>
    </>
  );
}
