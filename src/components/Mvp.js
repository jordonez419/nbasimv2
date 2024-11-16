import react, { useState, useEffect } from 'react'
import styled from 'styled-components'

const Mvp = (props) => {
    const { userStats, cpuStats, userSquad, oponentSquad } = props
    console.log(props)

    // const findMvp = (obj, obj2) => {
    //     let mvp1 = obj.mvp
    //     let mvp2 = obj2.mvp

    //     let mvpNum = userSquad.find(mvp1)
    //     let mvpNum2 = oponentSquad.find(mvp1)

    //     return Math.max(mvpNum, mvpNum2)

    // }
    // useEffect(() => {
    //     findMvp(userStats, cpuStats)
    // }, [])
    return (
        <div>
            <Container >
                {/* <h3>{player.player_name}</h3> */}
                <img src={userSquad[userStats.mvp].player_image} alt='dsad' className='player-img'></img>
                {/* <p>Points Scored: {stats[player.player_name]}</p>  */}
            </Container>
        </div>
    )
}

export default Mvp

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