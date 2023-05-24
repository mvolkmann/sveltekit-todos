import { createTodo, getTodos } from '../utils/todos';
import type { Actions, PageLoad } from './$types';

let editId = -1;

export const load = (async () => {
  const todos = await getTodos();
  return { editId, todos };
}) satisfies PageLoad;

// Old way
// export function POST() {}

// New way
export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    console.log('+page.server.ts default: data =', data);
    // createTodo(todo);
    return {};
  }
} satisfies Actions;
