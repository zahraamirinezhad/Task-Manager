import './App.scss'
import Home from './components/Home/Home'
import { Route, Routes } from 'react-router-dom'
import TaskDetails from './components/TaskDetails/TaskDetails'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="task/:taskID" element={<TaskDetails />} />
      </Routes>
    </div>
  )
}

export default App
