import { createSignal, observable } from 'solid-js'
import { from, fromEvent, Subject } from 'rxjs'

import Ding from '../../assets/ding.wav'

function fmtMSS(s: number): string { return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s }

export const createTimer = (minutes?: number) => {
  const startingTime = minutes ? minutes * 60 : 30 * 60
  const [time, setTime] = createSignal(startingTime)
  const [isRunning, setIsRunning] = createSignal(false)

  const start = () => {
    setIsRunning(true)
  }

  const stop = () => {
    setIsRunning(false)
  }

  const reset = () => {
    setTime(startingTime)
    stop()
  }

  const tick = () => {
    if (isRunning()) {
      setTime(time() - 1)
    }
  }

  // @ts-ignore
  const obsv$ = from(observable(time))
  const endSubject = new Subject()

  obsv$.subscribe(() => {
    if (time() === 0){
      ding()
      reset()
      endSubject.next('end')
    }
  })


  const ding = () => {
    const audio = new Audio(Ding)
    audio.play()
  }

  const progress = () => {
    return 1 - (time() / startingTime)
  }

  setInterval(tick, 1000)

  return {
    fortmattedTime: () => fmtMSS(time()),
    progress,
    isRunning,
    time,
    start,
    stop,
    reset,
    end$: endSubject.asObservable()
  }
}
