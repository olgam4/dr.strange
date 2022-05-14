import type { Component } from 'solid-js'
import Timer from './components/Timer'

const App: Component = () => {
  return (
    <div class="flex justify-center">
      <Timer minutes={25} />
    </div>
  )
}

export default App
