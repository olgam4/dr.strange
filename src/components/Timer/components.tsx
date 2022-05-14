import { JSXElement } from 'solid-js'

interface ProgressBarProps {
  progress: number
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
  const totalWidth = 100
  const widthInPixel = Math.floor(progress * totalWidth)

  return (
    <div class={`relative h-[10px] w-[${totalWidth}px]`}>
      <div class="h-[10px] bg-gray-100 w-full absolute" />
      <div
        class={`h-[10px] bg-blue-400 absolute`}
        style={{ width: `${widthInPixel}px` }}
      />
    </div>
  )
}

interface TimerButtonProps {
  onClick: () => void
  disabled?: boolean
  children: JSXElement
}

const TimerButton = ({ onClick, children, disabled }: TimerButtonProps) => {
  return (
    <button
      class="border rounded-md px-2 py-1 mx-1 border-b-4 bg-red-200 disabled:bg-gray-300"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export { ProgressBar, TimerButton }
