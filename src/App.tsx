import { Component, Show } from 'solid-js'
import Pomodoro from './components/Pomodoro'
import { createPomodoro } from './components/Pomodoro/reactivity'
import Timeblock from './components/Timeblock'

const App: Component = () => {
  const pomodoro = createPomodoro()

  return (
    <div class={`absolute transition-all flex justify-center items-center top-0 bottom-0 left-0 right-0 ${pomodoro.backgroundColor()}`}>
      <Pomodoro {...pomodoro} />
      <Show when={false}>
        <Timeblock />
      </Show>
    </div>
  )
}

export default App
