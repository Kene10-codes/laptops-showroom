import React, { useContext, useState } from 'react'
import ReusableInput from '../components/input'
import ReusableButton from '../components/button'
import { SERVER_BASE_URL } from '../constants/constants'
import Navbar from '../components/navbar'
import { ThemeContext } from '../context/Theme'

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

        try {
            const requestOptions = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: firstname,
                    lastName: lastname,
                    email: email,
                    phoneNumber: phone,
                    password: password,
                }),
            }

            // POST USER DATA
            const response = await fetch(
                `${SERVER_BASE_URL}/api/user/register`,
                requestOptions
            )
            if (!response) throw new Error('Network issue')
            const result = await response.json()
            setSuccess(result.message)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={theme ? 'bg-black' : 'bg-transparent'}>
            <Navbar />
            <div className="flex flex-row min-h-screen justify-center items-center ">
                <h2>Create An Account </h2>
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
                <ReusableButton
                    handleSubmit={handleSubmit}
                    value={'Create An Account'}
                />

                {success ? <h4>User successfully registerd</h4> : ''}
                <span>
                    By signing up you accept our terms and conditions & privacy
                    policy
                </span>
            </div>
        </div>
    )
}

export default Register
