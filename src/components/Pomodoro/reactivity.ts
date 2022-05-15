import { createMemo, createSignal } from "solid-js"

export enum State {
  POMODORO = 'POMODORO',
  SHORT_BREAK = 'SHORT_BREAK',
  LONG_BREAK = 'LONG_BREAK',
}

const createPomodoro = () => {
  const [mode, setMode] = createSignal<State>(State.POMODORO)

  const backgroundColor = createMemo(() => {
    switch (mode()) {
      case State.POMODORO:
        return 'bg-red-400'
      case State.SHORT_BREAK:
        return 'bg-green-400'
      case State.LONG_BREAK:
        return 'bg-blue-400'
    }
  })

  const setPomodoro = () => setMode(State.POMODORO)
  const setShortBreak = () => setMode(State.SHORT_BREAK)
  const setLongBreak = () => setMode(State.LONG_BREAK)

  return {
    backgroundColor,
    setPomodoro,
    setShortBreak,
    setLongBreak,
    isPomodoro: () => mode() === State.POMODORO,
    isShortBreak: () => mode() === State.SHORT_BREAK,
    isLongBreak: () => mode() === State.LONG_BREAK,
    nextState: () => {
      switch (mode()) {
        case State.POMODORO:
          return setShortBreak()
        case State.SHORT_BREAK:
          return setPomodoro()
        case State.LONG_BREAK:
          return setPomodoro()
      }
    }
  }
}

export {
  createPomodoro,
}
