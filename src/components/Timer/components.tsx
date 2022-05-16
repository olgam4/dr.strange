import { createMemo } from 'solid-js'

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

export { ProgressBar }
