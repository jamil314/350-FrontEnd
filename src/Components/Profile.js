import { Grid } from "@material-ui/core";
import {React, useState, useEffect} from "react";
import '../CSS/Profile.css'
import TopBar from "./TopBar";

import {Button, TextField, InputAdornment} from '@mui/material';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;
const EM_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


const Profile = () => {

    const [reg, setReg] = useState("2018831035");    
    const [session, setSession] = useState("2018-19");    
    const [lastSeen, setLastSeen] = useState("8h ago");    
    const [regestered, setRegestered] = useState("3y ago");    
    const [owner, setOwner] = useState(true);    
    const [editProfileMode, setEditProfileMode] = useState(false);    


    const [user, setUser] = useState("Jamil314");
    const [validName, setValidName] = useState(false);
  
    const [email, setEmail] = useState("jamil31415926@gmail.com");
    const [validEmail, setValidEmail] = useState(false);

    const [phone, setPhone] = useState("01786623305");
    const [validPhone, setValidPhone] = useState(true);
  
    const [pwdCur, setPwdCur] = useState("");
    const [validPwdCur, setValidPwdCur] = useState(false);

    const [pwdNew, setPwdNew] = useState("");
    const [validPwdNew, setValidPwdNew] = useState(false);
  
    const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false);
  
    const [showPass, setShowPass] = useState(true);
  
  
  
    useEffect(() => {
      setValidName(USER_REGEX.test(user));
    }, [user]);
  
    useEffect(() => {
      setValidPwdNew(PWD_REGEX.test(pwdNew));
      setValidMatch(pwdNew === matchPwd);
    }, [pwdNew, matchPwd]);

    useEffect(() => {
        setValidPwdCur(true);
      }, [pwdCur]);
  
    useEffect(() => {
      setValidEmail(EM_REGEX.test(email));
    }, [email]);

    useEffect(() => {
        setPwdCur("");
        setPwdNew("");
        setMatchPwd("");
    }, [editProfileMode]);


    return (
        <div className="Profile">
            <TopBar/>
            <Grid container spacing={0}>
                <Grid xs={6}>
                    <div className="PersonalInfo">
                        <div className="flexRow">
                            <div className="flexRow">
                                <h3>Personal Info</h3>
                                {owner?<Button onClick={() => setEditProfileMode(true)}><EditIcon/></Button>:null}
                            </div>
                        </div>
                        <div className="DisplayPic"/>
                        Username: {user}<br/>
                        Email: {email}<br/>
                        Phone: {phone}<br/>
                        Regstration No: {reg}<br/>
                        Session: {session}<br/>
                        Last Seen: {lastSeen}<br/>
                        Regestered: {regestered}
                    </div>
                </Grid>
                <Grid xs={6}>
                    <div className="History">
                        
                        <div className="flexRow">
                            <div className="SolveHistory"><h3>Solve History</h3></div>
                            <div className="SetHistory"><h3>Set History</h3></div>
                        </div>
                    </div>
                </Grid>
            </Grid>
            {
                editProfileMode?
                    <div className="PopUpBg">
                        <Button className="ClosePopUp" onClick={() => {setEditProfileMode(false)}}><CloseIcon/></Button>
                        <div className="center">
                            <div className="EditProfilePopUp flexColumn">
                                <div className="flexRow">
                                    <div className="flexRow bigText">
                                        <EditIcon/>
                                        Edit Profile
                                    </div>
                                </div>
                                <div className="flexRow EditProfileFixHi">
                                    <div className="flexColumn">
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
                                            label="Session"
                                            margin="none"
                                            variant="outlined"
                                            fullWidth
                                            value={session}
                                            onChange={(e) => setSession(e.target.value)}
                                        />
                                        <TextField 
                                            label="New Password"
                                            margin="none"
                                            variant="outlined"
                                            fullWidth
                                            value={pwdNew}
                                            type = {showPass?"text":"password"}
                                            required
                                            color="success"
                                            onChange={(e) => setPwdNew(e.target.value)}
                                            {...(!validPwdNew && {error:true, helperText:"8 - 24 character"})}
                                            InputProps={{
                                                endAdornment:
                                                    showPass? <InputAdornment position='end' onClick = {() => setShowPass(false)}><VisibilityIcon/></InputAdornment>
                                                    : <InputAdornment position='end' onClick = {() => setShowPass(true)}><VisibilityOffIcon/></InputAdornment>
                                            }}
                                        />
                                        
                                        <Button onClick={() => {setEditProfileMode(false)}}><CloseIcon/>Abort</Button>

                                    </div>
                                    <div className="flexColumn">
                                        <TextField 
                                            label="Registration Number" 
                                            margin="none"
                                            variant="outlined"
                                            fullWidth
                                            value={reg}
                                            required
                                            onChange={(e) => setReg(e.target.value)}
                                        />
                                        <TextField 
                                            label="Phone Number"
                                            margin="none"
                                            variant="outlined"
                                            fullWidth
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            {...(!validPhone && {error:true, helperText:"Provide Valid Phone no"})}
                                        />
                                        <TextField 
                                            label="Current Password"
                                            margin="none"
                                            variant="outlined"
                                            fullWidth
                                            value={pwdCur}
                                            type = {showPass?"text":"password"}
                                            required
                                            color="success"
                                            onChange={(e) => setPwdCur(e.target.value)}
                                            {...(!validPwdCur && {error:true, helperText:"Incorrect Password"})}
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
                                            disabled={!validName || !validPwdNew || !validPwdCur || !validMatch ? true : false}
                                            onClick = {() => {alert("Updated")}}
                                        ><TaskAltIcon/>Confirm</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                :null
            }

        </div>
  );
}

export default Profile;