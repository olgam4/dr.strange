import { createTimer } from './reactivity'
import { TimerButton, ProgressBar } from './components'
import { createMemo } from 'solid-js'

type Props = {
  minutes: number
}

export default ({ minutes }: Props) => {
  const {
    fortmattedTime,
    isRunning,
    progress,
    reset,
    start,
    stop,
  } = createTimer(minutes)

  const startDisabled = createMemo(() => {
    return isRunning()
  })

  const stopDisabled = createMemo(() => {
    return !isRunning()
  })

  return (
    <div class="w-[300px] flex flex-col justify-center items-center rounded-md px-2 py-4 bg-neutral-400">
      <div>{fortmattedTime()}</div>
      <ProgressBar progress={progress} />
      <div class="flex justify-center mt-3">
        <TimerButton disabled={startDisabled} onClick={start}>Start</TimerButton>
        <TimerButton disabled={stopDisabled} onClick={stop}>Stop</TimerButton>
        <TimerButton onClick={reset}>Reset</TimerButton>
      </div>
    </div>
  )
}
