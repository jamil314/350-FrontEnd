import React from "react";
import { useState, useEffect } from "react";
import {Button, TextField, InputAdornment} from '@mui/material';
import axios from 'axios';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';


import "../CSS/Register.css";
import TopBar from "./TopBar";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,24}$/;
const USER_REGEX = /^[A-z][A-z0-9-_]{5,24}$/;
const PWD_REGEX1 = /^[A-z0-9-_]{6,24}$/;
const PWD_REGEX2 = /^(?=.*[a-z])(?=.*[a-z])(?=.*[a-z]).{6,24}$/;
const PWD_REGEX3 = /^(?=.*[A-Z])(?=.*[A-Z])(?=.*[A-Z]).{6,24}$/;
const PWD_REGEX4 = /^(?=.*[0-9])(?=.*[0-9])(?=.*[0-9]).{6,24}$/;
const EM_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Register = (prop) => {

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [NameAvailable, setNameAvailable] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [EmailAvailable, setEmailAvailable] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd1, setValidPwd1] = useState(false);
  const [validPwd2, setValidPwd2] = useState(false);
  const [validPwd3, setValidPwd3] = useState(false);
  const [validPwd4, setValidPwd4] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);

  const [showPass, setShowPass] = useState(true);

  const [fullName, setFullName] = useState("");
  const [regNo, setRegNo] = useState("");


	const handleSubmit = () => {
		axios.post('http://localhost:3000/user/register', {
			name:fullName,
			username:user,
			email:email,
			password:pwd,
			regNo:regNo
		}).then((res) =>{
			alert("signed Up Successfully")
			prop.abort()
		}).catch((res) =>{
			console.log(res);
			alert("sign Up Failed")
			// prop.abort()
		})
	}

	const checkNameAvailability = () => {
		if(!validName) return true;
		axios.post('http://localhost:3000/user/nameAvailable', {
			username:user
		}).then((res) =>{
			setNameAvailable(true);
		}).catch((res) =>{
			setNameAvailable(false);
		})
	}


	const checkEmailAvailability = () => {
		if(!validEmail) return true;
		axios.post('http://localhost:3000/user/emailAvailable', {
			email:email
		}).then((res) =>{
			setEmailAvailable(true);
		}).catch((res) =>{
			setEmailAvailable(false);
		})
	}



  useEffect(() => {
    setValidName(USER_REGEX.test(user));
	checkNameAvailability();
  }, [user]);

  useEffect(() => {
    setValidPwd1(PWD_REGEX1.test(pwd));
    setValidPwd2(PWD_REGEX2.test(pwd));
    setValidPwd3(PWD_REGEX3.test(pwd));
    setValidPwd4(PWD_REGEX4.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setValidEmail(EM_REGEX.test(email));
	checkEmailAvailability();
  }, [email]);



  return (
    <div class="RegisterMain">
		<div className="LoginBigLogo"/>
		<div className="regesterCard">
		<div className="flexRow"> <h1 className="signUpH1">Sign Up</h1> </div>
		
		<div className="rowCenter width800px">
			<div className=" width400px flexRow">
				<div className="flexColumn">
					<TextField 
						label="Full Name" 
						margin="none"
						variant="outlined"
						fullWidth
						value={fullName}
						required
						onChange={(e) => setFullName(e.target.value)}
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
						// size="small"
						{...(!validEmail && {error:true, helperText:"Invalid Email"})}
						{...(!EmailAvailable && {error:true, helperText:"Email already used"})}
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
						// size="small"
						{...(!validPwd1 && {error:true, helperText:"6 - 24 character (a-z, A-Z, 0-9, _)"})}
						{...(validPwd1 && !validPwd2 && {error:true, helperText:"at least one lower case"})}
						{...(validPwd1 && validPwd2 && !validPwd3 && {error:true, helperText:"at least one upper case"})}
						{...(validPwd1 && validPwd2 && validPwd3 && !validPwd4 && {error:true, helperText:"at least one number"})}
						InputProps={{
							endAdornment:
								showPass? <InputAdornment position='end' onClick = {() => setShowPass(false)}><VisibilityIcon/></InputAdornment>
								: <InputAdornment position='end' onClick = {() => setShowPass(true)}><VisibilityOffIcon/></InputAdornment>
							}}
					/>
				</div>
			</div>
	
			<div className=" width400px flexRow">
				<div className="flexColumn ">
					<TextField 
						label="User Name" 
						// size="small"
						margin="none"
						variant="outlined"
						fullWidth
						value={user}
						required
						color="success"
						onChange={(e) => setUser(e.target.value)}
						{...(!validName && {error:true, helperText:"5 to 24 characters."})}
						{...(!NameAvailable && {error:true, helperText:"Username taken"})}

						/>
					<TextField 
						label="Registration Number"
						// size="small"
						type="number"
						margin="none"
						variant="outlined"
						fullWidth
						value={regNo}
						required
						onChange={(e) => setRegNo(e.target.value)}
						// {...(!validEmail && {error:true, helperText:"Invalid Email"})}
					/>
				
				
					<TextField 
						label="Confirm Password"
						// size="small"
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
			
				</div>
			</div>
	  	</div>
		<div className="flexRow pad150px">
			<Button  
				onClick = {() => prop.abort()}
			><DisabledByDefaultIcon/>Abort</Button>
			<Button  
				disabled={!validName || !validPwd1 || !validPwd2 || !validPwd3 || !validPwd4 || !validMatch || !NameAvailable ? true : false}
				onClick = {() => handleSubmit()}
			><TaskAltIcon/>  Sign Up</Button>
		</div>
		<div className="signUpBottom">
			<span>
				Already Have an account?{"  "}
				<a className="isLink" onClick={() => prop.setState("login")()}>Sign In</a>
			</span>
			<br/>
			<span>
				By continuing, you agree to our{" "}
				<a href="/terms">Terms of Service</a> and{" "}
				<a href="/privacy">Privacy Policy</a>.
			</span>
		</div>
		</div>
    </div>
  );
};
export default Register;
