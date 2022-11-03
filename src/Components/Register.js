import React from "react";
import { useState, useEffect } from "react";
import {Button, TextField, InputAdornment} from '@mui/material';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

import "../CSS/Register.css";
import TopBar from "./TopBar";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;
const EM_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Register = () => {

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);

  const [showPass, setShowPass] = useState(true);



  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setValidEmail(EM_REGEX.test(email));
  }, [email]);


  return (
    <div class="Register">
      <TopBar/>

      <div className="flexRow">
        <div className="regesterCard center">
        	<h1 className="signUpH1">    Sign Up</h1>
			<TextField 
				label="User Name" 
				margin="none"
				variant="outlined"
				fullWidth
				value={user}
				required
				color="success"
				onChange={(e) => setUser(e.target.value)}
				{...(!validName && {error:true, helperText:"4 to 24 characters."})}
			/>
			<TextField 
				label="Email"
				margin="none"
				variant="outlined"
				fullWidth
				value={email}
				required
				color="success"
				onChange={(e) => setEmail(e.target.value)}
				{...(!validEmail && {error:true, helperText:"Invalid Email"})}
			/>
			<TextField 
				label="Password"
				margin="none"
				variant="outlined"
				fullWidth
				value={pwd}
				type = {showPass?"text":"password"}
				required
				color="success"
				onChange={(e) => setPwd(e.target.value)}
				{...(!validPwd && {error:true, helperText:"8 - 24 character"})}
				InputProps={{
					endAdornment:
						showPass? <InputAdornment position='end' onClick = {() => setShowPass(false)}><VisibilityIcon/></InputAdornment>
						: <InputAdornment position='end' onClick = {() => setShowPass(true)}><VisibilityOffIcon/></InputAdornment>
				}}
			/>
			

			<TextField 
				label="Confirm Password"
				margin="none"
				variant="outlined"
				fullWidth
				value={matchPwd}
				type = {showPass?"text":"password"}
				required
				color="success"
				onChange={(e) => setMatchPwd(e.target.value)}
				{...(!validMatch && {error:true, helperText:"Insert First Password Again"})}
				InputProps={{
					endAdornment:
						showPass? <InputAdornment position='end' onClick = {() => setShowPass(false)}><VisibilityIcon/></InputAdornment>
						: <InputAdornment position='end' onClick = {() => setShowPass(true)}><VisibilityOffIcon/></InputAdornment>
				}}
			/>
		  

          	<Button  
			  	disabled={!validName || !validPwd || !validMatch ? true : false}
				onClick = {() => {alert("signed Up")}}
		  	><TaskAltIcon/>  Sign Up</Button>
        <p>
          <span>
          	Already Have an account?{"  "}
            <a href="/login">Sign In</a>
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
export default Register;
