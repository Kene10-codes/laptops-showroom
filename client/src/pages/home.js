import { useContext, useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import { ThemeContext } from '../context/Theme'
import { SERVER_BASE_URL } from '../constants/constants'

const Home = () => {
    const [products, setProducts] = useState([])
    const [success, setSuccess] = useState()
    const { theme } = useContext(ThemeContext)

    useEffect(() => {
        const getProducts = async () => {
            try {
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                }

                // POST USER DATA
                const response = await fetch(
                    `${SERVER_BASE_URL}/api/product/`,
                    requestOptions
                )
                if (!response) {
                    throw new Error('Networl issue')
                }
                const result = await response.json()
                setProducts(result.message)
            } catch (e) {
                console.log(e)
            }
        }

        getProducts()
    }, [])

    return (
        <div className={theme ? 'bg-black text-white' : 'bg-transparent'}>
            <Navbar />
            <div className="flex flex-row min-h-screen">
                <div>Home</div>
            </div>
        </div>
    )
}

export default Home
