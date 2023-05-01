import { Home, TimeClock } from './pages'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/time-record" element={<TimeClock />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
