import logo from './logo.svg';
import './App.css';
import JobOffers  from "./pages/JobOffers";
import RecommendedJobOffers from "./pages/RecommendedJobOffers";
import UserDashboard from "./pages/UserDashboard";
import SignUpForm from "./pages/SignUpForm";
import {useState} from "react";
import SignInForm from "./pages/SignInForm";

function Employee() {
    const [userName, setUserName] = useState('');
    const [signedIn, setSignedIn] = useState(false);
    return (
        <>
            {
                signedIn ? <SignInForm setUserName={setUserName} setSignedIn={setSignedIn}/> : <SignUpForm setUserName={setUserName} setSignedIn={setSignedIn}/>
            }

            <UserDashboard userName={userName} setSignedIn={setSignedIn}/>
        </>
    );
}

export default Employee;
