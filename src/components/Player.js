import react, { useState, useEffect } from 'react'
import styled from 'styled-components'

const Player = (props) => {
    const [statsToggle, setStatsToggle] = useState(false)
    const { player, userSquad, setUserSquad, oponentSquad, setOponentSquad } = props


    const toggleStats = () => {
        setStatsToggle(!statsToggle)
    }

    const selectPlayer = (star) => {
        if (userSquad.length >= 4 && oponentSquad.length === 5) {
            window.scrollTo(0, 0)
        }
        if (userSquad.includes(star)) {
            alert(`${star.player_name} already selected on Team 1!`)
        }
        else if (userSquad.length === 5) {
            alert('5 Players Already on Team 1')
        }
        else {
            setUserSquad([...userSquad, star])
        }
    }

    const selectOpponent = (star) => {
        if (userSquad.length === 5 && oponentSquad.length >= 4) {
            window.scrollTo(0, 0)
        }
        if (oponentSquad.includes(star)) {
            alert(`${star.player_name} already selected on Team 2!`)
        }
        else if (oponentSquad.length === 5) {
            alert('5 Players Already on Team 2')
        }
        else {
            console.log('regular selection')
            setOponentSquad([...oponentSquad, star])
        }

    }


    const deselectPlayer = (deselectedPlayer) => {
        // console.log(`Deselecting player:${player.player_name}`)
        setUserSquad(userSquad.filter(el => el.player_id !== deselectedPlayer.player_id))
    }
    const deselectOpponent = (deselectedPlayer) => {
        // console.log(`Deselecting player:${player.player_name}`)
        setOponentSquad(oponentSquad.filter(el => el.player_id !== deselectedPlayer.player_id))
    }

    return (
        <div>
            {/* <Container className={userSquad.includes(player) ? 'player-selected' : '' || oponentSquad.includes(player) ? 'opponent-selected' : 'player-default-color' || userSquad.includes(player) && oponentSquad.includes(player) ? 'dual-selection' : 'player-default-color'}> */}
            {/* <Container className={userSquad.includes(player) ? 'player-selected' : '' || oponentSquad.includes(player) ? 'opponent-selected' : 'player-default-color'}> */}
            <Container className={userSquad.includes(player) && oponentSquad.includes(player) ? 'dual-selection' : userSquad.includes(player) ? 'player-selected' : '' || oponentSquad.includes(player) ? 'opponent-selected' : 'player-default-color'}>
                <h1 className='push-down'>{player.player_name}</h1>
                <img alt={player.player_name} className='player-img' src={player.image}></img>
                <div className='buttons'>
                    <button className='button-shrink' onClick={() => { selectPlayer(player) }}>Team 1</button>
                    <button className='button-shrink' onClick={() => { selectOpponent(player) }}>Team 2</button>
                </div>

                {/* {userSquad.includes(player) ? <a className='remove cursor-pointer' onClick={() => { deselectPlayer(player) }}>Remove Player</a> : ''}
                {oponentSquad.includes(player) ? <a className='remove cursor-pointer' onClick={() => { deselectOpponent(player) }}>Remove Opponent</a> : ''} */}
                <p className='cursor-pointer push-down' onClick={toggleStats}>{statsToggle ? <i class="arrow up"></i> : 'View Stats'}</p>
                <p className={!statsToggle ? 'hidden' : 'stats'}>PPG: {player.ppg}</p>
                <p className={!statsToggle ? 'hidden' : 'stats'}>APG: {player.apg}</p>
                <p className={!statsToggle ? 'hidden' : 'stats'}>RPG: {player.rpg}</p>
                <p className={!statsToggle ? 'hidden' : 'stats'}>Height: {player.height}</p>
                <p className={!statsToggle ? 'hidden' : 'stats'}>Position: {player.position}</p>
            </Container>
        </div>
    )
}

export default Player

const Container = styled.div`
margin-bottom:1rem;
border:1px solid black;
border-radius:1rem;
margin:1rem;
`