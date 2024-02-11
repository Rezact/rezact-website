import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

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

let $todos = [
  { $text: "Learn Rezact", $completed: false },
  { $text: "Learn TypeScript", $completed: true },
  { $text: "Build something awesome", $completed: false },
];

function App() {
  let $filter = "all";
  let $filteredTodos = $todos.filter(($todo) => {
    if ($filter === "all") return true;
    if ($filter === "completed") return $todo.$completed;
    if ($filter === "todo") return !$todo.$completed;
  });

  let $newTodoText = "";

  const addTodo = (ev) => {
    ev.preventDefault();
    if ($newTodoText.trim() === "") return;

    $todos.push({ $text: $newTodoText, $completed: false });
    $newTodoText = "";
  };

  const clearCompleted = () => {
    const completed = $todos.filter(($todo) => $todo.$completed);
    completed.forEach(($todo) => $todos.deleteValue($todo));
  };

  const checkAll = () => {
    const areAllMarked = $todos.every(($todo) => $todo.$completed);
    $todos.forEach(({ value }) => {
      value.$completed = !areAllMarked;
    });
  };

  return (
    <div style="padding: 20px">
      <h1>Todo List</h1>
      <p>{$todos.length} Todos</p>

      <fieldset>
        <legend>Filter:</legend>
        <Radio label="Show All" id="all" checked={$filter} />
        <Radio label="Show Completed" id="completed" checked={$filter} />
        <Radio label="Show Todo" id="todo" checked={$filter} />
      </fieldset>

      {$filteredTodos.map(($todo, $idx) => (
        <TodoItem $todo={$todo} $idx={$idx} />
      ))}

      <form onSubmit={addTodo}>
        <input placeholder="Add Todo" value={$newTodoText} />
        <button onClick={addTodo}>Add</button>
      </form>

      <button onClick={clearCompleted}>Remove Completed</button>
      <button onClick={checkAll}>Check All</button>
    </div>
  );
}

let currentEditingTodo = null;
function editModeClickListener(ev) {
  if (ev.target === currentEditingTodo.editInput) return;
  currentEditingTodo.editing.set(false);
  document.removeEventListener("click", editModeClickListener);
}

function TodoItem({ $todo, $idx }) {
  let $editing = false;

  const deleteTodo = ($todo) => {
    $todos.deleteValue($todo);
  };

  const closeOnEnter = (ev) => {
    if (ev.key !== "Enter") return;
    $editing = false;
    document.removeEventListener("click", editModeClickListener);
  };

  const editInput = <input onKeyDown={closeOnEnter} value={$todo.$text} />;

  const setEditing = () => {
    $editing = !$editing;
    const editing = $editing;
    currentEditingTodo = { editInput, editing };
    document.addEventListener("click", editModeClickListener);
    editInput.setSelectionRange(0, editInput.value.length);
    editInput.focus();
  };

  let $idxPlusOne = $idx + 1;

  return (
    <div style={\`\${$todo.$completed ? "text-decoration: line-through;" : ""}\`}>
      {$editing && editInput}
      {!$editing && (
        <span onDblClick={setEditing}>
          {$idxPlusOne} - {$todo.$text}
        </span>
      )}
      <input type="checkbox" checked={$todo.$completed} />
      <button onClick={() => deleteTodo($todo)}>X</button>
    </div>
  );
}

function Radio({ label, id, checked }) {
  return (
    <div>
      <input type="radio" id={id} value={id} checked={checked} />
      <label for={id}>{label}</label>
    </div>
  );
}


`;

export function CodeEditor({ ref: editor }: { ref: any }) {
  const codeEdit = (elm) => {
    const code = elm.innerText;
    elm.innerText = "";
    elm.editor = monaco.editor.create(elm, {
      value: code,
      language: elm.dataset.lang || "javascript",
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

  const keyDown = (ev) => {
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
        class=" h-[50vh] w-full whitespace-pre"
        onMount={codeEdit}
      >
        {code}
      </div>
    </>
  );
}
