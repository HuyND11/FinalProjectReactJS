import { useEffect, useState } from "react"
import { Link, useNavigate    } from "react-router-dom"
import axios from "axios";
import "../../Assets/Css/form.css"
import Swal from "sweetalert2";
const LogIn = () => {
    const [userLogin, setUserLogin] = useState({});
    const [listUser, setListUser] = useState([]);

    const navigate = useNavigate ();

    const onChangeHandler = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setUserLogin({...userLogin, [key]: value})
    }
    const onSubmitHandler = (e) => {
        e.preventDefault();
        const userData = listUser.find(user => user.email === userLogin.email);
        if(userData){
            if(userData.password !== userLogin.password){
                Swal.fire({
                    title: "Password is not correct !!",
                    text: "Please input password agian",
                    icon: "error",
                })
            }
            else{
                sessionStorage.setItem("userId", userData.id);
                Swal.fire({
                    title: "Welcome to Our website",
                    text: "I hope you will have a good time !! Thank you",
                    icon: "success",
                }).then(res => {
                    navigate( res.isConfirmed ? "/" : "")
                })
                
            }
        }else{
            Swal.fire({
                title: "Not find your email !!",
                text: "Please input email agian",
                icon: "error",
            })
        }
    }

   

    useEffect(() => {
        axios.get(`http://localhost:3000/users`).then(res => {
            setListUser(res.data);
        })
    },[])

    return(
        <div className = "login-page">
            <div className = "form">
                <form onSubmit={onSubmitHandler} className = "login-form">
                    <input type="text" placeholder="Email" name = "email" onChange={onChangeHandler}/>
                    <input type="password" placeholder="Password" name = "password" onChange={onChangeHandler}/>
                    <button type="submit" >Login</button>
                    <p className = "message">Not registered? <Link to={"/signup"}>Create an account</Link></p>
                </form>
            </div>
        </div>
    )
}

export default LogIn;