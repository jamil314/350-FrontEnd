import React from "react";
import '../CSS/Problem.css'
const StatusItem = (prop) => {
    console.log(prop.status.userName, prop.status.verdict);
    
    const gotoProblem = () => {
        if( !prop.header) prop.gotoProblem(prop.status.problemId);
    }

    const gotoProfile = () => {
        if( !prop.header) window.location.href='/profile/'+prop.status.userId;;
    }

    

    return (
        <div className="StatusItem">
            <div className= {prop.header? "StatusTitle ThinBorder" : "StatusTitle ThinBorder clickable" } 
            onClick={() => gotoProblem()}
            >{prop.header? "Problem" : prop.status.problemTitle}</div>
            <div className={prop.header? "StatusName ThinBorder" : "StatusName ThinBorder clickable" }
            onClick={() => gotoProfile()}
            >{prop.header? "User" : prop.status.userName}</div>
            <div className="StatusVerdict ThinBorder">{prop.header? "Verdict" : prop.status.verdict}</div>
        </div>
  );
}

export default StatusItem;