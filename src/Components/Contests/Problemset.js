import {useState, useEffect, React} from "react";
import '../../CSS/Contest.css'
import ProblemItem from "../Contests/ProblemItem";
const Problemset = (prop) => {

    const [Problem, setProblem] = useState([]);
    const [ProblemHeader, setProblemHeader] = useState({"alias":"Title"});


	const dummy = () => {
		setProblem([{"id":1, "Title":"Olympic Ranking", "Solved":5, "Tried":5},
					 {"id":2, "Title":"Aliquot Sum", "Solved":5, "Tried":5},
					 {"id":3, "Title":"A Sorting Problem", "Solved":4, "Tried":5},
					 {"id":4, "Title":"Drunk Passenger", "Solved":3, "Tried":5},
					 {"id":5, "Title":"Eatcoin", "Solved":3, "Tried":4}]);
	}

    const gotoProblem = (pid) => {
        prop.gotoProblem(pid);
    }


    useEffect(() => {
		// dummy();
        setProblem(prop.problems)
	}, [])


    return (
        <div className="Problemset">
            <ProblemItem problem={ProblemHeader}/>
            {Problem.map((problem)=> {return <ProblemItem 
                                                gotoProblem = {gotoProblem}
                                                problem={problem} 
                                                ac = {prop.verdicts.accepted.get(problem.id) || 0}
                                                tot = {(prop.verdicts.rejected.get(problem.id) || 0) + (prop.verdicts.accepted.get(problem.id) || 0 )} 
                                            />})}
        </div>
  );
}

export default Problemset;