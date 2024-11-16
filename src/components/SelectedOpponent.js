import react, { useState } from 'react'
import styled from 'styled-components'

const SelectedOpponent = (props) => {

    const { player, setOponentSquad, oponentSquad } = props

    const deselectPlayer = (deselectedPlayer) => {
        console.log(`Deselecting oponent:${player.player_name}`)
        setOponentSquad(oponentSquad.filter(el => el.player_id !== deselectedPlayer.player_id))
    }
    const clearOpponentSquad = () => {
        setOponentSquad([])
    }



    return (
        <div>
            <Container>
                <img alt={`${player.player_name}`} src={player.image} className='player-img'></img>
                <h3>{player.player_name}</h3>
                <button className='cursor-pointer button-shrink' onClick={() => { deselectPlayer(player) }}>Remove Player</button>
            </Container>
        </div>
    )
}

export default SelectedOpponent

const Container = styled.div`
margin-bottom:1rem;
border:1px solid black;
border-radius:1rem;
// margin:1rem;
margin:auto;
margin-bottom:1rem;
width:70%;
background-color: rgb(198, 207, 213,.8);

`
