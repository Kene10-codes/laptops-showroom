import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import About from './pages/about'
import Blog from './pages/blog'
import Contact from './pages/contact'
import ForgotPassword from './pages/forgotPassword'
import Register from './pages/register'

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/create-account" element={<Register />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
            </Routes>
        </>
    )
}

export default App
