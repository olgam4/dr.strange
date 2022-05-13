import { createSignal } from 'solid-js'

export default () => {
  const [counter, setCounter] = createSignal(1);
  return (
    <div class="flex">
      <p>{counter()}</p>
      <button class="p-1 border rounded-md hover:bg-indigo-100" onClick={() => setCounter(c => c + 1)}>Click me!</button>
    </div>
  )
};
