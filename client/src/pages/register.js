import React, { useContext, useState } from 'react'
import ReusableInput from '../components/input'
import ReusableButton from '../components/button'
import Navbar from '../components/navbar'
import { ThemeContext } from '../context/Theme'
import { postUser } from '../services/api'
import { Link } from 'react-router-dom'

// INITIAL VALUES
const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
}

// REGISTER COMPONENT
const Register = () => {
    const [values, setValues] = useState(initialValues)
    const [error, setError] = useState('')
    const [isChecked, setIsChecked] = useState(false)
    const [success, setSuccess] = useState(false)
    const { theme } = useContext(ThemeContext)

    // HANDLE CHANGE FUNCTION
    const handleChange = (e) => {
        const { name, value } = e.target
        // SET VALUES
        setValues({
            ...values,
            [name]: value,
        })
    }

    const { firstName, lastName, email, password, phoneNumber } = values

    // HANDLE SUBMIT FUNCTION
    const handleSubmit = async (e) => {
        e.preventDefault()

        await postUser('POST', 'api/user/register ', {
            firstName,
            lastName,
            email,
            phoneNumber,
            password,
        })
        setValues(initialValues)
        setSuccess(true)
    }

    return (
        <div className={theme ? 'bg-black text-white' : 'bg-transparent'}>
            <Navbar />
            <div className="flex flex-col min-h-screen justify-center items-center">
                <div className="w-2/5">
                    <h2 className="text-2xl text-center text-red-600 uppercase font-bold">
                        Create An Account{' '}
                    </h2>
                </div>
                <form method="post">
                    <ReusableInput
                        type="text"
                        error={error}
                        name="firstName"
                        value={values.firstName}
                        id="firstName"
                        label={'First Name'}
                        handleChange={handleChange}
                        placeholder={'Enter First Name'}
                        required
                    />
                    <ReusableInput
                        type="text"
                        label={'Last Name'}
                        name="lastName"
                        value={values.lastName}
                        id="lastName"
                        handleChange={handleChange}
                        error={error ? 'Last Name is required' : ''}
                        placeholder={'Enter Last Name'}
                        required
                    />
                    <ReusableInput
                        type="email"
                        label={'Email'}
                        name="email"
                        value={values.email}
                        id="email"
                        handleChange={handleChange}
                        error={error ? 'Email is required' : ''}
                        placeholder={'Enter Email'}
                        required
                    />
                    <ReusableInput
                        type="telephone"
                        label={'Phone Number'}
                        name="phoneNumber"
                        value={values.phoneNumber}
                        id="phoneNumber"
                        handleChange={handleChange}
                        error={error ? 'Phone Number is required' : ''}
                        placeholder={'Enter Phone Number'}
                        required
                    />
                    <ReusableInput
                        type="password"
                        label={'Password'}
                        id="password"
                        name="password"
                        value={values.password}
                        handleChange={handleChange}
                        placeholder={'Enter Password'}
                        error={error ? 'Password is required' : ''}
                        required
                    />

                    <div className="flex flex-row justify-center items-center">
                        <ReusableInput
                            type="checkbox"
                            checked={isChecked}
                            id="checkbox"
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
                            <Link
                                to="/terms-condition"
                                className="font-bold text-blue-500 underline underline-offset-2"
                            >
                                terms and conditions & privacy policy
                            </Link>
                        </span>
                    </div>

                    <ReusableButton
                        handleSubmit={handleSubmit}
                        value={'Create An Account'}
                    />
                    {success ? <h4>User successfully registerd</h4> : ''}
                </form>
            </div>
        </div>
    )
}

export default Register
