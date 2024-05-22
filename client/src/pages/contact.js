import Navbar from '../components/navbar'
import contactImage from '../images/contact-us.jpeg'

const Contact = () => {
    return (
        <div>
            <Navbar />
            <div>
                <div className="h-12 ">
                    <img
                        src={contactImage}
                        alt="Contact Us Image"
                        className="w-full h-screen"
                    />
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default Contact
