import { createTimer } from './reactivity'
import { TimerButton, ProgressBar } from './components'

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

  return (
    <div class="w-[300px] flex flex-col justify-center items-center rounded-md px-2 py-4 bg-neutral-400">
      <div>{fortmattedTime()}</div>
      <ProgressBar progress={progress()} />
      <div class="flex justify-center mt-3">
        <TimerButton disabled={isRunning()} onClick={start}>Start</TimerButton>
        <TimerButton disabled={isRunning()} onClick={stop}>Stop</TimerButton>
        <TimerButton onClick={reset}>Reset</TimerButton>
      </div>
    </div>
  )
}
