import './Assets/Css/reset.css';
import './Assets/Css/variables.css';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import MainLayout from './Layout/MainLayout';
import HomePage from './Page/Homepage';
import JobDetail from './Components/Job/JobDetail';
import LogIn from './Components/Form/Login';
import SignUp from './Components/Form/SignUp';
import ApplyForm from './Components/Form/ApplyForm';
import CompanyPage from './Page/CompanyPage';
import CompanyDetail from './Components/Company/CompanyDetail';

function App() {
  return (
    <>
    <BrowserRouter forceRefresh={true}>
      <Routes>
        <Route path = "/" element = {<MainLayout/>}>
          <Route path = "/" element = {<HomePage/>}/>
          <Route path = "job/:id" element = {<JobDetail/>}/>
          <Route path = "login" element = {<LogIn/>}/>
          <Route path = "signup" element = {<SignUp/>}/>
          <Route path = "applyform/:id" element = {<ApplyForm/>}/>
          <Route path = "company" element = {<CompanyPage/>}/>
          <Route path = "company/:id" element = {<CompanyDetail/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
      
    </>
  );
}

export default App;
