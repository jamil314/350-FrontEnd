import React, { useState, useEffect } from "react";
import '../../CSS/Problem.css';
import axios from 'axios';
import TopBar from "../TopBar";
import ProblemItem from "./ProblemItem";
import ProblemFilter from "./ProblemFilter";
const Problems = () => {

	const [problems, setProblems] = useState([{}]);
	const [problemHeader, setProblemHeader] = useState({});


	async function getAllProblems(){
		axios.get('http://localhost:3000/problem', {
		}).then((res) =>{
            console.log(res.data);
			setProblems(res.data);
		})
	}
	

	useEffect(() => {
		getAllProblems()
	}, [])

	return (
		<div className="App Problem">
			<TopBar/>
			<div className="gap8"/>
			<ProblemFilter/>
			<div className="ProblemsContainer">
				<ProblemItem problem="" header={true}/>
				<div className="ProblemsContainerScroller">
					{problems.map((problem)=> {return <ProblemItem problem={problem} header={false}/>})}
				</div>
			</div>

		</div>
  );
}

export default Problems;