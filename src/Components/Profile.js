import { Grid } from "@material-ui/core";
import {React, useState} from "react";
import '../CSS/Profile.css'
import TopBar from "./TopBar";

import {Button} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';


const Profile = () => {

    const [userName, setUserName] = useState("Jamil314");    
    const [email, setEmail] = useState("jamil31415926@gmail.com");    
    const [lastSeen, setLastSeen] = useState("8h ago");    
    const [regestered, setRegestered] = useState("3y ago");    
    const [owner, setOwner] = useState(true);    
    const [editProfileMode, setEditProfileMode] = useState(false);    


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
                        Username: {userName}<br/>
                        Email: {email}<br/>
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
                        <div className="EditProfilePopUp">
                            Editing Profile
                        </div>
                    </div>
                :null
            }

        </div>
  );
}

export default Profile;