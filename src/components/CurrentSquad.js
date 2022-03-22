import react from 'react'
import styled from 'styled-components'
import SelectedPlayer from './SelectedPlayer'
import SelectedOponent from './SelectedOpponent'

const CurrentSquad = (props) => {
    const { userSquad, setUserSquad } = props

    const clearSquad = () => {
        setUserSquad([])
    }

    return (
        <div>
            <Container>
                <Header> <h1>Team 1</h1></Header>
                {userSquad.length > 0 ? (<button className='button-shrink' onClick={() => clearSquad()}>Clear Roster</button>) : ('')}
                {userSquad.map(el => <SelectedPlayer player={el} key={el.player_id} setUserSquad={setUserSquad} userSquad={userSquad} />)}

            </Container>
        </div>
    )
}

export default CurrentSquad

const Container = styled.div`
position: sticky;
top:75px;
border:1px solid black;
border-radius:1rem;
background-color:rgb(23, 64, 139,.8);
`
const Header = styled.div`
font-size:1.5rem;
`