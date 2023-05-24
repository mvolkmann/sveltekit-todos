<script lang="ts">
  import Todo from '../components/Todo.svelte';

  export let data;
  let todos = data.todos;

  let lastId = 0;

  // This is a function that creates a todo object.
  const createTodo = (text, done = false) => ({ id: ++lastId, text, done });

  let todoText = '';

  // This is recomputed when the todos array changes.
  $: uncompletedCount = todos.filter((t) => !t.done).length;

  // This is recomputed when the todos array or uncompletedCount changes.
  $: status = `${uncompletedCount} of ${todos.length} remaining`;

  function addTodo() {
    todos.push(createTodo(todoText));
    todos = todos; // triggers reactivity
    todoText = ''; // clears the input
  }

  // This keeps all the todos that are not done.
  const archiveCompleted = () => (todos = todos.filter((t) => !t.done));

  // This deletes the todo with a given id.
  async function deleteTodo(todoId: number) {
    try {
      const url = '/?id=' + todoId;
      console.log('+page.svelte deleteTodo: url =', url);
      const res = await fetch(url, { method: 'DELETE' });
      console.log('+page.svelte deleteTodo: res =', res);
      if (!res.ok) throw new Error(await res.text());
    } catch (e) {
      console.log('+page.svelte deleteTodo: e =', e);
    }
  }

  function toggleDone(todo) {
    const { id } = todo;
    todos = todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
  }
</script>

<div>
  <h1>To Do List</h1>
  <div>
    {status}
    <button on:click={archiveCompleted}>Archive Completed</button>
  </div>
  <form method="POST">
    <input
      name="text"
      placeholder="enter new todo here"
      size="30"
      bind:value={todoText}
    />
    <button disabled={!todoText}>Add</button>
  </form>
  <ul>
    {#each todos as todo}
      <Todo
        {todo}
        on:delete={() => deleteTodo(todo.id)}
        on:toggleDone={() => toggleDone(todo)}
      />
    {/each}
  </ul>
</div>

<style>
  button {
    margin-left: 1rem;
  }

  h1 {
    margin-top: 0;
  }

  ul {
    list-style: none; /* removes bullets */
    margin-left: 0;
    padding-left: 0;
  }
</style>
