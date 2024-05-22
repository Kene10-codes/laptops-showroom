import { useContext, useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import Navbar from '../components/navbar'
import { ThemeContext } from '../context/Theme'
import { fetchProducts } from '../services/api'
import Card from '../components/card'

const Home = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const { theme } = useContext(ThemeContext)

    console.log(products)

    useEffect(() => {
        ;(async function () {
            const result = await fetchProducts('api/product/', 'GET')
            setProducts(result?.message)
            setSuccess(true)
        })()
    }, [])

    return (
        <div className={theme ? 'bg-black text-white' : 'bg-transparent'}>
            <Navbar />
            <div className="flex flex-row min-h-screen">
                {(products?.length === 0) & !loading ? (
                    <div className="flex flex-row min-h-screen justify-center items-center">
                        <ClipLoader
                            color="#000000"
                            loading={!loading}
                            size={150}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                ) : (
                    <div className="flex flex-row">
                        {products?.map((product, index) => (
                            <Card
                                photos={product.photos}
                                key={product._id}
                                brand={product.brand}
                                storage={product.storage}
                                price={product.price}
                                processor={product.processor}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home
