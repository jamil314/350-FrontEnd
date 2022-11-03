import React, { useState } from "react";
import "../CSS/ProfileMenu.css";
const ProfileMenu = () => {
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

return (
	<div className="ProfileMenu">
		{isLoggedIn ? (
		<li className="ProfileList">
			<ul onClick={gotoProfile}>Profile</ul>
			<ul onClick={gotoChats}>Chats</ul>
			<ul onClick={gotoInvites}>Invites</ul>
			<ul onClick={openJudgePortal}>Judge Portal</ul>
			<ul onClick={logOut}>Log Out</ul>
		</li>
		) : (
		<li className="ProfileList">
			<ul onClick={() => (window.location.href = "/login")}>Log In</ul>
			<ul onClick={() => (window.location.href = "/register")}>Sign Up</ul>
		</li>
		)}
	</div>
);
};

export default ProfileMenu;
