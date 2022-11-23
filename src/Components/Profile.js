import { Grid } from "@material-ui/core";
import {React, useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import '../CSS/Profile.css'
import TopBar from "./TopBar";
import axios from 'axios';

import {Button, TextField, InputAdornment} from '@mui/material';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

const USER_REGEX = /^[A-z][A-z0-9-_]{5,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,24}$/;
const EM_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


const Profile = () => {

    const {id} = useParams();
    // let uid = id!==undefined? id : localStorage.getItem("userID");

    const [reg, setReg] = useState("2018831035");    
    const [session, setSession] = useState("2018-19");    
    const [lastSeen, setLastSeen] = useState("8h ago");    
    const [regestered, setRegestered] = useState("3y ago");    
    const [owner, setOwner] = useState(false);
    const [editProfileMode, setEditProfileMode] = useState(false);    
    const [FullName, setFullName] = useState("Jamil314");
    const [historyMode, setHistoryMode] = useState("solve");
    const [solved, setSolved] = useState([]);
    const [set, setSet] = useState("solve");


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
  

    const fetchProfileInfo = () => {
		axios.get('http://localhost:3000/user/byID/'+id, {
		}).then((res) =>{
            // console.log(res.data);
            setFullName(res.data.name);
            setUser(res.data.username);
            setEmail(res.data.email);
            setPhone(res.data.phoneNumber);
            setReg(res.data.regNo);
            setReg(res.data.regNo);
            setSession(res.data.session);
		})
    }
  
    const fetchSolved = () => {
		axios.get('http://localhost:3000/submission/byUser/'+id, {
		}).then((res) =>{
            // console.log(res.data);
            let arr = [];
            let mp = new Map();
            res.data.map((sub) => {
                if(! mp.has(sub.problemId)){
                    mp.set(sub.problemId, 1);
                    arr = [...arr, {"pid":sub.problemId, "title":sub.problemTitle}]
                }
            })
            setSolved(arr);
            console.log(arr);
		});

    }

    const fetchSet = () => {
		axios.get('http://localhost:3000/problem/byUser/'+id, {
		}).then((res) =>{
            setSet(res.data);
            console.log(res.data);
		})

    }

    const abort = () => {
        fetchProfileInfo();
        setEditProfileMode(false);
    }

    const updateProfile = () => {
        axios.patch('http://localhost:3000/user/', {
            name: FullName,
            email: email,
            username: user,
            phoneNumber: phone,
            regNo: reg,
            session: session,
            newPass: pwdNew
        },{
            headers: { 'authorization': localStorage.getItem('token') },
        }).then((res) =>{
            alert('Profile updated Successfully')
            setEditProfileMode(false);

        }).catch((res) =>{
            alert("Failed")
        })
    }

    const handleSubmit = () => {
        const id = localStorage.getItem('userID');
        if(pwdNew != ""){
            axios.patch('http://localhost:3000/user/changePass', {
                username:user,
                password:pwdCur,
                newPass: pwdNew
            }).then((res) =>{
                console.log(res);
                updateProfile();
            }).catch((res) => {
                console.log(res);
                alert("Incorrect Password")
            })
        } else updateProfile();
        

    }
  
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

    useEffect(() => {
        fetchProfileInfo();
        fetchSolved();
        fetchSet();
        setOwner ( (localStorage.getItem('userID') == id));
    }, []);


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
                        Name: {FullName}<br/>
                        Username: {user}<br/>
                        Email: {email}<br/>
                        Phone: {phone}<br/>
                        Regstration No: {reg}<br/>
                        Session: {session}<br/>
                        {/* Last Seen: {lastSeen}<br/>
                        Regestered: {regestered} */}
                    </div>
                </Grid>
                <Grid xs={6}>
                    <div className="History">
                        
                        <div className="flexRow">
                            <div className={ historyMode == "solve" ? "Active" : "Inactive"}><h3 onClick={() => setHistoryMode("solve")}>Solve History</h3></div>
                            <div className={ historyMode == "solve" ? "Inactive" : "Active"}><h3 onClick={() => setHistoryMode("set")}>Set History</h3></div>
                        </div>
                        
                        {
                            historyMode == "solve" ?
                                <ul>
                                    {solved.map((e) => {return <li className="clickable" onClick={() => window.location.href='/problem/'+e.pid}>{e.title}</li> })}
                                </ul>
                            :
                                <ul>
                                    {set.map((e) => {return <li className="clickable" onClick={() => window.location.href='/problem/'+e.problemID}>{e.title}</li> })}
                                </ul>
                        }


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
                                            label="Full Name" 
                                            margin="none"
                                            variant="outlined"
                                            fullWidth
                                            value={FullName}
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
                                            color="success"
                                            onChange={(e) => setPwdNew(e.target.value)}
                                            {...(!pwdNew == "" && !validPwdNew && {error:true, helperText:"6 - 24 character (a-z, A-Z, 0-9, _)"})}
                                            InputProps={{
                                                endAdornment:
                                                    showPass? <InputAdornment className="point" position='end' onClick = {() => setShowPass(false)}><VisibilityIcon/></InputAdornment>
                                                    : <InputAdornment className="point" position='end' onClick = {() => setShowPass(true)}><VisibilityOffIcon/></InputAdornment>
                                            }}
                                        />
                                        
                                        <Button onClick={() => {abort()}}><CloseIcon/>Abort</Button>

                                    </div>
                                    <div className="flexColumn">
                                        <TextField 
                                            label="Registration Number" 
                                            type="number"
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
                                            label="Old Password"
                                            margin="none"
                                            variant="outlined"
                                            fullWidth
                                            value={pwdCur}
                                            type = {showPass?"text":"password"}
                                            required
                                            onChange={(e) => setPwdCur(e.target.value)}
                                            {...(!pwdNew == "" && {helperText:"Required for changing password"})}
                                            InputProps={{
                                                endAdornment:
                                                    showPass? <InputAdornment className="point" position='end' onClick = {() => setShowPass(false)}><VisibilityIcon/></InputAdornment>
                                                    : <InputAdornment className="point" position='end' onClick = {() => setShowPass(true)}><VisibilityOffIcon/></InputAdornment>
                                            }}

                                        />
                                        
                                        <TextField 
                                            label="Confirm Password"
                                            margin="none"
                                            variant="outlined"
                                            fullWidth
                                            value={matchPwd}
                                            type = {showPass?"text":"password"}
                                            color="success"
                                            onChange={(e) => setMatchPwd(e.target.value)}
                                            {...(!validMatch && {error:true, helperText:"Insert First Password Again"})}
                                            InputProps={{
                                                endAdornment:
                                                    showPass? <InputAdornment className="point" position='end' onClick = {() => setShowPass(false)}><VisibilityIcon/></InputAdornment>
                                                    : <InputAdornment className="point" position='end' onClick = {() => setShowPass(true)}><VisibilityOffIcon/></InputAdornment>
                                            }}
                                        />

                                        <Button  
                                            disabled={ pwdNew != "" && (!validPwdNew || !validMatch) ? true : false}
                                            onClick = {() => {handleSubmit()}}
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