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
}: Props) => {
  const pomodoroTimer = createTimer(25)
  const shortBreakTimer = createTimer(5)
  const longBreakTimer = createTimer(15)

  return (
    <div class="bg-white rounded-lg shadow-lg p-4">
      <button
        onClick={() => setPomodoro() && pomodoroTimer.reset()}
        class={`${isPomodoro() && 'bg-gray-400 text-white'} p-2 rounded`}
      >
        Pomodoro
      </button>
      <button
        onClick={() => setShortBreak() && shortBreakTimer.reset()}
        class={`${isShortBreak() && 'bg-gray-400 text-white'} p-2 rounded`}
      >
        Short Break
      </button>
      <button
        onClick={() => setLongBreak() && longBreakTimer.reset()}
        class={`${isLongBreak() && 'bg-gray-400 text-white'} p-2 rounded`}
      >
        Long Break
      </button>
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
