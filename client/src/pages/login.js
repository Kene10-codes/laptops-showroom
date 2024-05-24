import React, { useContext, useState } from 'react'
import ReusableInput from '../components/input'
import ReusableButton from '../components/button'
import Navbar from '../components/navbar'
import { ThemeContext } from '../context/Theme'
import { postUser } from '../services/api'

const initialValues = {
    email: '',
    password: '',
}
const Login = () => {
    const [values, setValues] = useState(initialValues)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const { theme } = useContext(ThemeContext)

    // HANDLE CHANGE FUNCTION
    const handleChange = (e) => {
        const { name, value } = e.target

        // SET STATE
        setValues({
            ...values,
            [name]: value,
        })
    }

    const { email, password } = values

    // HANDLE SUBMIT FUNC
    const handleSubmit = async (e) => {
        e.preventDefault()

        await postUser('POST', 'api/user/login ', {
            email,
            password,
        })
        setValues(initialValues)
    }

    return (
        <div className={theme ? 'bg-black text-white' : 'bg-transparent'}>
            <Navbar />
            <div className="flex flex-col min-h-screen justify-center items-center">
                <div className="w-2/5">
                    <h2 className="text-2xl text-center text-red-600 uppercase font-bold">
                        Log In{' '}
                    </h2>

                    <ReusableInput
                        type="email"
                        label={'Email'}
                        name="email"
                        value={values.email}
                        handleChange={handleChange}
                        error={error ? 'Email is required' : ''}
                        placeholder={'Enter Email'}
                        required
                    />

                    <ReusableInput
                        type="password"
                        label={'Password'}
                        name="password"
                        value={values.password}
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
