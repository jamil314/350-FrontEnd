import {useState, useEffect, React} from "react";
import '../../CSS/Contest.css'
import ProblemItem from "../Contests/ProblemItem";
const Problemset = () => {

    const [Problem, setProblem] = useState([]);
    const [ProblemHeader, setProblemHeader] = useState({"Title":"Title", "Solved":"Solved", "Tried":"Tried"});


	const dummy = () => {
		setProblem([{"id":1, "Title":"Olympic Ranking", "Solved":5, "Tried":5},
					 {"id":2, "Title":"Aliquot Sum", "Solved":5, "Tried":5},
					 {"id":3, "Title":"A Sorting Problem", "Solved":4, "Tried":5},
					 {"id":4, "Title":"Drunk Passenger", "Solved":3, "Tried":5},
					 {"id":5, "Title":"Eatcoin", "Solved":3, "Tried":4}]);
	}

    useEffect(() => {
		dummy();
	}, [])


    return (
        <div className="Problemset">
            <ProblemItem problem={ProblemHeader}/>
            {Problem.map((problem)=> {return <ProblemItem problem={problem}/>})}
        </div>
  );
}

export default Problemset;