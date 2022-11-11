import React from "react";
import { useState, useEffect } from "react";
import {Button, TextField, InputAdornment} from '@mui/material';
import axios from 'axios';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';

import "../CSS/Register.css";
import TopBar from "./TopBar";

const Login = (prop) => {

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [showPass, setShowPass] = useState(true);

	const handleSubmit = () => {
		axios.post('http://localhost:3000/user/login', {
			username:user,
			password:pwd
		}).then((res) =>{
			alert("Logged in Successfully")
			localStorage.setItem('token', res.data.token);
			localStorage.setItem('userID', res.data.userID);
			prop.abort()
		}).catch((res) => {
				alert("Incorrect username or Password")
		})
	}

  return (
    <div class="LoginMain">
		<div className="LoginBigLogo"/>
		<div className="width500px flexRow">
			<div className="loginCard center">
				<h1><LockOpenIcon/>Login</h1>
				<TextField 
					label="Username or Email" 
					margin="none"
					variant="outlined"
					fullWidth
					value={user}
					required
					onChange={(e) => setUser(e.target.value)}
				/>
				<TextField 
					label="Password"
					margin="none"
					variant="outlined"
					fullWidth
					value={pwd}
					type = {showPass?"text":"password"}
					required
					onChange={(e) => setPwd(e.target.value)}
					InputProps={{
						endAdornment:
							showPass? <InputAdornment position='end' onClick = {() => setShowPass(false)}><VisibilityIcon className="point"/></InputAdornment>
							: <InputAdornment position='end' onClick = {() => setShowPass(true)}><VisibilityOffIcon className="point"/></InputAdornment>
					}}
				/>
				<div className="flexRow">
					<Button  
						onClick = {() => {prop.abort()}}
					><DisabledByDefaultIcon/>Abort</Button>
					
					<Button  
						onClick = {() => handleSubmit()}
					><TaskAltIcon/>Log in</Button>
				</div>
				<p>
				<span>
					Don't have an account?{"  "}
					<a className="isLink" onClick={() => prop.setState("signup")()}>Sign Up</a>
				</span>
				<br/>
				<br/>
				</p>
			</div>
		</div>
    </div>
  );
};
export default Login;
