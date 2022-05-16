import { Route, Routes } from 'solid-app-router'
import { Component } from 'solid-js'
import Menu from './components/Menu'
import Pomodoro from './components/Pomodoro'
import { createPomodoro } from './components/Pomodoro/reactivity'
import Timeblock from './components/Timeblock'

const App: Component = () => {
  const pomodoro = createPomodoro()

  return (
    <div>
      <Menu />
      <div class={`absolute transition-all flex justify-center items-center top-0 bottom-0 left-16 right-0 ${pomodoro.backgroundColor()}`}>
        <Routes>
          <Route path="pomodoro" element={<Pomodoro {...pomodoro} />} />
          <Route path="timeblock" element={<Timeblock />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
