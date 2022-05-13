import { createSignal } from 'solid-js'
import Ding from '../../assets/ding.wav'

function fmtMSS(s: number ){return(s-(s%=60))/60+(9<s?':':':0')+s}

interface Props {
  minutes: number
}

export default ({ minutes }: Props) => {
  const [timer, setTimer] = createSignal(minutes * 60)
  const [started, setStarted] = createSignal(false)
  const [timerInterval, setTimerInterval] = createSignal(0)

  const startTimer = () => {
    if (started()) return
    setStarted(true)
    const int = setInterval(() => {
      setTimer(t => t - 1)
      if (timer() === 0) {
        const audio = new Audio(Ding)
        audio.play()
        stopTimer()
      }
    }, 1000)
    setTimerInterval(int)
  }

  const stopTimer = () => {
    setStarted(false)
    clearInterval(timerInterval())
  }
   const resetTimer = () => {
    setTimer(minutes * 60)
    clearInterval(timerInterval())
    stopTimer()
  }

  const progressBar = () => {
    const progress = timer() / (minutes * 60)
    return (
      <div class="relative h-[10px] w-[100px]">
        <div class="h-[10px] bg-gray-100 w-full absolute" />
        <div class="h-[10px] bg-blue-400 absolute" style={{ width: `${(1 - progress) * 100}%` }} />
      </div>
    )
  }

  return (
    <div class="flex flex-col justify-center items-center rounded-md px-2 py-4 mx-60 bg-neutral-400">
      <div>{fmtMSS(timer())}</div>
      {progressBar()}
      <div class="flex justify-center">
        <button
          onClick={startTimer}
          class="border rounded-md px-2 py-1 border-b-4"
          disabled={started()}
        >
          Start
        </button>
        <button
          onClick={stopTimer}
          class="border rounded-md px-2 py-1 border-b-4"
          disabled={!started()}
        >
          Stop
        </button>
        <button
          onClick={resetTimer}
          class="border rounded-md px-2 py-1 border-b-4"
        >
          Reset
        </button>
      </div>
    </div>
  )
}
