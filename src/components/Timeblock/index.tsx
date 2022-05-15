// @ts-nocheck
import {
  DragDropProvider,
  DragDropSensors,
  DragOverlay,
  SortableProvider,
  createSortable,
  closestCenter,
  maybeTransformStyle,
} from "@thisbeyond/solid-dnd"
import { batch, createSignal, For } from "solid-js"
import { createStore } from "solid-js/store"

interface SortableProps {
  item: any
}

const Sortable = ({ item }: SortableProps) => {
  const sortable = createSortable(item)
  return (
    <div
      use:sortable
      class="sortable"
      classList={{ "opacity-25": sortable.isActiveDraggable }}
    >
      {item}
    </div>
  )
}

interface SortableOverlayProps {
  item: any
}

const SortableOverlay = ({ item }: SortableOverlayProps) => {
  return <div class="sortable">{item}</div>
}

interface ColumnProps {
  id: any
  items: any
}

const Column = ({ id, items }: ColumnProps) => {
  const sortable = createSortable(id)
  return (
    <div
      ref={sortable.ref}
      style={maybeTransformStyle(sortable.transform)}
      classList={{ "opacity-25": sortable.isActiveDraggable }}
    >
      <div class="column-header" {...sortable.dragActivators}>
        {id}
      </div>
      <div class="column bg-gray-100">
        <SortableProvider ids={items}>
          <For each={items}>{(item) => <Sortable item={item} />}</For>
        </SortableProvider>
      </div>
    </div>
  )
}

interface ColumnOverlayProps {
  id: any
  items: any
}

const ColumnOverlay = ({ id, items }: ColumnOverlayProps) => {
  return (
    <div>
      <div class="column-header">{id}</div>
      <div class="column bg-gray-100">
        <For each={items}>
          {(item) => <SortableOverlay item={item} />}
        </For>
      </div>
    </div>
  )
}

export const BoardExample = () => {
  const [activeItem, setActiveItem] = createSignal(null)
  const [containers, setContainers] = createStore({
    A: [1, 2, 3],
    B: [4, 5, 6],
    C: [7],
  })
  const containerIds = () => Object.keys(containers)
  const [containerOrder, setContainerOrder] = createSignal(
    Object.keys(containers)
  )

  const isContainer = (id) => containerIds().includes(id)

  const getContainer = (id) => {
    for (const [key, items] of Object.entries(containers)) {
      if (items.includes(id)) {
        return key
      }
    }
  }

  const closestContainerOrItem = (draggable, droppables, context) => {
    const closestContainer = closestCenter(
      draggable,
      droppables.filter((droppable) => isContainer(droppable.id)),
      context
    )
    if (isContainer(draggable.id)) {
      return closestContainer
    } else if (closestContainer) {
      const containerItemIds = containers[closestContainer.id]
      const closestItem = closestCenter(
        draggable,
        droppables.filter((droppable) =>
          containerItemIds.includes(droppable.id)
        ),
        context
      )
      if (!closestItem) {
        return closestContainer
      }

      if (getContainer(draggable.id) !== closestContainer.id) {
        const isLastItem =
          containerItemIds.indexOf(closestItem.id) ===
          containerItemIds.length - 1

        if (isLastItem) {
          const belowLastItem =
            draggable.transformed.center.y > closestItem.transformed.center.y

          if (belowLastItem) {
            return closestContainer
          }
        }
      }
      return closestItem
    }
  }

  const move = (draggable, droppable, onlyWhenChangingContainer = true) => {
    const draggableIsContainer = isContainer(draggable.id)
    const draggableContainer = draggableIsContainer
      ? draggable.id
      : getContainer(draggable.id)
    const droppableContainer = isContainer(droppable.id)
      ? droppable.id
      : getContainer(droppable.id)

    if (
      draggableContainer != droppableContainer ||
      !onlyWhenChangingContainer
    ) {
      if (draggableIsContainer) {
        const fromIndex = containerOrder().indexOf(draggable.id)
        const toIndex = containerOrder().indexOf(droppable.id)
        const updatedOrder = containerOrder().slice()
        updatedOrder.splice(toIndex, 0, ...updatedOrder.splice(fromIndex, 1))
        setContainerOrder(updatedOrder)
      } else {
        const containerItemIds = containers[droppableContainer]
        let index = containerItemIds.indexOf(droppable.id)
        if (index === -1) index = containerItemIds.length

        batch(() => {
          setContainers(draggableContainer, (items) =>
            items.filter((item) => item !== draggable.id)
          )
          setContainers(droppableContainer, (items) => [
            ...items.slice(0, index),
            draggable.id,
            ...items.slice(index),
          ])
        })
      }
    }
  }

  const onDragStart = ({ draggable }) => setActiveItem(draggable.id)

  const onDragOver = ({ draggable, droppable }) => {
    if (draggable && droppable && !isContainer(draggable.id)) {
      move(draggable, droppable)
    }
  }

  const onDragEnd = ({ draggable, droppable }) => {
    if (draggable && droppable) {
      move(draggable, droppable, false)
    }
    setActiveItem(null)
  }

  return (
    <div class="flex flex-col flex-1 mt-5 self-stretch">
      <DragDropProvider
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
        collisionDetector={closestContainerOrItem}
      >
        <DragDropSensors />
        <div class="columns">
          <SortableProvider ids={containerOrder()}>
            <For each={containerOrder()}>
              {(key) => <Column id={key} items={containers[key]} />}
            </For>
          </SortableProvider>
        </div>
        <DragOverlay>
          {isContainer(activeItem()) ? (
            <ColumnOverlay id={activeItem()} items={containers[activeItem()]} />
          ) : (
            <SortableOverlay item={activeItem()} />
          )}
        </DragOverlay>
      </DragDropProvider>
    </div>
  )
}

export default () => {
  return (
    <div>
      <h1>Timeblock</h1>
      <BoardExample />
    </div>
  )
}
