import { Suspense, lazy, useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import About from './pages/about'
import Contact from './pages/contact'
import ForgotPassword from './pages/forgotPassword'
import Register from './pages/register'
import TermsAndCondition from './pages/termsCondition'

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
                    <Route path="/about-us" element={<About />} />
                    <Route path="/contact-us" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/create-account" element={<Register />} />
                    <Route
                        path="forgot-password"
                        element={<ForgotPassword />}
                    />
                    <Route
                        path="/terms-condition"
                        element={<TermsAndCondition />}
                    />
                </Routes>
            </Suspense>
        </div>
    )
}

export default App
