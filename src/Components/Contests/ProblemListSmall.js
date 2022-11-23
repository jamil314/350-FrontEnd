import {React, useEffect, useState} from "react";
import '../../CSS/Contest.css'
import ProblemCard from "../Problems/ProblemCard";
const ProblemListSmall = (prop) => {
    console.log(prop.pid);
    const [problem, setProblem] = useState(prop.pid);

    const changeProblem = (id) => {
        setProblem(id);
        prop.setCurrentProblem(id);
    }

    return (
        <div className="ProblemListSmall">
            <div className="flexRow">
                <div className="ProblemListSteps">
                    {prop.problems.map((p, index) => (
                        <div onClick={() => changeProblem(p.problemID)}
                        className={problem==p.problemID?"ActivePoblemShrotCut":"PoblemShrotCut"}>
                            <text>{String.fromCharCode(97+index)}</text>
                        </div>
                    ))}
                </div>
            </div>
            <ProblemCard id = {problem} contestId = {prop.contest}/>
        </div>
  );
}

export default ProblemListSmall;