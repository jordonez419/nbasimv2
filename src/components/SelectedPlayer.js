import styled from 'styled-components'

const SelectedPlayer = (props) => {

    const { player, setUserSquad, userSquad } = props

    const deselectPlayer = (deselectedPlayer) => {
        console.log(`Deselecting player:${player.player_name}`)
        setUserSquad(userSquad.filter(el => el.player_id !== deselectedPlayer.player_id))
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

export default SelectedPlayer

const Container = styled.div`
margin-bottom:1rem;
border:1px solid black;
border-radius:1rem;
margin:1rem;
width:70%;
margin:auto;
margin-bottom:1rem;
background-color: rgb(198, 207, 213,.8);
`
