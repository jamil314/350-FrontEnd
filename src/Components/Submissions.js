import {useState, useEffect, React} from "react";
import '../CSS/Problem.css'
import axios from 'axios';

import TopBar from "./TopBar";
import StatusItem from "./StatusItem";
const Submissions = () => {

    const [submissions, setSubmissions] = useState([]);

    const [header, setHeader] = useState({"problemTitle":"Problem", "userName":"User", "verdict":"Verdict"})

    const fetchSubmissions = async () => {
        await axios.get('http://localhost:3000/submission'
        ).then(res => {
            setSubmissions(res.data);
            console.log(res.data);
        }).catch(res => {
            console.log(res);
        });

    }

    useEffect(() => {
        fetchSubmissions();
	}, [])

    const gotoProblem = (pid) => {
        if(pid) window.location.href='/problem/'+pid;
    }

    return (
        <div className="Submissions">
            <TopBar/>
                <div className="flexRow">
                    <div className="Status marginTop24px">
                        <StatusItem header = {true} status = {header}/>
                        <div className="StatusContainer">
                            {submissions.map((status)=> {return <StatusItem 
                                    gotoProblem = {gotoProblem}
                                    status = {status}
                                />}
                                )}
                        </div>
                    </div>
                </div>
        </div>
  );
}

export default Submissions;