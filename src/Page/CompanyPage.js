import Company from "../Components/Company/Company";
import { useEffect, useState } from "react";
import axios from "axios"

const CompanyPage = () => {
    const [listCompany, setListCompany] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:3000/company`).then(res => {
            setListCompany(res.data)
        })
    },[])
    return(
        <div className="list--company">
            {listCompany.map((ele, index) => <Company key={index} data = {ele}/>)}  
        </div>
    )
}

export default CompanyPage;