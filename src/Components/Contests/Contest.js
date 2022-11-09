import {React, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import '../../CSS/Contest.css'
import TopBar from "../TopBar";
import Standing from "./Standing"
import Problemset from "./Problemset"
import Status from "./Status"
import Clarification from "./Clarification"
import ProblemListSmall from "./ProblemListSmall";

const Contest = () => {
    
    const {id} = useParams();
    const [mainContent, setmainContent] = useState("Standing");

    const loadStanding = () =>{
        setmainContent("Standing");
    }
    const loadDashboard = () =>{
        setmainContent("Dashboard");
    }
    const loadProblems = () =>{
        setmainContent("Problems");
    }
    const loadStatus = () =>{
        setmainContent("Status");
    }
    const loadClarification = () =>{
        setmainContent("Clarification");
    }
    

	return (
        <div className="Contest">
            <TopBar></TopBar>

            <div className="Steps">
                    <div className={mainContent=="Dashboard"?"ActiveStepContainer":"StepContainer"}>
                        <text onClick={loadDashboard}>Dashboard</text>
                    </div>
                    <div className={mainContent=="Problems"?"ActiveStepContainer":"StepContainer"}>
                        <text onClick={loadProblems}>Problems</text>
                    </div>
                    <div className={mainContent=="Standing"?"ActiveStepContainer":"StepContainer"}>
                        <text onClick={loadStanding}>Standings</text>
                    </div>
                    <div className={mainContent=="Status"?"ActiveStepContainer":"StepContainer"}>
                        <text onClick={loadStatus}>Status</text>
                    </div>
                    <div className={mainContent=="Clarification"?"ActiveStepContainer":"StepContainer"}>
                        <text onClick={loadClarification}>Clarification</text>
                    </div>
            </div>
            {
                mainContent === "Dashboard" ? <Problemset contest = {id}/> :
                mainContent === "Problems" ? <ProblemListSmall contest = {id}/> :
                mainContent === "Standing" ? <Standing contest = {id}/> :
                mainContent === "Status" ? <Status contest = {id}/> :
                <Clarification contest = {id}/>
            }
        </div>
  );
}

export default Contest;