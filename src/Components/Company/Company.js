import {Link } from "react-router-dom";
import { FaArrowRight  } from "react-icons/fa";

import "../../Assets/Css/company.css"


const Company = ({data}) => {
    return(
        <div className="company">
            <div className="company--image">
                <img src ={`images/${data.avatar}`}alt=""/>
            </div>
            <div className="company--info">
                <p className="company--name">{data.name}</p>
                <p className="company--field">Information Technology</p>
                <p className="company--address">{data.address}</p>
                <Link to={`/company/${data.id}`} className = "company--link">See more <FaArrowRight/> </Link>
            </div>
        </div>
    )
}


export default Company;