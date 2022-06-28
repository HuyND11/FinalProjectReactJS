import  "../../Assets/Css/job.css"
import { FaRegFlag  } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Job = ({data}) => {

    const [company, setCompany] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/company/${data.companyId}`).then(res => {// eslint-disable-next-line
            setCompany(res.data);// eslint-disable-next-line
        });// eslint-disable-next-line
    },[]);

    return(
        <div className="job">
            <p className="job--name">{data.name}</p> 
            <div className="job--desc">
                <p><span><FaRegFlag size={15}/></span>{data.place}</p>
                <p><span></span>{data.required[0]}</p>
                <p><span></span>{data.type}</p>
            </div>
            <div className="job--company">
                <div>
                    <img className="company--avatar" src={`/images/${company.avatar}`} alt={company.avatar}/>
                    <p>{company.name}</p>
                </div>
                <button className="btn btn--apply"><Link to = {`/job/${data.id}`}>apply</Link></button>
            </div>
        </div>
    )
}

export default Job;