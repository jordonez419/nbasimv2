import react, { useState, useEffect } from 'react'
import styled from 'styled-components'

const PlayerDisplay = (props) => {
    const { player, stats } = props
    // console.log(stats)
    return (
        <div>
            <Container >
                <h3 className='ply-name'>{player.player_name}</h3>
                <img src={player.image} alt={player.player_name} className='player-img'></img>
                <p className='stats'>Points: {stats[player.player_name]}</p>
                <p className='stats'>Asssists: {Math.floor(player.apg)}</p>
                <p className='stats'>Rebounds:{Math.floor(player.rpg)} </p>
            </Container>
        </div>
    )
}

export default PlayerDisplay

const Container = styled.div`
background-color: rgb(198, 207, 213,.8);
text-align:center;
border:1px black solid;
border-radius:5px;
margin:1rem;
// min-width:100%;
// margin:1rem;
// display:flex:
// flex-direction: column;
// justify-content:center;
// align-items:center;
`