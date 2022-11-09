import {React, useEffect, useState} from "react";
import '../../CSS/Contest.css'
import ProblemCard from "../Problems/ProblemCard";
const ProblemListSmall = (prop) => {
    const [problem, setProblem] = useState(0);
    const [problemList, setProblemList] = useState([1, 2, 3, 4, 5]);

    return (
        <div className="ProblemListSmall">
            <div className="flexRow">
                <div className="ProblemListSteps">
                    {problemList.map((p, id) => (
                        <div onClick={() => setProblem(id)}
                        className={problem==id?"ActivePoblemShrotCut":"PoblemShrotCut"}>
                            <text>{String.fromCharCode(97+id)}</text>
                        </div>
                    ))}
                </div>
            </div>
            <ProblemCard id = {problemList.at(problem)} mode = "Contest"/>
        </div>
  );
}

export default ProblemListSmall;