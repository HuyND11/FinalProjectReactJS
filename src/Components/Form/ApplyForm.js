import axios from "axios";
import { useEffect, useState  } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const ApplyForm = () => {

    const [applyInfo, setApplyInfo] = useState({});
    const userId = sessionStorage.getItem("userId");
    const id = useParams()
    const navigate = useNavigate();

    const onChangeHandler = (e) => {
        const key = e.target.name;
        let value = e.target.value;
        if(key === 'CV') {
            value = e.target.files[0].name;
        }
        setApplyInfo({...applyInfo, [key]: value,"idJob": ~~id.id, "userId": ~~userId})
    }

    const onSubmitHandler = (e) =>{
        e.preventDefault();
        axios.post(`http://localhost:3000/apply`,applyInfo).then(res => {
            console.log(res);
            Swal.fire({
                title: "You Apply is sended ",
                text: "Waiting the respon from recruiter",
                icon: "success",
            }).then( res => {
                if(res.isConfirmed){
                    navigate('/')
                }
            }
            )
        })
    }

    useEffect(() => {
        axios.get(`http://localhost:3000/users/${userId}`).then(res => {
            setApplyInfo(res.data)
        })// eslint-disable-next-line
    },[])
    const deleteCv = () => {
        delete applyInfo.cv;
        setApplyInfo({...applyInfo})
    }
    delete applyInfo.password
    delete applyInfo.id
    return(
        <div className = "login-page">
            <div className = "form">
                <form onSubmit={onSubmitHandler} className = "login-form">
                    <input type="text" placeholder="Name" name = "name"
                    value={!!applyInfo.name ? applyInfo.name : ""} disabled/>
                    <input type="email" placeholder="Email"  name = "email"
                    value={!!applyInfo.email ? applyInfo.email : ""} disabled/>
                    <input type="text" placeholder="Address" name="address"
                    onChange={onChangeHandler}/>                    
                    <input type="text" placeholder="Phone" name="phone"
                    onChange={onChangeHandler}/>
                    <input type="file" name="CV"
                    onChange={onChangeHandler}/>
                    <div className={applyInfo.CV ? "show--cv" : 'hidden'}>
                        <span onClick={deleteCv}>X</span>
                        <img className="cv--preview"  src = {`/images/${applyInfo.CV}`} alt=""/>
                    </div>
                    <button type="submit" >Apply</button>
                </form>
            </div>
        </div>
    )
}

export default ApplyForm;