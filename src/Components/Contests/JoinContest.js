import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../../CSS/Contest.css'
import {Button, TextField, InputAdornment} from '@mui/material';
import axios from 'axios';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import TopBar from "../TopBar";

const JoinContest = () => {

    const {id} = useParams();
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    const [showPass, setShowPass] = useState(true);

	const fetchContest = async () => {
        handleSubmit(false);
		axios.get('http://localhost:3000/contest/byId/'+id, {
		}).then((res) =>{
            console.log(res.data);
			setName(res.data.contestName);
		})
	}

    const handleSubmit = (submitted) => {
        axios.post('http://localhost:3000/contest/joincontest', {
            contestId: id,
            password:pass,
            contestAuthorization: localStorage.getItem('contestToken')
		},{
            headers: { 'authorization': localStorage.getItem('token') }
        }).then((res) =>{
            if(res.data.status == "new"){
                localStorage.setItem('contest', id);
                localStorage.setItem('contestToken', res.data.contestToken);
            }
            window.location.href = "/contest/"+id;
		}).catch((res) =>{
            if(submitted)
                alert("Wrong Password")
		})
    }

	useEffect(() => {
		fetchContest();
	}, [])

    return (
        <div className="JoinContest">
            <TopBar/>
            <div className="LoginContest flexColumn">
                <h1> {name} </h1>
                <TextField 
                    label="Password"
                    margin="none"
                    variant="outlined"
                    value={pass}
                    type = {showPass?"text":"password"}
                    required
                    onChange={(e) => setPass(e.target.value)}
                    InputProps={{
                        endAdornment:
                            showPass? <InputAdornment position='end' onClick = {() => setShowPass(false)}><VisibilityIcon className="point"/></InputAdornment>
                            : <InputAdornment position='end' onClick = {() => setShowPass(true)}><VisibilityOffIcon className="point"/></InputAdornment>
                    }}
                />
                <div className="gap8"/>
                <div className="gap8"/>
                <div className="flexRow">

                    <Button
                        onClick={() =>  window.location.href = "/contests" }
                    >Cancel</Button>

                    <Button  
                        onClick = {() => handleSubmit(true)}
                    ><TaskAltIcon/>Log in</Button>
                </div>
            </div>
        </div>
  );
}

export default JoinContest;