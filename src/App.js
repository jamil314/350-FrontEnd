import "./CSS/App.css";
import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Components/Home";
import NotFound from "./Components/NotFound";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Contest from "./Components/Contests/Contest"
import Contests from "./Components/Contests/Contests"
import Problem from "./Components/Problems/Problem"
import Problems from "./Components/Problems/Problems"
import JudgeProfile from "./Components/Judge/JudgeProfile";
import SetProblem from "./Components/Problems/SetProblem";
import NewContest from "./Components/Contests/NewContest";
import Profile from "./Components/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contests" element={<Contests />} />
        <Route path="/contest/:id" element={<Contest />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/problem/:id" element={<Problem />} />
        <Route path="/judge/profile" element={<JudgeProfile />} />
        <Route path="/newproblem" element={<SetProblem />} />
        <Route path="/newcontest" element={<NewContest />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="*" element={<NotFound code={404} msg={"Page Not Found"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
