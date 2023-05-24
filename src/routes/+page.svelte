<script>
	import Todo from '../components/Todo.svelte';

	let lastId = 0;

	// This is a function that creates a todo object.
	const createTodo = (text, done = false) => ({ id: ++lastId, text, done });

	let todoText = '';

	// The app starts with two todos already created.
	let todos = [createTodo('learn Svelte', true), createTodo('build a Svelte app')];

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
	const deleteTodo = (todoId) => (todos = todos.filter((t) => t.id !== todoId));

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
	<!-- Using a form makes it so pressing the return key
       while in the input activates the Add button,
       calling the addTodo function.
       But we don't want to POST the form data.
       The preventDefault modifier prevents that. -->
	<form on:submit|preventDefault={addTodo}>
		<input size="30" placeholder="enter new todo here" bind:value={todoText} />
		<!-- The Add button is disabled if no text
         has been entered in the input. -->
		<button disabled={!todoText}>Add</button>
	</form>
	<ul>
		{#each todos as todo}
			<!-- We listen for delete and toggleDone events here. -->
			<!-- Note the use of shorthand syntax for passing a prop. -->
			<Todo {todo} on:delete={() => deleteTodo(todo.id)} on:toggleDone={() => toggleDone(todo)} />
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
