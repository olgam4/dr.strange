import type { createTimer } from './reactivity'
import { ProgressBar } from './components'

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

  return (
    <div class="w-[300px] flex flex-col justify-center items-center">
      <div class="text-6xl">
        {fortmattedTime()}
      </div>
      <ProgressBar progress={progress} />
      <div class="flex justify-center mt-3 space-x-1">
        <button disabled={isRunning()} onClick={start} class="timer-button"><FaSolidPlay /></button>
        <button disabled={!isRunning()} onClick={stop} class="timer-button"><FaSolidPause /></button>
        <button onClick={reset} class="timer-button"><FiRepeat font-size='20'/></button>
      </div>
    </div>
  )
}
