import React, { useContext, useState } from 'react'
import ReusableInput from '../components/input'
import ReusableButton from '../components/button'
import Navbar from '../components/navbar'
import { ThemeContext } from '../context/Theme'
import { registerUser } from '../services/api'

const Login = () => {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const { theme } = useContext(ThemeContext)
    // HANDLE CHANGE FUNCTION
    const handleChange = (e) => {
        const { email, password, error } = e.target

        setPassword(password)
        setEmail(email)
        setError(error)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        await registerUser('POST', 'api/user/login ', {
            email: email,
            password: password,
        })
    }

    return (
        <div className={theme ? 'bg-black' : 'bg-transparent'}>
            <Navbar />
            <div className="flex flex-col min-h-screen justify-center items-center">
                <div className="w-2/5">
                    <h2 className="text-2xl text-center text-red-600 uppercase font-bold">
                        Log In{' '}
                    </h2>

                    <ReusableInput
                        type="email"
                        label={'Email'}
                        value={email}
                        handleChange={handleChange}
                        error={error ? 'Email is required' : ''}
                        placeholder={'Enter Email'}
                        required
                    />

                    <ReusableInput
                        type="password"
                        label={'Password'}
                        value={password}
                        handleChange={handleChange}
                        placeholder={'Enter Password'}
                        error={error ? 'Password is required' : ''}
                        required
                    />
                    <ReusableButton
                        handleSubmit={handleSubmit}
                        value={'Log In'}
                    />
                    {success ? <h4>User successfully logged in</h4> : ''}
                </div>
            </div>
        </div>
    )
}

export default Login
