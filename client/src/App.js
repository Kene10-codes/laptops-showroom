import { Suspense, lazy, useContext } from 'react'
import { Routes, Route } from 'react-router-dom'

const Home = lazy(() => import('./pages/home'))
const About = lazy(() => import('./pages/about'))
const Blog = lazy(() => import('./pages/blog'))
const Contact = lazy(() => import('./pages/contact'))
const ForgotPassword = lazy(() => import('./pages/forgotPassword'))
const Register = lazy(() => import('./pages/register'))

function App() {
    return (
        <div>
            <Suspense
                fallback={
                    <div className="flex flex-row min-h-screen justify-center items-center">
                        Welcome To Techie Laptops
                    </div>
                }
            >
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/create-account" element={<Register />} />
                    <Route
                        path="forgot-password"
                        element={<ForgotPassword />}
                    />
                </Routes>
            </Suspense>
        </div>
    )
}

export default App
