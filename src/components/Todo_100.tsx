import { $todos } from "./todoData";

export function Todo100() {
  return (
    <div class="m-4 rounded-lg bg-zinc-300 p-8 drop-shadow-xl">
      <h1>Todo List</h1>
      <p>{$todos.length} Todos</p>

      {$todos.map(($todo, $idx) => (
        <TodoItem $todo={$todo} $idx={$idx} />
      ))}
    </div>
  );
}

function TodoItem({ $todo, $idx }) {
  const $completedStyle = $todo.$completed
    ? "text-decoration: line-through;"
    : "";

  return (
    <div style={$completedStyle} class="max-w-96">
      <span>
        {$idx + 1} - {$todo.$text}
      </span>

      <input type="checkbox" class="float-right" checked={$todo.$completed} />
    </div>
  );
}
