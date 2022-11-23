import React, { useState, useEffect } from "react";
import '../../CSS/Contest.css'
import axios from 'axios';
import ContestFilter from "./ContestFilter";
import ContestItem from "./ContestItem";
import TopBar from "../TopBar";
const ContestList = () => {

    const [contests, setContests] = useState([]);
    const [contestListHeader, setcontestListHeader] = useState({"contestName":"Contest Name", "startTime":"Start", "endTime":"End", "Participation":"Participation"});

	const fetchContest = async () => {
		console.log("fetching contest");
		axios.get('http://localhost:3000/contest', {
		}).then((res) =>{
            console.log(res.data);
			setContests(res.data);
		})
	}

	useEffect(() => {
		fetchContest();
	}, [])

    return (
        <div className="Contestlist">
            <TopBar/>
			<div className="gap8"/>
			<ContestFilter/>
			<div className="ProblemsContainer">
				<ContestItem contest={contestListHeader} header={true}/>
				<div className="ProblemsContainerScroller">
					{contests.map((contest)=> {return <ContestItem contest={contest}  header={false}/>})}
				</div>
			</div>
        </div>
  );
}

export default ContestList;