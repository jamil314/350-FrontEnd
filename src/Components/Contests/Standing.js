import {useState, useEffect, React} from "react";
import '../../CSS/Contest.css'
import StandingItem from "./StandingItem";
const Standing = () => {

    const [standing, setstanding] = useState([]);
    const [standingHeader, setstandingHeader] = useState({"Participent":"Participent(s)", "Solved":"Solved", "Penalty":"Penalty", "A":"A", "B":"B", "C":"C", "D":"D", "E":"E"});


	const dummy = () => {
		setstanding([{"id":1, "Participent":"Sust_LeviSquad", "Solved":5, "Penalty":180, "A": "+1", "B": "+1","C": "+2","D":"+1" ,"E":"+1"},
					 {"id":2, "Participent":"Berlekampmassey", "Solved":4, "Penalty":120, "A": "+1", "B": "+1","C": "+3","D":"-1" ,"E":"+1"},
					 {"id":3, "Participent":"Sust_Carnage", "Solved":3, "Penalty":150, "A": "+3", "B": "+1","C": "+2","D":"-2" ,"E":"-3"},
					 {"id":4, "Participent":"Sust_TripleHash", "Solved":3, "Penalty":170, "A": "+5", "B": "+4","C": "+2","D":"-3" ,"E":"-4"},
					 {"id":5, "Participent":"Sust_Londoni_Brothers", "Solved":3, "Penalty":120, "A": "+1", "B": "+1","C": "-","D":"+3" ,"E":"-3"}]);
	}

	useEffect(() => {
		dummy();
	}, [])

    return (
        <div className="Standing">
			<StandingItem participent={standingHeader}/>
			{standing.map((participent)=> {return <StandingItem participent={participent}/>})}
        </div>
  );



}

export default Standing;