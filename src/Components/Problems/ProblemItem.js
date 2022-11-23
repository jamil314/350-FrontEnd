import React, { useState, useEffect } from "react";
import '../../CSS/Problem.css'
const ProblemItem = (prop) => {
    
    const oepnProblem = () => {
        if(! prop.header)
            window.location.href = '/problem/'+prop.problem.problemID;
    }

    console.log(prop.problem);


    return (
        <div className="ProblemItem">
            <div className= {prop.header? "ProblemTitle ThinBorder" :"ProblemTitle ThinBorder clickable"}
                 onClick={oepnProblem}>
                {prop.problem == "" ? "Title" : prop.problem.title}</div>
            <div className="ProblemTags ThinBorder">
                {prop.problem == "" ? "Tags" : prop.problem.tag}</div>
            <div className="ProblemDiff ThinBorder">
                {prop.problem == "" ? "Difficulty" : prop.problem.difficulty}</div>
            <div className="ProblemSolved ThinBorder">
                {prop.problem == "" ? "Solved" : prop.problem.ac}</div>
            <div className="ProblemTried ThinBorder">
                {prop.problem == "" ? "Tried" : prop.problem.try}</div>

        </div>
  );
}

export default ProblemItem;