import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "../../Assets/Css/job_detail.css"
import Job from "./Job";
const JobDetail = () => {
    const id = useParams();
    const [listSimilarJob, setlistSimilarJob] = useState([]);
    const [jobInfo, setJobInfo] = useState({})
    const [companyInfo, setCompanyInfo] = useState({});
    const [listApply, setListApply] = useState([]);
    const [checkApply, setCheckApply] = useState(false);
    const companyId = jobInfo.companyId;
    const navigate = useNavigate ();

    const applyCv = () => {
        sessionStorage.getItem("userId")
        ?
           navigate(`/applyform/${id.id}`) 
        :
            Swal.fire({
                title: "Do you want log in to continue?",
                text: "Please log in before you apply this Job!",
                icon: "question",
                showDenyButton: true,
                confirmButtonText: 'Yes',
                denyButtonText: "No",
                dangerMode: true
            })
            .then(res => {
                navigate(res.isConfirmed ? '/login' : '')
            })
    }

    const deleteApply = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Cancel apply this Job",
            icon: "warning",
            showDenyButton: true,
            denyButtonText: "No"
        }).then(res => {
            if(res.isConfirmed){
                axios.delete(`http://localhost:3000/apply/${listApply.filter(ele => ele.userId === ~~sessionStorage.getItem("userId") && ele.idJob === ~~jobInfo.id)[0].id}`)
                .then(
                    Swal.fire({
                    title: "Deleted your apply CV",
                    text: "Have a nice day",
                    icon: "success"
                }).then(
                    setCheckApply(false)
                ))
            }else{
                Swal.fire({
                    title: "You aren't cancel your apply CV",
                    text: "Have a nice day",
                    icon: "success"
                })
            }
            
        })
    }

    useEffect(() => {
        axios.get(`http://localhost:3000/job/${id.id}`).then(res => {
            setJobInfo(res.data)
        })// eslint-disable-next-line
    }, [id.id]);
    
    useEffect(() => {
        axios.get(`http://localhost:3000/job`).then(res => {
            setlistSimilarJob(res.data)
        });
        axios.get(`http://localhost:3000/apply`).then(res => {
            setListApply(res.data)
        })
    },[])

    useEffect(() => {
        if(!!companyId){// eslint-disable-next-line
            axios.get(`http://localhost:3000/company/${companyId}`).then(res => {// eslint-disable-next-line
                setCompanyInfo(res.data)// eslint-disable-next-line
            })// eslint-disable-next-line
        }// eslint-disable-next-line
    }, [companyId]);

    useEffect(() => {
        if((listApply.filter(ele => ele.userId === ~~sessionStorage.getItem("userId") && ele.idJob === ~~jobInfo.id).length) !== 0){
            setCheckApply(true);
        }// eslint-disable-next-line
    },[(listApply.filter(ele => ele.userId === ~~sessionStorage.getItem("userId") && ele.idJob === ~~jobInfo.id).length)])

    return (
        <div className="container">
            <div className="detail--job">
                <div className="detai--job--info">
                    <div >
                        <p className="detai--job--name">{jobInfo.name}</p>
                        <p className="detai--job--salary">Salary: <span>{jobInfo.salary} Vnd</span></p>
                        <p className="detai--job--company">Company: <Link to={`/company/${companyInfo.id}`}>{companyInfo.name}</Link></p>
                        <p className="detai--job--company--address">Address: <span>{companyInfo.address}</span></p>
                    </div>
                    <img
                        src={`/images/${companyInfo.avatar}`}
                        alt=""
                    />
                </div>
                <div className="detail--job--description--list">
                    <p className="detail--job--description--list--title">Job Description</p>
                    <div className="detail--job--description">
                        <p className="detail--job--description--title">Description</p>
                        {!!jobInfo.description && jobInfo.description.map((ele, index) => <p key={index} className="detail--job--description--item"><span className="dot"></span>{ele}</p>)}
                    </div>
                    <div className="detail--job--description">
                        <p className="detail--job--description--title">Required</p>
                        {!!jobInfo.required && jobInfo.required.map((ele, index) => <p key={index} className="detail--job--description--item"><span className="dot"></span>{ele}</p>)}
                    </div>
                </div>
                <div>
                    {checkApply
                    ?
                        <button className="btn btn--apply" onClick={deleteApply}>Cancel</button>
                    :
                        <button className="btn btn--apply" onClick={applyCv}>Apply CV</button>
                    }
                   
                </div>
            </div>
            <div className="similar--job">
                <p className="similar--job--title">Similar jobs</p>
                <div className="similar--job--list">
                    {listSimilarJob.filter(ele => ele.companyId === companyId && ele.id !== jobInfo.id).map((ele, index) => <Job data={ele} key = {index}/>)}
                </div>
            </div>
        </div>
    )
}


export default JobDetail;