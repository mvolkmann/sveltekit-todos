import { createTodo, deleteTodo, getTodos } from '../utils/todos';
import type { Actions, PageLoad } from './$types';

let editId = -1;

export const load = (async () => {
  const todos = await getTodos();
  return { editId, todos };
}) satisfies PageLoad;

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    console.log('+page.server.ts default: data =', data);
    const text = data.get('text')
    console.log('+page.server.ts default: text =', text);
    return createTodo({ text });
  }
} satisfies Actions;

export async function DELETE({ params }) {
  const { id } = params;
  console.log('+page.server.ts DELETE: id =', id);
  await deleteTodo(id);
  return new Response(null, { status: 200 });
}