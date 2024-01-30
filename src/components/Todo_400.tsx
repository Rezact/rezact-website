import { Btn } from "./Buttons";
import { Form } from "./Form";
import { Input } from "./ValidatorInput";
import { $todos } from "./todoData";

function Radio({ label, id, checked }) {
  return (
    <div>
      <input type="radio" id={id} value={id} checked={checked} />
      <label for={id}>{label}</label>
    </div>
  );
}

export function Todo400() {
  const addTodo = (data) => {
    $todos.push({ $text: data.newTodo, $completed: false });
  };

  let $filter = "all";
  let $filteredTodos = $todos.filter(($todo) => {
    if ($filter === "all") return true;
    if ($filter === "completed") return $todo.$completed;
    if ($filter === "todo") return !$todo.$completed;
  });

  return (
    <div class="m-4 rounded-lg bg-zinc-300 p-8 drop-shadow-xl">
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

      <Form onSubmit={addTodo}>
        <Input placeholder="Add Todo" name="newTodo" required />
        <Btn type="submit" class="mt-2 w-full">
          Add
        </Btn>
      </Form>
    </div>
  );
}

function TodoItem({ $todo, $idx }) {
  const $completedStyle = $todo.$completed
    ? "text-decoration: line-through;"
    : "";

  const deleteTodo = (todo) => {
    const idx = $todos.indexOf(todo);
    $todos.splice(idx, 1);
  };

  let $idxPlusOne = $idx + 1;

  return (
    <div style={$completedStyle} class="max-w-96 leading-7">
      <span>
        {$idxPlusOne} - {$todo.$text}
      </span>

      <Btn
        class="float-right ml-2 "
        size="xs"
        color="danger"
        onClick={() => deleteTodo($todo)}
      >
        X
      </Btn>
      <input type="checkbox" class="float-right" checked={$todo.$completed} />
    </div>
  );
}
