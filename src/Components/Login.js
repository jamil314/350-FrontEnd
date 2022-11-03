import React from "react";
import { useState, useEffect } from "react";
import {Button, TextField, InputAdornment} from '@mui/material';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import LockOpenIcon from '@mui/icons-material/LockOpen';

import "../CSS/Register.css";
import TopBar from "./TopBar";

const Login = () => {

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [showPass, setShowPass] = useState(true);


  return (
    <div class="Register">
      <TopBar/>
      <div className="flexRow">
        <div className="loginCard center">
        	<h1><LockOpenIcon/>Login</h1>
			<TextField 
				label="UserName or Password" 
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
						showPass? <InputAdornment position='end' onClick = {() => setShowPass(false)}><VisibilityIcon/></InputAdornment>
						: <InputAdornment position='end' onClick = {() => setShowPass(true)}><VisibilityOffIcon/></InputAdornment>
				}}
			/>
			

          	<Button  
				onClick = {() => {alert("Logged In")}}
		  	><TaskAltIcon/>  Log in</Button>
        <p>
          <span>
          	Don't have an account?{"  "}
            <a href="/register">Sign Up</a>
          </span>
		  <br/>
          <span>
            By continuing, you agree to our<br/>
            <a href="/terms">Terms of Service</a> and{" "}
            <a href="/privacy">Privacy Policy</a>.
          </span>
        </p>
      </div>
      </div>
    </div>
  );
};
export default Login;
