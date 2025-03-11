import { test } from '@japa/runner';

const hello = (name?: string) => `Hello, ${name ?? 'world'}`;

test('hello', async ({ assert }) => {
  assert.isTrue(hello() === 'Hello, world');
  assert.isTrue(hello('japa') === 'Hello, japa');
});
