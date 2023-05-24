import { deleteTodo, updateTodo } from '../utils/todos';
import type { RequestHandler } from './$types';

export const DELETE = (async ({ url }) => {
  const id = url.searchParams.get('id');
  if (!id) return new Response(null, { status: 404 });

  await deleteTodo(Number(id));
  return new Response(null, { status: 200 });
}) satisfies RequestHandler;

export const PUT = (async ({ request, url }) => {
  const id = url.searchParams.get('id');
  const todo = (await request.json()) as Todo;

  if (!id) return new Response('not found', { status: 404 });
    if (Number(id) !== todo.id) {
        return new Response('id mismatch', { status: 400 });
    }

    console.log('+server.ts PUT: todo =', todo);
  await updateTodo(todo);
  return new Response(null, { status: 200 });
}) satisfies RequestHandler;
