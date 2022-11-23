import {React, useEffect, useState} from "react";
import '../../CSS/Contest.css'
import StatusItem from "../StatusItem";
const Status = (prop) => {

	const gotoProblem = (pid) => {
		prop.gotoProblem(pid);
	}

	const [statusHeader, setstatusHeader] = useState({"userName":"User", "problemTitle":"Problem", "verdict":"Verdict"});



    return (
        <div className="Status">
			<StatusItem header = {true} status = {statusHeader}/>
			<div className="StatusContainer">
				{prop.submissions.map((status)=> {return <StatusItem 
						gotoProblem = {gotoProblem}
						status = {status}
					/>}
				)}
			</div>
        </div>
  );
}

export default Status;