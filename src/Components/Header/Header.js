import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import "../../Assets/Css/header.css"
const Header = () => {

    const [checkLogIn, setCheckLogIn] = useState(sessionStorage.getItem("userId") != null);
    const [userInfo, setUserInfo] = useState({});
    
    const logOut = () => {
        sessionStorage.removeItem("userId");
        setCheckLogIn(false)
    }
    
    useEffect(() => {
        setCheckLogIn(sessionStorage.getItem("userId") != null)
    }, [checkLogIn])

    useEffect(() => {
        if(sessionStorage.getItem("userId")){
            axios.get(`http://localhost:3000/users/${sessionStorage.getItem("userId")}`).then(res => {
            setUserInfo(res.data);
        })}
    },[])

    return (
        <header className="header">
            <p>{checkLogIn}</p>
            <div className="logo">
                <p>Find <span>Job</span></p>
            </div>
            <div className="navbar">
                <ul className="nav">
                    <li><Link to="/" className="nav--link">Home</Link></li>
                    <li><Link to="company" className="nav--link">Company</Link></li>
                    <li><Link to="aboutus" className="nav--link">About Us</Link></li>
                    <li><Link to="cv" className="nav--link">Create CV</Link></li>
                </ul>
            </div>
            <div className="account">

                {
                    checkLogIn
                        ?
                        <>
                            <button className={" btn btn--text btn--login"} >{userInfo.name}</button>
                            <button onClick={logOut} className={" btn btn--text btn--login"} >Log Out</button>
                        </>
                        :
                        <>
                            <Link to='login' className={" btn btn--text btn--login"}>Log In</Link>
                            <Link to='signup' className={" btn btn--text btn--login"}>Sign Up</Link>
                        </>
                }

            </div>
        </header>
    )
}

export default Header;