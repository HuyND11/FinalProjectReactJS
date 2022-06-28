import "../../Assets/Css/footer.css"
import { FaFacebookSquare, FaInstagramSquare  } from "react-icons/fa";
const Footer = () => {
    return(
        <footer className="footer">
            <div className="footer--item">
                <h1 className="footer--title">Contact</h1>
                <p><span>Phone: </span>098765431</p>
                <p><span>Address: </span>101B, Le Huu Trac, Phuoc My, Son Tra</p>
                <p><span>Email: </span>PNV@gmail.com</p>
                <p><span>Link: </span>PNV.com</p>
            </div>
            <div className="footer--item">
                <h1 className="footer--title">Website</h1>
                <p>Home</p>
                <p>About US</p>
                <p>Company</p>
                <p>Upload CV</p>
            </div>
            <div className="footer--item">
                <h1 className="footer--title">Contact</h1>
                <div className="icons">
                    <FaFacebookSquare/>
                    <FaInstagramSquare />
                </div>
            </div>
        </footer>
    )
}

export default Footer;