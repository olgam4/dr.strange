import { createMemo } from 'solid-js'

import type { createTimer } from './reactivity'
import { TimerButton, ProgressBar } from './components'

import { FaSolidPause, FaSolidPlay } from 'solid-icons/fa'
import { FiRepeat } from 'solid-icons/fi'

type Props = ReturnType<typeof createTimer>

export default ({
    fortmattedTime,
    isRunning,
    progress,
    reset,
    start,
    stop,
  }: Props) => {

  const startDisabled = createMemo(() => {
    return isRunning()
  })

  const stopDisabled = createMemo(() => {
    return !isRunning()
  })

  return (
    <div class="w-[300px] flex flex-col justify-center items-center">
      <div class="text-6xl">
        {fortmattedTime()}
      </div>
      <ProgressBar progress={progress} />
      <div class="flex justify-center mt-3 space-x-1">
        <TimerButton disabled={startDisabled} onClick={start}><FaSolidPlay /></TimerButton>
        <TimerButton disabled={stopDisabled} onClick={stop}><FaSolidPause /></TimerButton>
        <TimerButton onClick={reset}><FiRepeat font-size='20'/></TimerButton>
      </div>
    </div>
  )
}
