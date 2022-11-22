import React, { useState, useEffect } from "react";
import '../../CSS/Contest.css'
import ContestFilter from "./ContestFilter";
import ContestItem from "./ContestItem";
import TopBar from "../TopBar";
import {Button} from '@mui/material'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
const ContestList = () => {

    const [contests, setContests] = useState([]);
    const [contestListHeader, setcontestListHeader] = useState({"Name":"Contest Name", "Start":"Start", "Duration":"Dur.", "Participation":"C", "Owner":"Owner"});


	const dummy = () => {
		setContests([{"id":1, "Name":"Structured Programming Lab", "Start":"10 aug 2022", "Duration":180, "Participation":51, "Owner":"SWE 223 18-19"},
					 {"id":2, "Name":"Competitive Programming Lab", "Start":"7 april 2022", "Duration":120, "Participation":48, "Owner":"SWE 221 18-19"},
					 {"id":3, "Name":"Data Structure Lab", "Start":"6 dec 2021", "Duration":150, "Participation":49, "Owner":"SWE 125 18-19"},
					 {"id":4, "Name":"Algorithm Lab", "Start":"23 jun 2021", "Duration":120, "Participation":55, "Owner":"SWE 123 18-19"}]);
	}

	useEffect(() => {
		dummy();
	}, [])

    return (
        <div className="Contestlist">
            <TopBar/>
			<div className="gap8"/>
			<ContestFilter/>
			<div className="ContestsContainer">
				<ContestItem contest={contestListHeader}/>
				{contests.map((contest)=> {return <ContestItem contest={contest}/>})}
			</div>
        </div>
  );
}

export default ContestList;