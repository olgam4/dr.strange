import { createMemo, JSXElement } from 'solid-js'

interface ProgressBarProps {
  progress: () => number
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
  const totalWidth = 200
  const widthInPixel = createMemo((): string => {
    const width = progress() * totalWidth
    return `${width}px`
  })

  return (
    <div class={`relative h-[10px] w-[200px]`}>
      <div class="h-[10px] bg-gray-300 w-full absolute" />
      <div
        class={`h-[10px] bg-gray-100 absolute`}
        style={{ width: `${widthInPixel()}` }}
      />
    </div>
  )
}

interface TimerButtonProps {
  onClick: () => void
  disabled?: () => boolean
  children: JSXElement
}

const TimerButton = ({ onClick, children, disabled }: TimerButtonProps) => {
  return (
    <button
      class="border rounded-md px-2 py-1 mx-1 border-b-4 bg-red-200 disabled:bg-gray-300"
      onClick={onClick}
      disabled={disabled && disabled()}
    >
      {children}
    </button>
  )
}

export { ProgressBar, TimerButton }
