import React, {useState} from "react";
import '../CSS/TopBar.css'
import ProfileMenu from "./ProfileMenu";
const TopBar = () => {

    const [showProfileMenu, setshowProfileMenu] = useState(false);

    const toggleProfileMenu = () =>{
        setshowProfileMenu(showProfileMenu?false:true);
    }

	return (
        <div className="TopBar">
            <div className="TopBarLeft">
                <div className="Logo" onClick={() => window.location.href = '/home'}/>
                <div className="MainMenuContainer">
                    <div className="MainMenu">
                        <a onClick={() => window.location.href = '/home'}>Sust Swe Oj</a>
                        <a onClick={() => window.location.href = '/contests'}>Contests</a>
                        <a onClick={() => window.location.href = '/problems'}>Problems</a>
                        {/* <a onClick={() => window.location.href = '/groups'}>Groups</a> */}
                        {/* <a onClick={() => window.location.href = '/users'}>Users</a> */}
                        <a onClick={() => window.location.href = '/submissions'}>Submissions</a>
                    </div>
                </div>
            </div>
            <button className="ProfileButton" onClick={toggleProfileMenu}/>
            
            {
                showProfileMenu?<ProfileMenu toggle = {toggleProfileMenu}/>:null
            }


        </div>
  );
}

export default TopBar;