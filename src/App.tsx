import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './pages/Form';
import Redirect from './pages/Redirect';




function App() {



  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/:shortUrl" element={<Redirect />} />
      </Routes>
    </Router>
  )
}

export default App
