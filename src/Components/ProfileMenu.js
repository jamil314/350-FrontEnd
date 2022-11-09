import React, { useState } from "react";
import "../CSS/ProfileMenu.css";
import Login from "./Login";
import Register from "./Register";


const ProfileMenu = (prop) => {

	const [state, setState] = useState("");

	const [isLoggedIn, setLoggedIn] = useState(true);

	const gotoProfile = () => {
		window.location.href = "/profile";
	};

	const gotoChats = () => {
		alert("Visiting Chats");
	};

	const gotoInvites = () => {
		alert("Visiting Invites");
	};
	const openJudgePortal = () => {
		window.location.href = "/judge/profile";
	};

	const logOut = () => {
		setLoggedIn(false);
	};

	const abort = () => {
		setState("");
		prop.toggle();
	}

	return (
		<div className="ProfileMenu">
			{state == "" ?
			<div>
				{isLoggedIn ? (
				<div className="ProfileList">
					<a onClick={gotoProfile}>Profile</a>
					<a onClick={gotoChats}>Chats</a>
					<a onClick={gotoInvites}>Invites</a>
					<a onClick={openJudgePortal}>Judge Portal</a>
					<a onClick={logOut}>Log Out</a>
				</div>
				) : (
				<div className="ProfileList">
					<a onClick={() => setState("login")}>Log In</a>
					<a onClick={() => setState("signup")}>Sign Up</a>
				</div>
				)}
			</div> : null }
			
			{state == "login"?
				<div className="PopUpBg center">
					<Login abort = {abort} setState = {setState}/>
				</div>
			:null}

			{state == "signup"?
				<div className="PopUpBg center">
					<Register abort = {abort} setState = {setState}/>
				</div>
			:null}


		</div>
	);
};

export default ProfileMenu;
