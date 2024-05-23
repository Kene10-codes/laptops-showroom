import { useState } from 'react'
import ReusableInput from '../components/input'
import Navbar from '../components/navbar'
import contactImage from '../images/contact-us.jpeg'

const Contact = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    // HANDLE CHANGE FUNCTION
    const handleChange = (e) => {
        const { name, email, error } = e.target
        setName(name)
        setEmail(email)
        setError(error)
    }

    return (
        <div>
            <Navbar />
            <div>
                <div className="h-screen w-120">
                    <img
                        src={contactImage}
                        alt="Contact Us Image"
                        className="w-full h-screen"
                    />
                </div>
                <div className="flex flex-row">
                    <div>
                        <h2>Message us via socials</h2>
                    </div>
                    <div>
                        <ReusableInput
                            type="text"
                            error={error}
                            value={name}
                            label={'Name'}
                            handleChange={handleChange}
                            placeholder={'Enter Name'}
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
