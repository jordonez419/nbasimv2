import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Home = (props) => {

    // const [isLoggedIn, setIsLoggedIn] = useState('')
    // const [error, setError] = useState('')

    const { setIsLoggedIn, isLoggedIn, error, setError } = props

    axios.defaults.withCredentials = true;

    const initialFormData = {
        user_name: '',
        password: ''
    }
    const [formData, setFormData] = useState(initialFormData)
    const { setUserSquad, setOponentSquad } = props;
    const navigate = useNavigate()
    // const routeToPlayers = () => {
    //     navigate('/players')
    // }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const trueValue = type === 'checkbox' ? checked : value;
        setFormData({
            ...formData, [name]: trueValue.trim()
        })
    }
    const register = () => {
        if (formData.user_name.length === 0 || formData.password.length === 0) {
            setError('Please fill out all fields')
        } else {
            const newUser = {
                user_name: formData.user_name,
                password: formData.password,
            }

            axios.post(`https://nbasimulator.herokuapp.com/api/users/register`, newUser)
                // .then(res => (console.log(res)))
                .then(res => res.data.command == 'INSERT' ? setIsLoggedIn(true) : '')
                .catch(err => setError(err.message))
            setFormData(initialFormData)
            alert('Sign up Successful! Try logging in')
            // navigate('/players')
        }

    }

    const logIn = async () => {

        if (formData.user_name.length === 0 || formData.password.length === 0) {
            setError('Please fill out all fields')
        } else {
            axios.post('https://nbasimulator.herokuapp.com/api/users/login', { user_name: formData.user_name, password: formData.password })
                .then((response) => response.status == 200 ? setIsLoggedIn(true) : '')
                // .then((response) => console.log(response))
                // .then((response) => setIsLoggedIn(true))
                .catch(err => setError(err.message))
            window.localStorage.setItem('myCat', 'Tom')
        }
        // navigate('/players')

    }

    const resetPlayers = () => {
        setUserSquad([]);
        setOponentSquad([])
    }
    useEffect(() => {
        resetPlayers()
    }, [])
    useEffect(() => {
        if (isLoggedIn) {
            navigate('/players')
        }
    }, [isLoggedIn, navigate])

    return (
        <div>
            <div className='login-form'>
                {/* <Container> */}
                <h1 className='welcome'>Welcome to Nba Simulator Pro</h1>
                <img alt='landing' className='landing-img' src='https://ideastream-production.s3.amazonaws.com/images/news/npr/2020/01/799778886_291475704.jpg?null'></img>
                <form className='form-inputs'>
                    <input name='user_name' className='input' type='text' placeholder='Enter Username' onChange={handleChange} value={formData.name}></input>
                    <input name='password' className='input' type='password' placeholder='Enter Password' onChange={handleChange} value={formData.password}></input>
                </form>
                <div>
                    <button className='block login-btn' onClick={() => logIn()}>Log in</button>
                </div>
                <div>
                    <button className='block register' onClick={() => register()}>Sign Up</button>
                </div>

                {error.length > 0 ? error == 'Request failed with status code 401' ? <p className='error'>Invalid Username or Password</p> :
                    error == 'Request failed with status code 400' ? <p className='error'> Username Taken</p> :
                        <p className='error'> {error}</p> : ''}
            </div>
        </div >
    )
}

export default Home

const Container = styled.div`
margin:auto;
margin-top:5rem;
text-align:center;
border:2px solid black;
border-radius:15px;
background-color: rgb(198, 207, 213, .8);
height:5rem;
width:35%
// display:flex;
// flex-direction:column;
// justify-content:center;
// align-items:center;
`