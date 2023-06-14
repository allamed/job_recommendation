import logo from './logo.svg';
import './App.css';

import Employee from "./Employee";
import {useState} from "react";
import Employer from "./pages/Employer";

function App() {
    const [employee, setEmployee] = useState(true)

  return (
      <>
          <button className={"btn btn-primary"}
          onClick={() => setEmployee(!employee)}
          >{employee? "switch to employer" : "switch to employee"}</button>
          {
                employee ? <Employee/> : <Employer/>
          }
        </>
  );
}

export default App;
