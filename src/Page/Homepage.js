import "../Assets/Css/homepage.css"
import { FaRegFlag, FaMoneyBillWave  } from "react-icons/fa";
import Banner from "../Components/Homepage/Banner";
import { useEffect, useState } from "react";
import Job from "../Components/Job/Job";
import axios from "axios";

const HomePage = () => {

    const [search, setSearch] = useState({});
    const [listJob, setListJob] = useState([]);
    const [listJobSearch, setListJobSearch] = useState([]);

    const changeHandleSearch = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setSearch({
            ...search,
            [key]: value
        })
    }

    const clickHandleSearch = () => {
        setListJobSearch(listJob.filter(ele => search.place === undefined ? true : ele.place === search.place).filter(ele =>  search.salaryFrom === undefined ? true : ele.salary >= search.salaryFrom).filter(ele => search.salaryTo === undefined ? true : ele.salary <= search.salaryTo))
    }

    useEffect(
        () =>{
            axios.get(`http://localhost:3000/job`).then(res => {
                setListJob(res.data);
            });
    },[])
    return (
        <div className="homapage">
            <div className="search--bar">
                <div className="search--place">
                    <label htmlFor="select--place">
                        <FaRegFlag className="icon"/>
                        <select defaultValue={0}  id = {"select--place".toString()} name= "place" className="select--picker" onChange={changeHandleSearch}>
                            <option value={""} disabled selected>Select Localtion</option>
                            {[...new Set(listJob.map(ele => ele.place))].map((place, index) => <option key={index} value={place}>{place}</option>)}
                        </select>
                    </label>
                </div>
                <div className="search--salary">
                    <div className="search--salary--from">
                        <label htmlFor="select--salary--from">
                            <FaMoneyBillWave className="icon"/>
                            <select defaultValue={0}  id={"select--salary--from".toString()} name="salaryFrom" className="select--picker" onChange={changeHandleSearch}>
                                <option value={""} disabled selected>Salary From</option> 
                                {[...new Set(listJob.map(ele => ele.salary))].map((salary, index) => <option key={index} value={salary}>{salary}</option>)}
                            </select>
                        </label>
                    </div>
                    <div className="search--salary--to">
                        <label htmlFor="select--salary--to">
                            <FaMoneyBillWave className="icon"/>
                            <select defaultValue={0}  id = {"select--salary--to".toString()} name="salaryTo" className="select--picker" onChange={changeHandleSearch}>
                                <option value={""} disabled selected>Salary To</option> 
                                {
                                    [...new Set(listJob.map(ele => ele.salary).filter(salary => !search.salaryFrom  ? true : salary > search.salaryFrom))].map((salary, index) => <option key={index} value={salary}>{salary}</option>)
                                }
                            </select>
                        </label>
                    </div>
                </div>
                <button className="btn btn--search" onClick={clickHandleSearch}>Search</button>
            </div>
            <Banner/>
            <div className="list--job">
                {
                    !!listJobSearch.length 
                    ?
                        listJobSearch.map((ele, index) => <Job key={index} data={ele}/>)
                    :
                        listJob.map((ele, index) => <Job key={index} data={ele}/>)
                }
            </div>
        </div>
    )
}

export default HomePage;