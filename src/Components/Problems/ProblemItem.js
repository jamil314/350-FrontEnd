import React, { useState, useEffect } from "react";
import '../../CSS/Problem.css'
const ProblemItem = (prop) => {
    
    const oepnProblem = () => {
        window.location.href = '/problem/'+prop.problem.problemID;
    }


    return (
        <div className="ProblemItem">
            <div className="ProblemTitle ThinBorder clickable" onClick={oepnProblem}>
                {prop.problem == "" ? "Title" : prop.problem.title}</div>
            <div className="ProblemTags ThinBorder">
                {prop.problem == "" ? "Tags" : "Ad-Hoc"}</div>
            <div className="ProblemDiff ThinBorder">
                {prop.problem == "" ? "Difficulty" : "1200"}</div>
            <div className="ProblemSolved ThinBorder">
                {prop.problem == "" ? "Solved" : 43}</div>
            <div className="ProblemTried ThinBorder">
                {prop.problem == "" ? "Tried" : 51}</div>

        </div>
  );
}

export default ProblemItem;