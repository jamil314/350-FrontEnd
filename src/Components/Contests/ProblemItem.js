import React from "react";
import '../../CSS/Contest.css'
const ProblemItem = (prop) => {

    const oepnProblem = () => {
        if(prop.problem.id){
            prop.gotoProblem(prop.problem.problemID)
        }
    }


    return (
        <div className="ProblemItem">
            <div className= {prop.problem.problemID ? "ProblemTitle ThinBorder clickable" : "ProblemTitle ThinBorder" } 
            onClick={oepnProblem}>{prop.problem.alias}</div>
            <div className="ProblemSolved ThinBorder">{prop.ac == undefined ? "Accepted" : prop.ac}</div>
            <div className="ProblemTried ThinBorder">{ prop.tot == undefined ? "Tried" : prop.tot }</div>
        </div>
  );
}

export default ProblemItem;