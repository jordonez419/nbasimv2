import { useEffect, useState, react } from 'react'
import axios from 'axios'
import Player from './Player'
import styled from 'styled-components'
import CurrentSquad from './CurrentSquad'
import OponentSquad from './OponentSquad'
import { useNavigate } from 'react-router-dom'
import { AllPlayers } from './AllPlayers'

const Players = (props) => {


  const { players, userSquad, setUserSquad, setOponentSquad, oponentSquad, setMvp, setCpuScore, setUserScore, userScore, cpuScore, isLoggedIn, setIsLoggedIn, formData } = props;

  const [searchTerm, setSearchTerm] = useState('')
  const logOut = () => {
    axios.get('https://nbasimulator.herokuapp.com/api/users/logout')
      // .then((response) => response.data == 'logged out' ? setIsLoggedIn(false) : '')
      .then((response) => console.log(response))
      .catch(err => console.log(err.message))
    setIsLoggedIn(false)
    window.localStorage.removeItem('myCat')
    navigate('/')
  }


  const simulateGame = () => {


    // localStorage.clear()
    // Team 1 Simulation
    let counter = 0;
    let playersHash = {}
    for (let element in userSquad) {
      let score = Math.floor(Math.random() * userSquad[element].ppg) + 5
      let assists = Math.floor(Math.random() * userSquad[element].apg) + 2
      let rebounds = Math.floor(Math.random() * userSquad[element].rpg) + 2
      playersHash[userSquad[element].player_name] = score;
      // playersHash[userSquad[element].player_name] = {
      //   points: score,
      //   assists: assists,
      //   rebounds: rebounds
      // }
      // console.log('player hash', playersHash)
      // console.log(`${userSquad[element].player_name} scored: ${score} points`)
      counter += score
      // console.log('Team 1 score:', counter)
    }
    let max = 0;
    let mvp = "";

    for (let player in playersHash) {
      if (playersHash[player] > max) {
        max = playersHash[player];
        mvp = player
      }
    }
    playersHash.total = counter

    // Team 2 Simulation
    let counter2 = 0;
    let playersHash2 = {}
    for (let element in oponentSquad) {
      let score2 = Math.floor(Math.random() * oponentSquad[element].ppg) + 5
      let assists2 = Math.floor(Math.random() * oponentSquad[element].apg) + 2
      let rebounds2 = Math.floor(Math.random() * oponentSquad[element].rpg) + 2
      playersHash2[oponentSquad[element].player_name] = score2;
      // playersHash2[oponentSquad[element].player_name] = {
      //   points: score2,
      //   assists: assists2,
      //   rebounds: rebounds2
      // }
      counter2 += score2
    }
    let max2 = 0;
    let mvp2 = "";

    for (let player in playersHash2) {
      if (playersHash2[player] > max2) {
        max2 = playersHash2[player];
        mvp2 = player
      }
    }
    playersHash.mvp = mvp
    playersHash2.mvp = mvp2
    playersHash.total = counter;
    playersHash2.total = counter2;
    console.log(playersHash)
    console.log(playersHash2)

    setUserScore(playersHash)
    setCpuScore(playersHash2)
    // console.log(userScore)
  }


  const navigate = useNavigate()
  const routeToSimulation = () => {
    if (userSquad.length === 5 && oponentSquad.length === 5) {
      simulateGame()
      navigate('/simulation')
    }

  }

  const clearSquad = () => {
    setUserSquad([])
  }
  const clearOpponentSquad = () => {
    setOponentSquad([])
  }

  const clearBothSquads = () => {
    setUserSquad([])
    setOponentSquad([])
    setMvp([])
    setCpuScore({})
    setUserScore({})
  }
  const deselectPlayer = (deselectedPlayer) => {
    // console.log(`Deselecting player:${player.player_name}`)
    setUserSquad(userSquad.filter(el => el.player_name !== deselectedPlayer))
  }
  const deselectOpponent = (deselectedPlayer) => {
    // console.log(`Deselecting player:${player.player_name}`)
    setOponentSquad(oponentSquad.filter(el => el.player_name !== deselectedPlayer))
  }


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  useEffect(() => {
    setUserSquad([])
    setOponentSquad([])
    setMvp([])
    setCpuScore({})
    setUserScore({})
  }, [])


  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/')
    }
  }, [isLoggedIn, navigate])

  useEffect(() => {
    const cat = window.localStorage.getItem('myCat')
    // console.log(cat)
    if (cat) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])


  const buttonClick = (e) => {
    // console.log(e.target.innerHTML)
    setSearchTerm(e.target.innerHTML)
  }


  return (
    <div>
      <Sticky>
        <Header ><h1>{players.length === 0 ? 'Loading Players...' : 'Select 5 Players for each team'}</h1>
          <button className='button-shrink' onClick={() => logOut()}>Log out</button>
          <button className='button-shrink run-sim-btn' onClick={routeToSimulation}>Run Simulation</button>
          <div className='controls'>
            {/* {oponentSquad.length !== 5 ? (
              // <p >Click on Player to Select</p> 
              ''
            ) :
              (
                <button onClick={routeToSimulation}>Run Simulation</button>
              )} */}

            {/* <div>
              {userSquad.length > 0 ? (<button onClick={() => clearSquad()}>Clear User Squad</button>) : ('')}
              {oponentSquad.length > 0 ? (<button onClick={() => clearOpponentSquad()}>Clear Opponent Squad</button>) : ('')}
            </div> */}
          </div>
          <div className='query-controls'>
            <button className='button query-button button-shrink' onClick={(e) => buttonClick(e)}>Point Guards</button>
            <button className='button query-button button-shrink' onClick={(e) => buttonClick(e)}>Shooting Guards</button>
            <button className='button query-button button-shrink' onClick={(e) => buttonClick(e)}>Small Forwards</button>
            <button className='button query-button button-shrink' onClick={(e) => buttonClick(e)}>Power Forwards</button>
            <button className='button query-button button-shrink' onClick={(e) => buttonClick(e)}>Centers</button>
            <button className='button query-button button-shrink' onClick={(e) => buttonClick(e)}>All Players</button>
          </div>
          <input className='search-bar' type='text' placeholder='Search Players' onChange={(e) => setSearchTerm(e.target.value)}></input>


        </Header>

      </Sticky>


      {userSquad.length >= 1 || oponentSquad.length >= 1 ?
        (
          <div id='match-preview'>
            <div>
              {userSquad.length > 0 ? <h3>Team 1</h3> : ''}
              {userSquad.length > 0 ? (<button className='button-shrink' onClick={() => clearSquad()}>Clear Roster</button>) : ('')}
              {userSquad.map(el => <p className='player-name'>{el.player_name} <i class="fa fa-trash-o cursor-pointer" onClick={() => deselectPlayer(el.player_name)}></i></p>)}
            </div>
            {userSquad.length >= 1 && oponentSquad.length >= 1 ? <p>VS</p> : ''}
            <div>
              {oponentSquad.length > 0 ? <h3>Team 2</h3> : ''}
              {oponentSquad.length > 0 ? (<button className='button-shrink' onClick={() => clearOpponentSquad()}>Clear Roster</button>) : ('')}
              {oponentSquad.map(el => <p className='player-name'>{el.player_name} <i class="fa fa-trash-o cursor-pointer" onClick={() => deselectOpponent(el.player_name)}></i></p>)}
            </div>
            {/* {oponentSquad.length === 5 && userSquad.length === 5 ? <button className='button-shrink run-sim-btn' onClick={routeToSimulation}>Run Simulation</button> : ''} */}

          </div>
        ) : ''
      }


      {players.length === 0 ?
        <div class="ball">
          <div class="stroke pos1"></div>
          <div class="stroke pos2"></div>
          <div class="stroke2 pos3"></div>
          <div class="stroke2 pos4"></div>
        </div> : ''
      }
      {/* <div className={userSquad.length === 0 ? 'landing-players' : userSquad.length > 0 && oponentSquad.length === 0 ? 'user-selection' : 'cpu-selection'}> */}
      <div className='landing-players'>

        <PlayersContainer>

          {players.filter((el) => {
            if (searchTerm === '') {
              return el
            }
            if (el.player_name.toLowerCase().includes(searchTerm.toLowerCase())) {
              return el
            }
            if (searchTerm == 'Point Guards') {
              if (el.position === 'Point Guard') {
                return el
              }
            }
            if (searchTerm == 'Shooting Guards') {
              if (el.position === 'Shooting Guard') {
                return el
              }
            }
            if (searchTerm == 'Small Forwards') {
              if (el.position === 'Small Forward') {
                return el
              }
            }
            if (searchTerm == 'Power Forwards') {
              if (el.position === 'Power Forward') {
                return el
              }
            }
            if (searchTerm == 'Centers') {
              if (el.position === 'Center') {
                return el
              }
            }
            if (searchTerm == 'All Players') {
              return el
            }
          }).map(player => {
            return <Player player={player} key={player.player_id} userSquad={userSquad} setUserSquad={setUserSquad}
              oponentSquad={oponentSquad} setOponentSquad={setOponentSquad} />
          })}

        </PlayersContainer>


        {/* <SelectedPlayers>
          {
            userSquad.length > 0 ? <CurrentSquad userSquad={userSquad} setUserSquad={setUserSquad}
              oponentSquad={oponentSquad} setOponentSquad={setOponentSquad} /> : ''
          }
          {oponentSquad.length > 0 ? (
            <OponentSquad userSquad={userSquad} setUserSquad={setUserSquad}
              oponentSquad={oponentSquad} setOponentSquad={setOponentSquad} />
          ) : ('')}
        </SelectedPlayers> */}
      </div>
    </div>
  )
}

export default Players

const PlayersContainer = styled.div`
display:flex;
flex-direction:row;
flex-wrap:wrap;
justify-content:center;
align-items:flex-center;
width:60%
`
const Container = styled.div`
// display:flex;
// flex-direction:row;
// justify-content:center;
// align-items:center;
margin-bottom:3rem;
`
const SquadContainer = styled.div`
border:1px solid black;
`
const SelectedPlayers = styled.div`
// margin-top:1rem;
display:flex;
flex-direction:column;
`
const Header = styled.div`
font-size:3rem;
max-width:100%;
color: #FDBC2D;
// color:rgb(201, 8, 42);
// color:#F58426;
background: linear-gradient(to left, rgb(201, 8, 42,.8) 50%, rgb(23, 64, 139,.8) 50%);
background:rgb(23, 64, 139,.9)
`
const Sticky = styled.div`
position: sticky;
 top: 0;
`