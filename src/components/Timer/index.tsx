import { createSignal } from 'solid-js'
import Ding from '../../assets/ding.wav'

const TWENTY_MINUTES_IN_SECONDS = 25 * 60

function fmtMSS(s){return(s-(s%=60))/60+(9<s?':':':0')+s}

export default () => {
  const [timer, setTimer] = createSignal(TWENTY_MINUTES_IN_SECONDS)
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
    <div>
      <div>{fmtMSS(timer())}</div>
      <button
        onClick={startTimer}
        class="border rounded-md px-2 py-1"
      >
        Start
      </button>
    </div>
  )
}
