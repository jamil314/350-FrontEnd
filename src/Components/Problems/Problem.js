import React from "react";
import { useParams } from "react-router-dom";
import '../../CSS/Problem.css'
import TopBar from "../TopBar";
import ProblemCard from "./ProblemCard";
const Problem = () => {
    const {id} = useParams();
    return (
        <div className="Problem">
            <TopBar/>
            <ProblemCard id = {id} contestId = {null}/>
        </div>
  );
}

export default Problem;