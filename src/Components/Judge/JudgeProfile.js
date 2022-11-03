import React, { useState, useEffect } from "react";
import '../../CSS/Judge.css'
import TopBar from "../TopBar";
const JudgeProfile = () => {
    const [judgeProfile, setJudgeProfile] = useState({})
    const [setted, setSetted] = useState([])
    const [tested, setTested] = useState([])

    const dummy = () => {
        setJudgeProfile({"Name":"Jamil", "Email":"jamil31415926@gmail.com", "Setted":3, "Tested": 7});
    
        setSetted([{"Id":1, "Title":"Frog Jumping"}, {"Id":2, "Title":"Airport"}]);
        setTested([{"Id":3, "Title":"3n+1"}, {"Id":4, "Title":"A node too far"}]);
    }

    const editJudgeProfile = () => {
        alert("Editing judge profile");
    }

    const openProblem = (Id) => {
        alert("Opening Problem: "+Id);
    };

	useEffect(() => {
    	dummy()
	}, [])

    return (
        <div className="App">
            <TopBar/>
            <div className="JudgeProfile">
                <div className="ProfileInfo">
                    Personal Information <br/>
                    Name: {judgeProfile.Name} <br/>
                    Email: {judgeProfile.Email} <br/>
                    Setted: {judgeProfile.Setted} <br/>
                    Tested: {judgeProfile.Tested} <br/>
                    <button onClick= {editJudgeProfile}>Edit info</button>
                </div>
                <div className="Contribution">
                    <h1>Setted Problems</h1>
                    {setted.map((settedProblem) => {
                        return(
                            <li onClick={() => openProblem(settedProblem.Id)}>
                                {settedProblem.Title}
                            </li>
                        );
                    })}

                    <h1>Tested Problems</h1>
                    {tested.map((testedProblem) => {
                        return(
                            <li onClick={() => openProblem(testedProblem.Id)}>
                                {testedProblem.Title}
                            </li>
                        );
                    })}

                    <button onClick={() => window.location.href = '/judge/setnew'}>+ Set new Problem</button>

                </div>
            </div>
        </div>
  );
}

export default JudgeProfile;