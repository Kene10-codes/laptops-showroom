import { Suspense, lazy, useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import About from './pages/about'
import Blog from './pages/blog'
import Contact from './pages/contact'
import ForgotPassword from './pages/forgotPassword'
import Register from './pages/register'

const Home = lazy(() => import('./pages/home'))

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
                    <Route path="/login" element={<Login />} />
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
