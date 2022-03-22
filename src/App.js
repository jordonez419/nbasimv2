import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react'
import Home from './components/Home';
import Players from './components/Players';
import SimulationPage from './components/SimulationPage';
import { Route, Routes, Switch } from 'react-router-dom';
import { AllPlayers } from './components/AllPlayers'

function App() {
  function url(path) {
    return process.env.NODE_ENV === 'development' ? `http://localhost:9000/${path}` : path
  }

  const [players, setPlayers] = useState([])
  const [userSquad, setUserSquad] = useState([])
  const [oponentSquad, setOponentSquad] = useState([])
  const [userScore, setUserScore] = useState({})
  const [cpuScore, setCpuScore] = useState({})
  const [mvp, setMvp] = useState([])

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
    axios.get('https://nbasimulator.herokuapp.com/api/players/')
      .then((response) => setPlayers(response.data))
      .catch(err => console.log(err.message))
  }, [])

  return (
    <div className="App">
      <Routes>
        {/* <Route exact path='/' element={<Home setUserSquad={setUserSquad} setOponentSquad={setOponentSquad} />}>
        </Route> */}
        <Route exact path='/' element={<Players players={players} userSquad={userSquad} setUserSquad={setUserSquad}
          oponentSquad={oponentSquad} setOponentSquad={setOponentSquad} setCpuScore={setCpuScore} setUserScore={setUserScore} setMvp={setMvp}
          userScore={userScore} cpuScore={cpuScore} mvp={mvp} renderMvp={renderMvp} />}>
        </Route>
        <Route path='/simulation' element={<SimulationPage players={players} userSquad={userSquad} setUserSquad={setUserSquad}
          oponentSquad={oponentSquad} setOponentSquad={setOponentSquad} setCpuScore={setCpuScore} setUserScore={setUserScore} setMvp={setMvp}
          userScore={userScore} cpuScore={cpuScore} mvp={mvp} renderMvp={renderMvp} />}></Route>
      </Routes>

    </div>
  );
}

export default App;
