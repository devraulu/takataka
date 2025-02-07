import { createTodoHandler } from './server/create-todo-handler';
import { vikeHandler } from './server/vike-handler';
import { Hono } from 'hono';

const app = new Hono();

app.post('/api/todo/create', createTodoHandler);

/**
 * Vike route
 *
 * @link {@see https://vike.dev}
 **/
app.all('*', vikeHandler);

export default app;
