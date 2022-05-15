import { Match, Switch } from 'solid-js'

import Timer from '../Timer'
import { createTimer } from '../Timer/reactivity'
import { createPomodoro } from './reactivity'

type Props = ReturnType<typeof createPomodoro>

export default ({
  setPomodoro,
  setShortBreak,
  setLongBreak,
  isPomodoro,
  isShortBreak,
  isLongBreak,
  nextState,
}: Props) => {
  const pomodoroTimer = createTimer(25)
  const shortBreakTimer = createTimer(5)
  const longBreakTimer = createTimer(15)

  pomodoroTimer.end$.subscribe(() => {
    nextState()
  })

  shortBreakTimer.end$.subscribe(() => {
    nextState()
  })

  longBreakTimer.end$.subscribe(() => {
    nextState()
  })


  return (
    <div class="bg-white rounded-lg shadow-lg p-4 space-y-1">
      <div class="space-x-1">
        <button
          onClick={() => setPomodoro() && pomodoroTimer.reset()}
          class={`${isPomodoro() && 'bg-gray-400 text-white'} p-2 rounded hover:bg-gray-200`}
        >
          Pomodoro
        </button>
        <button
          onClick={() => setShortBreak() && shortBreakTimer.reset()}
          class={`${isShortBreak() && 'bg-gray-400 text-white'} p-2 rounded hover:bg-gray-200`}
        >
          Short Break
        </button>
        <button
          onClick={() => setLongBreak() && longBreakTimer.reset()}
          class={`${isLongBreak() && 'bg-gray-400 text-white'} p-2 rounded hover:bg-gray-200`}
        >
          Long Break
        </button>
      </div>
      <Switch>
        <Match when={isPomodoro()}>
          <Timer {...pomodoroTimer} />
        </Match>
        <Match when={isShortBreak()}>
          <Timer {...shortBreakTimer} />
        </Match>
        <Match when={isLongBreak()}>
          <Timer {...longBreakTimer} />
        </Match>
      </Switch>
    </div>
  )
}
