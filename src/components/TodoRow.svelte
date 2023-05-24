<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';
  import type { Todo } from '../types';

  const dispatch = createEventDispatcher();

  export let todo: Todo;

  let editing = false;
  let text = todo.text;

  function cancel() {
    text = todo.text;
    editing = false;
  }

  function handleKeyUp(event) {
    console.log('TodoRow.svelte handleKeyUp: event.key =', event.key);
    if (event.key === 'Enter') {
      update();
    } else if (event.key === 'Escape') {
      cancel();
    }
  }

  function toggle() {
    dispatch('update');
  }

  function update() {
    todo.text = text;
    editing = false;
    dispatch('update');
  }
</script>

<li transition:fade>
  <input type="checkbox" bind:checked={todo.done} on:change={toggle} />
  {#if editing}
    <input autoFocus on:keyup={handleKeyUp} bind:value={text} />
  {:else}
    <span class:done={todo.done}>{todo.text}</span>
  {/if}

  <div class="buttons">
    {#if editing}
      <button class="button-ok" on:click={update}>✓</button>
      <button class="button-cancel" on:click={cancel}>✖</button>
    {:else}
      <button class="button-edit" on:click={() => (editing = true)}>✎</button>
    {/if}

    <button on:click={() => dispatch('delete')}>🗑</button>
  </div>
</li>

<style>
  button {
    background: transparent;
    border: none;
    margin-left: 0.5rem;
    padding: 0;
  }

  .button-cancel {
    color: red;
  }

  .button-edit {
    color: blue;
  }

  .button-ok {
    color: green;
  }

  .buttons {
    display: inline-flex;
    align-items: center;
  }

  .done {
    color: gray;
    text-decoration: line-through;
  }

  input {
    display: inline-block;
  }

  input[type='checkbox'] {
    margin-right: 1rem;
  }
</style>
