import {React, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import '../../CSS/Contest.css'
import TopBar from "../TopBar";
import Standing from "./Standing"
import Problemset from "./Problemset"
import Status from "./Status"
import Clarification from "./Clarification"

const Contest = () => {
    
    const {id} = useParams();
    const [mainContent, setmainContent] = useState("Standing");

    const loadStanding = () =>{
        setmainContent("Standing");
    }
    const loadProblemset = () =>{
        setmainContent("Problemset");
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
                    <div className="StepContainer Step1Container">
                        <text onClick={loadStanding}>Standings</text>
                    </div>
                    <div className="StepContainer Step2Container">
                        <text onClick={loadProblemset}>Problemset</text>
                    </div>
                    <div className="StepContainer Step3Container">
                        <text onClick={loadStatus}>Status</text>
                    </div>
                    <div className="StepContainer Step4Container">
                        <text onClick={loadClarification}>Clarification</text>
                    </div>
                </div>
            {
                mainContent === "Standing" ? <Standing/> :
                mainContent === "Problemset" ? <Problemset/> :
                mainContent === "Status" ? <Status/> :
                <Clarification/>
            }
        </div>
  );
}

export default Contest;