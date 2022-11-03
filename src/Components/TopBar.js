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
                    <li className="MainMenu">
                        <ul onClick={() => window.location.href = '/home'}>Sust Swe Oj</ul>
                        <ul onClick={() => window.location.href = '/contests'}>Contests</ul>
                        <ul onClick={() => window.location.href = '/problems'}>Problems</ul>
                        <ul onClick={() => window.location.href = '/groups'}>Groups</ul>
                        <ul onClick={() => window.location.href = '/users'}>Users</ul>
                        <ul onClick={() => window.location.href = '/submissions'}>Submissions</ul>
                    </li>
                </div>
            </div>
            <button className="ProfileButton" onClick={toggleProfileMenu}/>
            
            {
                showProfileMenu?<ProfileMenu/>:null
            }


        </div>
  );
}

export default TopBar;