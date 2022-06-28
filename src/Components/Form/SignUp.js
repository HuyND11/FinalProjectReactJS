import { Link } from "react-router-dom";
import "../../Assets/Css/form.css"

const SignUp = () => {
    return(
        <div className="login-page">
            <div className="form">
                <form className="register-form">
                    <input type="text" placeholder="Name"/>
                    <input type="password" placeholder="Password"/>
                    <input type="text" placeholder="Email"/>
                    <button>Register</button>
                    <p className="message">Already registered? <Link to={"/login"}>Sign In</Link></p>
                </form>
            </div>
        </div> 
    ) 
}

export default SignUp;