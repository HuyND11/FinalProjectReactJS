import "../../Assets/Css/company_detail.css"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Job from "../Job/Job";

const CompanyDetail = () => {
    const id = useParams();
    const [companyInfo, setCompanyInfo] = useState({});
    const [listJob, setListJob] = useState();

    useEffect(() => {
        axios.get(`http://localhost:3000/company/${id.id}`).then(res => {
            setCompanyInfo(res.data)
        });// eslint-disable-next-line
        axios.get(`http://localhost:3000/job`).then(res => {
            setListJob(res.data)
        });// eslint-disable-next-line
    },[])

    console.log(listJob);
    return(
        <div className="company--detail">
            <div className="company--detail--header">
                <div className="company--detail--avatar">
                    <img src = {`/images/${companyInfo.avatar}`} alt=""/>
                </div>
                <div className="company--detail--info">
                    <p className="company--detail--name">{companyInfo.name}</p>
                    <p className="company--detail--contact">Email: <span>{companyInfo.email}</span></p>
                    <p className="company--detail--contact">Phone: <span>{companyInfo.phone}</span></p>
                    <p className="company--detail--contact">Address: <span>{companyInfo.address}</span></p>
                </div>
            </div>
            <div className="company--detail--part">
                <p className="company--detail--part--title"><span className="dash"></span>about us</p>
                <p className="company--detail--part--item">{companyInfo.aboutUs}</p>
            </div>
            <div className="company--detail--part">
                <p className="company--detail--part--title"><span className="dash"></span>jobs in {companyInfo.name}</p>
                <div className="list--job--company">
                    {!!listJob && listJob.filter(ele => ele.companyId === companyInfo.id).map((ele, index) => <Job data={ele} key = {index}/>)}
                </div>
            </div>
        </div>
    )

}


export default CompanyDetail;