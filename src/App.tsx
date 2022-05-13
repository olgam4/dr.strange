import type { Component } from 'solid-js'
import Timer from './components/Timer'

const App: Component = () => {
  return (
    <div>
      <Timer minutes={25} />
    </div>
  )
}

export default App
