import { Component, createSignal, Match, Switch } from 'solid-js'

import Timer from './components/Timer'
import { createTimer } from './components/Timer/reactivity'

export enum State {
  POMODORO = 'POMODORO',
  SHORT_BREAK = 'SHORT_BREAK',
  LONG_BREAK = 'LONG_BREAK',
}

const App: Component = () => {
  const [mode, setMode] = createSignal<State>(State.POMODORO)

  const pomodoroTimer = createTimer(25)
  const shortBreakTimer = createTimer(5)
  const longBreakTimer = createTimer(15)

  return (
    <div class="flex justify-center">
      <div>
        <button
          onClick={() => setMode(State.POMODORO) && pomodoroTimer.reset()}
          class={`${mode() === State.POMODORO && 'bg-gray-400 text-white'} p-2 rounded`}
        >
          Pomodoro
        </button>
        <button
          onClick={() => setMode(State.SHORT_BREAK) && shortBreakTimer.reset()}
          class={`${mode() === State.SHORT_BREAK && 'bg-gray-400 text-white'} p-2 rounded`}
        >
          Short Break
        </button>
        <button
          onClick={() => setMode(State.LONG_BREAK) && longBreakTimer.reset()}
          class={`${mode() === State.LONG_BREAK && 'bg-gray-400 text-white'} p-2 rounded`}
        >
          Long Break
        </button>
        <Switch>
          <Match when={mode() === State.POMODORO}>
            <Timer {...pomodoroTimer} />
          </Match>
          <Match when={mode() === State.SHORT_BREAK}>
            <Timer {...shortBreakTimer} />
          </Match>
          <Match when={mode() === State.LONG_BREAK}>
            <Timer {...longBreakTimer} />
          </Match>
        </Switch>
      </div>
    </div>
  )
}

export default App
