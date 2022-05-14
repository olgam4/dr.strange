import { Component } from 'solid-js'
import Pomodoro from './components/Pomodoro'
import { createPomodoro } from './components/Pomodoro/reactivity'


const App: Component = () => {
  const pomodoro = createPomodoro()

  return (
    <div class={`absolute flex justify-center items-center top-0 bottom-0 left-0 right-0 ${pomodoro.backgroundColor()}`}>
      <Pomodoro {...pomodoro} />
    </div>
  )
}

export default App
