import { createSignal } from 'solid-js'
import Ding from '../../assets/ding.wav'

function fmtMSS(s: number ){return(s-(s%=60))/60+(9<s?':':':0')+s}

interface Props {
  minutes: number
}

export default ({ minutes }: Props) => {
  const [timer, setTimer] = createSignal(minutes * 60)
  const [started, setStared] = createSignal(false)

  const startTimer = () => {
    if (started()) return
    setStared(true)
    setInterval(() => {
      setTimer(t => t - 1)
      if (timer() === 0) {
        const audio = new Audio(Ding)
        audio.play()
      }
    }, 1000)
  }

  return (
    <div class="flex flex-col justify-center items-center rounded-md px-2 py-4 mx-60 bg-neutral-400">
      <div>{fmtMSS(timer())}</div>
      <button
        onClick={startTimer}
        class="border rounded-md px-2 py-1 border-b-4"
      >
        Start
      </button>
    </div>
  )
}
