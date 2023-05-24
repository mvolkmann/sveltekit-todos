import { createTodo, getTodos } from '../utils/todos';
import type { Actions, PageLoad } from './$types';

export const load = (async () => {
  const todos = await getTodos();
  return { todos };
}) satisfies PageLoad;

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const text = data.get('text');
    return createTodo({ text });
  }
} satisfies Actions;
