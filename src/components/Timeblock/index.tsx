import { createSignal, For } from "solid-js"
import DnD from "../DnD"

export default () => {
  const [items, setItems] = createSignal([
    { id: "1", title: "Item 1", done: false },
    { id: "2", title: "Item 2", done: false },
    { id: "3", title: "Item 3", done: false },
  ])

  function handleDndEvent(e: any) {
    const { items: newItems } = e.detail
    setItems(newItems)
  }

  return (
    <div>
      <h1>Timeblock</h1>
      <DnD items={items} onConsider={handleDndEvent} onFinalize={handleDndEvent}>
        <For each={items()}>
          {item => <div>{item.title}</div>}
        </For>
      </DnD>
    </div>
  )
}
