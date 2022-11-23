import {useState, useEffect, React} from "react";
import '../../CSS/Contest.css'
import StandingItem from "./StandingItem";
const Standing = (prop) => {

    const [standing, setstanding] = useState([]);
    const [standingHeader, setstandingHeader] = useState({"userName":"Participent", "solved":"Solved", "penalty":"Penalty"});
	console.log(prop.standing);

    return (
        <div className="Standing">
			<StandingItem item={standingHeader} header = {true}/>
			{prop.standing.map((item)=> {return <StandingItem item={item}/>})}
        </div>
  );



}

export default Standing;