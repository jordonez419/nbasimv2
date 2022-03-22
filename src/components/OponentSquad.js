import react from 'react'
import styled from 'styled-components'
// import SelectedPlayer from './SelectedPlayer'
import SelectedOponnent from './SelectedOpponent'
const OponentSquad = (props) => {
    const { oponentSquad, setOponentSquad } = props

    const clearOpponentSquad = () => {
        setOponentSquad([])
    }


    return (
        <div>
            <Container>
                <Header> <h1>Team 2</h1></Header>
                {oponentSquad.length > 0 ? (<button className='button-shrink' onClick={() => clearOpponentSquad()}>Clear Roster</button>) : ('')}
                {oponentSquad.map(el => <SelectedOponnent player={el} key={el.player_id} setOponentSquad={setOponentSquad} oponentSquad={oponentSquad} />)}
            </Container>
        </div>
    )
}

export default OponentSquad

const Container = styled.div`
position: sticky;
top:75px;
border:1px solid black;
border-radius:1rem;
background-color:rgb(201, 8, 42,.8);
`
const Header = styled.div`
font-size:1.5rem;
`