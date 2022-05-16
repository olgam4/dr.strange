import { createSignal, For } from "solid-js"
import DnD from "../DnD"

interface Item {
  id: string
  title: string
  done: boolean
}

interface BlockProps {
  item: Item
}

const Block = ({ item }: BlockProps) => {
  return (
    <div class="w-[200px] h-[35px] border-2 rounded-md text-center leading-[35px] bg-red-300 text-white">
      {item.title}
    </div>
  )
}

export default () => {
  const [items, setItems] = createSignal<Item[]>([
    { id: "1", title: "DSM", done: false },
    { id: "2", title: "Eat", done: false },
    { id: "3", title: "Mission FE", done: false },
  ])

  function handleDndEvent(e: any) {
    const { items: newItems } = e.detail
    setItems(newItems)
  }

  return (
    <div>
      <DnD items={items} onConsider={handleDndEvent} onFinalize={handleDndEvent} className="flex flex-col space-y-2">
        <For each={items()}>
          {item => <Block item={item} />}
        </For>
      </DnD>
    </div>
  )
}
