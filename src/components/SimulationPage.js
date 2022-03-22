import react, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PlayerDisplay from './PlayerDisplay'
import { useNavigate } from 'react-router-dom'
import { AllPlayers } from './AllPlayers'
// import axios from 'axios'


const SimulationPage = (props) => {

    const { userSquad, oponentSquad, setUserSquad, setOponentSquad, players, cpuScore, userScore, setUserScore, setCpuScore, mvp, renderMvp } = props

    const navigate = useNavigate()
    const routeToPlayers = () => {
        navigate('/')
        setUserSquad([])
        setOponentSquad([])
        // localStorage.clear()
    }


    useEffect(() => {
        if (localStorage.getItem('user')) {
            setUserSquad(JSON.parse(localStorage.getItem('user')))
        }
        if (localStorage.getItem('oponent')) {
            setOponentSquad(JSON.parse(localStorage.getItem('oponent')))
        }
        if (localStorage.getItem('user-score')) {
            setUserScore(JSON.parse(localStorage.getItem('user-score')))
        }
        if (localStorage.getItem('cpu-score')) {
            setCpuScore(JSON.parse(localStorage.getItem('cpu-score')))
        }
        // if (userSquad.length === 0 || oponentSquad.length === 0) {
        //     routeToPlayers()
        // }
    }, [])

    useEffect(() => {
        window.localStorage.setItem('user', (JSON.stringify(userSquad)))
        window.localStorage.setItem('oponent', (JSON.stringify(oponentSquad)))
        window.localStorage.setItem('user-score', (JSON.stringify(userScore)))
        window.localStorage.setItem('cpu-score', (JSON.stringify(cpuScore)))
    })

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div>

            {/* <h1> Count {count} </h1>
            <button onClick={increaseCount}>+</button>
            <button onClick={decreaseCount}>-</button> */}

            <div class="scoreboard">
                <div class="team team-a houston">
                    <div class="team-detail">
                        <div class="team-nameandscore">
                            <div class="team-name">
                                Team 1:
                            </div>
                            <div class="team-score">
                                {userScore.total}
                            </div>
                        </div>
                        <div class="team-thisgame">
                            <div class="team-times">
                                TO: 0
                            </div>
                            <div class="team-bonus">
                                BONUS
                            </div>
                        </div>
                    </div>
                </div>
                <div class="team team-b dallas">
                    {/* <div class="team-logo">
                                    <img src="http://i.cdn.turner.com/nba/nba/.element/img/1.0/teamsites/logos/teamlogos_500x500/dal.png" width="50px" height="50px" />
                                </div> */}
                    <div class="team-detail">
                        <div class="team-nameandscore">
                            <div class="team-name">
                                Team 2:
                            </div>
                            <div class="team-score">
                                {cpuScore.total}
                            </div>
                        </div>
                        <div class="team-thisgame">
                            <div class="team-times">
                                TO: 0
                            </div>
                            <div class="team-bonus">
                                BONUS
                            </div>
                        </div>
                    </div>
                </div>
                <div class="timer">
                    <div class="timer-container">
                        <div class="quarter">
                            FINAL
                        </div>
                        <div class="timeleft">
                            00:00
                        </div>
                        <div class="shotclock">
                            00
                        </div>
                    </div>
                </div>
                {/* <div class="logo">
                    <img src="http://a.espncdn.com/promotions/bsa/apps/instantaccess/images/espn_logo.png" />
                </div> */}
            </div>
            <div className='container'>
                {/* <button onClick={() => runSimulation()}>log score</button> */}
                <div className='team1-final'>
                    <h2 className='title'>TEAM 1</h2>
                    {userSquad.map(el => <PlayerDisplay player={el} stats={userScore} />)}
                </div>

                <MvpStyle className='sim-container'>
                    {mvp.length === 0 ? <h1 className='title '>Team {userScore.total > cpuScore.total ? '1' : '2'} Wins!</h1> : ''}
                    {mvp.length === 0 ? <button className='button-shrink' onClick={() => renderMvp()}>Reveal MVP</button> : ''}
                    {mvp.length > 0 ? (
                        <div className='mvp-container'>
                            <h1>MVP</h1>
                            <h1 className='title push-down mvp-name'>{userScore.total > cpuScore.total ? userScore.mvp : cpuScore.mvp}</h1>
                            <img alt='mvp-img' className='mvp-img' src={mvp}></img>
                        </div>

                    )
                        : ''}
                    {mvp.length > 1 ? <button className='button-shrink' onClick={() => routeToPlayers()}>Play Another Match!</button> : ''}
                </MvpStyle>
                {/* </FinalStats> */}
                <div className='team2-final'>
                    <h2 className='title'>Team 2</h2>
                    {oponentSquad.map(el => <PlayerDisplay player={el} stats={cpuScore} />)}
                </div>
            </div>
        </div>
    )
}

export default SimulationPage

const Container = styled.div`
display:flex;
flex-direction:row;
justify-content:space-around;
align-items:center;
margin-top:2rem;
font-size:1.1rem;
`
const FinalStats = styled.div`
margin-bottom:auto;
width:50%
// flex: 1 1 0;
// min-width: 1;

`
const FinalScore = styled.div`

// border: 1px solid black;
padding:4rem;
margin-top:auto;
margin-left:7rem;
`
const MvpStyle = styled.div`
border: 1px solid black;
padding:4rem;
margin-bottom:auto;
background-color: rgb(198, 207, 213,.8);
border-radius:5px;
width:20%
`
