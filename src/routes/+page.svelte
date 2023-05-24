<script lang="ts">
  import { type Todo } from '../types';
  import { enhance } from '$app/forms';
  import TodoRow from '../components/TodoRow.svelte';

  export let data;
  let todos = data.todos;

  let todoText = '';

  // This is recomputed when the todos array changes.
  $: uncompletedCount = todos.filter((t) => !t.done).length;

  // This is recomputed when the todos array or uncompletedCount changes.
  $: status = `${uncompletedCount} of ${todos.length} remaining`;

  async function deleteTodo(todoId: number) {
    try {
      const url = '/?id=' + todoId;
      const res = await fetch(url, { method: 'DELETE' });
      if (!res.ok) throw new Error(await res.text());
      todos = todos.filter((todo: Todo) => todo.id !== todoId);
    } catch (e) {
      console.log('+page.svelte deleteTodo: e =', e);
    }
  }

  async function updateTodo(todo: Todo) {
    console.log('+page.svelte updateTodo: todo =', todo);
    try {
      const url = '/?id=' + todo.id;
      const res = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(todo)
      });
      if (!res.ok) throw new Error(await res.text());
    } catch (e) {
      console.log('+page.svelte updateTodo: e =', e);
    }
  }
</script>

<div>
  <h1>To Do List</h1>
  <div>{status}</div>
  <!-- use:enhance breaks automatic update of todo list after one is added. -->
  <!-- <form method="POST" use:enhance> -->
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
      <TodoRow
        {todo}
        on:delete={() => deleteTodo(todo.id)}
        on:update={() => updateTodo(todo)}
      />
    {/each}
  </ul>
</div>

<style>
  button {
    margin-left: 1rem;
    padding: 0.5rem;
  }

  form {
    margin-bottom: 1rem;
    margin-top: 1rem;
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
