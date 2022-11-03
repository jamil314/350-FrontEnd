import React from "react";
import '../../CSS/Contest.css'
const ProblemItem = (prop) => {

    const oepnProblem = () => {
        window.location.href = '/problem/'+prop.problem.id;
    }


    return (
        <div className="ProblemItem">
            <div className="ProblemTitle ThinBorder clickable" onClick={oepnProblem}>{prop.problem.Title}</div>
            <div className="ProblemSolved ThinBorder">{prop.problem.Solved}</div>
            <div className="ProblemTried ThinBorder">{prop.problem.Tried}</div>
        </div>
  );
}

export default ProblemItem;