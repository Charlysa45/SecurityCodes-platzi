import './App.css'

import { UseState } from './components/UseState'
import { UseReducer } from './reducer/useReducer'

function App() {
  return (
    <div className="App">
      <UseState name="UseState" />
      <UseReducer name="Use Reducer" />
    </div>
  )
}

export default App
