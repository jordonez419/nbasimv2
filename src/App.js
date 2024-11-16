import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react'
import Home from './components/Home';
import Players from './components/Players';
import {AllPlayers} from './components/AllPlayers'
import SimulationPage from './components/SimulationPage';
import { Navigate, Route, Routes, Switch } from 'react-router-dom';
// import AllPlayersList  from './components/AllPlayers'
import Register from './components/Register';
import LogIn from './components/LogIn';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  function url(path) {
    return process.env.NODE_ENV === 'development' ? `http://localhost:9000/${path}` : path
  }

  const initialFormData = {
    user_name: '',
    password: ''
  }

  const [players, setPlayers] = useState([])
  const [userSquad, setUserSquad] = useState([])
  const [oponentSquad, setOponentSquad] = useState([])
  const [userScore, setUserScore] = useState({})
  const [cpuScore, setCpuScore] = useState({})
  const [mvp, setMvp] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState(initialFormData)

  const renderMvp = () => {
    if (userSquad.length === 0 || oponentSquad.length === 0) {
      return
    }
    if (userScore.total > cpuScore.total) {
      setMvp(AllPlayers.filter(el => el.player_name === userScore.mvp)[0].image)
    } else {
      setMvp(AllPlayers.filter(el => el.player_name === cpuScore.mvp)[0].image)
    }

  }
  useEffect(() => {
    setPlayers(AllPlayers)
    // axios.get('https://nbasimulator.herokuapp.com/api/players/')
    //   .then((response) => setPlayers(response.data))
    //   .catch(err => console.log(err.message))
  }, [])
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     Navigate('/players')
  //   }
  // }, [])

  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Home setUserSquad={setUserSquad} setOponentSquad={setOponentSquad}
          isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} error={error} setError={setError}
        />}>
        </Route>
        <Route exact path='/players' element={<Players players={players} userSquad={userSquad} setUserSquad={setUserSquad}
          oponentSquad={oponentSquad} setOponentSquad={setOponentSquad} setCpuScore={setCpuScore} setUserScore={setUserScore} setMvp={setMvp}
          userScore={userScore} cpuScore={cpuScore} mvp={mvp} renderMvp={renderMvp} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}
          formData={formData} setFormData={setFormData}
        />}>
        </Route>
        <Route path='/simulation' element={<SimulationPage players={players} userSquad={userSquad} setUserSquad={setUserSquad}
          oponentSquad={oponentSquad} setOponentSquad={setOponentSquad} setCpuScore={setCpuScore} setUserScore={setUserScore} setMvp={setMvp}
          userScore={userScore} cpuScore={cpuScore} mvp={mvp} renderMvp={renderMvp} isLoggedIn={isLoggedIn} />}></Route>


        {/* Protected routes below */}
        {/* <Route
          exact path='/players'
          element={
            <ProtectedRoute>
              <Players players={players} userSquad={userSquad} setUserSquad={setUserSquad}
                oponentSquad={oponentSquad} setOponentSquad={setOponentSquad} setCpuScore={setCpuScore} setUserScore={setUserScore} setMvp={setMvp}
                userScore={userScore} cpuScore={cpuScore} mvp={mvp} renderMvp={renderMvp} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            </ProtectedRoute>
          }>
        </Route>


        <Route
          path='/simulation'
          element={
            <ProtectedRoute>
              <SimulationPage players={players} userSquad={userSquad} setUserSquad={setUserSquad}
                oponentSquad={oponentSquad} setOponentSquad={setOponentSquad} setCpuScore={setCpuScore} setUserScore={setUserScore} setMvp={setMvp}
                userScore={userScore} cpuScore={cpuScore} mvp={mvp} renderMvp={renderMvp} />
            </ProtectedRoute>
          }>
        </Route> */}
      </Routes>

    </div>
  );
}

export default App;
