import React, { useState, useEffect } from "react";
import '../../CSS/Problem.css';
import axios from 'axios';
import TopBar from "../TopBar";
import ProblemItem from "./ProblemItem";
import ProblemFilter from "./ProblemFilter";
const Problems = () => {

	const [problems, setProblems] = useState([]);
	const [problemHeader, setProblemHeader] = useState({});


	const fetchSubmissions = (prb) => {
		prb.map((p, index) => {
			axios.get('http://localhost:3000/submission/byProblem/'+p.problemID, {
			}).then((res) =>{
				// console.log(res.data);
				let subs = res.data;
				p.try = subs.length;

                const ac = subs.filter(
                    sub => sub.verdict == "Accepted"
                )
				p.ac = ac.length;

				if(index == prb.length - 1) setProblems(prb);
			})
			
		})
	}


	async function getAllProblems(){
		axios.get('http://localhost:3000/problem', {
		}).then((res) =>{
            // console.log(res.data);
			// setProblems(res.data);
			let prb = res.data;
			prb.map((p, index) => {
				p.tag = "";
				axios.get('http://localhost:3000/problem/getTag/'+p.problemID, {
				}).then((res) =>{
					const tags = res.data;
					tags.map((t) => {
						p.tag += t.tag
					});
				})
				if(index == prb.length - 1){
					fetchSubmissions(prb);
				}
			})

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