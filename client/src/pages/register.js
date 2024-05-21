import React, { useContext, useState } from 'react'
import ReusableInput from '../components/input'
import ReusableButton from '../components/button'
import Navbar from '../components/navbar'
import { ThemeContext } from '../context/Theme'
import { registerUser } from '../services/api'
import { Link } from 'react-router-dom'

const Register = () => {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const { theme } = useContext(ThemeContext)
    // HANDLE CHANGE FUNCTION
    const handleChange = (e) => {
        const { firstname, lastname, email, phone, password, error } = e.target
        setFirstname(firstname)
        setLastname(lastname)
        setPassword(password)
        setEmail(email)
        setPhone(phone)
        setError(error)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        await registerUser('POST', 'api/user/register ', {
            firstName: firstname,
            lastName: lastname,
            email: email,
            phoneNumber: phone,
            password: password,
        })
    }

    return (
        <div className={theme ? 'bg-black' : 'bg-transparent'}>
            <Navbar />
            <div className="flex flex-col min-h-screen justify-center items-center">
                <div className="w-2/5">
                    <h2 className="text-2xl text-center text-red-600 uppercase font-bold">
                        Create An Account{' '}
                    </h2>
                    <ReusableInput
                        type="text"
                        error={error}
                        value={firstname}
                        label={'First Name'}
                        handleChange={handleChange}
                        placeholder={'Enter First Name'}
                        required
                    />
                    <ReusableInput
                        type="text"
                        label={'Last Name'}
                        value={lastname}
                        handleChange={handleChange}
                        error={error ? 'Last Name is required' : ''}
                        placeholder={'Enter Last Name'}
                        required
                    />
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
                        type="telephone"
                        label={'Phone Number'}
                        value={phone}
                        handleChange={handleChange}
                        error={error ? 'Phone Number is required' : ''}
                        placeholder={'Enter Phone Number'}
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

                    <div className="flex flex-row justify-center items-center">
                        <ReusableInput
                            type="checkbox"
                            value={password}
                            handleChange={handleChange}
                            className="border-1 pr-0 w-10 h-5"
                            error={
                                error
                                    ? 'Click on Accept Terms And Condition'
                                    : ''
                            }
                            required
                        />{' '}
                        <span>
                            By signing up you accept our{' '}
                            <Link to="terms-condition">
                                terms and conditions & privacy policy
                            </Link>
                        </span>
                    </div>

                    <ReusableButton
                        handleSubmit={handleSubmit}
                        value={'Create An Account'}
                    />
                    {success ? <h4>User successfully registerd</h4> : ''}
                </div>
            </div>
        </div>
    )
}

export default Register
