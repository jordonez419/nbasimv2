import { useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const Home = (props) => {

    const { setUserSquad, setOponentSquad } = props;
    const navigate = useNavigate()
    const routeToPlayers = () => {
        navigate('/players')
    }
    const resetPlayers = () => {
        setUserSquad([]);
        setOponentSquad([])
    }
    useEffect(() => {
        resetPlayers()
    }, [])
    return (
        <div>
            <div>
                <Container>
                    <h1>Welcome to Nba Simulator Pro</h1>
                    <img alt='landing' className='landing-img' src='https://source.unsplash.com/kB5DnieBLtM/1950x1200'></img>
                    <button id='start-match' onClick={routeToPlayers}>Start a Match</button>
                </Container>
            </div>
        </div>
    )
}

export default Home

const Container = styled.div`
margin:auto;
margin-top:5rem;
text-align:center;
border:2px solid black;
border-radius:15px;
background-color:#494449;
width:35%
`