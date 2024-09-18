import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./components/Login";
import Signup from "./components/Signup";
import NotFound from './components/NotFound';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={ <Login /> }/>
          <Route path='/signup' element={ <Signup /> }/>
          <Route path='/dashboard' element={ <Dashboard /> }/>
          <Route path='*' element={ <NotFound /> }></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App;