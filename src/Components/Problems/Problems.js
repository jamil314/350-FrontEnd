import React, { useState, useEffect } from "react";
import '../../CSS/Problem.css';
import axios from 'axios';
import TopBar from "../TopBar";
import ProblemItem from "./ProblemItem";
import ProblemFilter from "./ProblemFilter";
import {Button} from '@mui/material'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
const Problems = () => {

	const [problems, setProblems] = useState([]);
	const [problemHeader, setProblemHeader] = useState({});


	async function getAllProblems(){
		const response = await axios.get('http://localhost:3001/problem');
		
		setProblems(response.data);
		console.log(problems);
	}
	

	useEffect(() => {
		getAllProblems()
	}, [])

	return (
		<div className="App Problem">
			<TopBar/>
			<div className="gap8"/>
			<Button variant="contained" onClick={() => window.location.href='/newproblem'}><AddCircleOutlineOutlinedIcon/>Create Problem</Button>
			<ProblemFilter/>
			<div className="ProblemsContainer">
				<ProblemItem problem=""/>
				<div className="">
					{problems.map((problem)=> {return <ProblemItem problem={problem}/>})}
				</div>
			</div>
		</div>
  );
}

export default Problems;