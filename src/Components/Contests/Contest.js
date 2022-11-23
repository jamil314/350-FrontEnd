import {React, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import '../../CSS/Contest.css'
import axios from 'axios';

import TopBar from "../TopBar";
import Standing from "./Standing"
import Problemset from "./Problemset"
import Status from "./Status"
import Clarification from "./Clarification"
import ProblemListSmall from "./ProblemListSmall";

const Contest = () => {
    
    const {id} = useParams();
    const [currentProblem, setCurrentProblem] = useState(0);
    const [mainContent, setmainContent] = useState("Standing");
    const [problems, setProblems] = useState([]);
    const [contest, setContest] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const [verdicts, setVerdicts] = useState({"accepted" : new Map(), "rejected" : new Map()});
    const [standing, setStanding] = useState([]);
    const [statusLine1, setStatusLine1] = useState("");
    const [statusLine2, setStatusLine2] = useState("");
    const [statusLine3, setStatusLine3] = useState("");

    const gotoProblem = (pid) => {
        setCurrentProblem(pid)
        loadProblems();
    }

    const getUniqueValues = (array) => (
        array.reduce((acc, currentValue) => (
            acc.includes(currentValue.userId) ? acc : [...acc, currentValue.userId]
        ), [])
    );

    const objectComparisonCallback = (arrayItemA, arrayItemB) => {
        if (arrayItemA.solved > arrayItemB.solved) {
          return -1
        }
      
        if (arrayItemA.solved < arrayItemB.solved) {
            return 1
        }

        if (arrayItemA.penalty < arrayItemB.penalty) {
            return -1
        }
    
        if (arrayItemA.penalty > arrayItemB.penalty) {
            return 1
        }
      
        return 0
      }
    


    const getUniqueSub = (array) => (
        array.reduce((acc, currentValue) => (
            acc.includes(currentValue.problemId) ? acc : [...acc, currentValue.problemId]
        ), [])
    );

    const loadStanding = () =>{
        setmainContent("Standing");
    }
    const loadDashboard = () =>{
        setmainContent("Dashboard");
    }
    const loadProblems = () =>{
        setmainContent("Problems");
    }
    const loadStatus = () =>{
        setmainContent("Status");
    }
    const loadClarification = () =>{
        setmainContent("Clarification");
    }

    const covertTo = (milis) => {
        let sec = Math.floor(milis/1000);
        let min = Math.floor(sec/60);
        let hr = Math.floor(min/60);

        sec -= min * 60;
        min -= hr * 60;
        return hr+" h : "+min+" m : "+sec+" s";

    }

    const calculateTime = () => {
        let left = Date.parse(contest.startTime);
        let mid = Date.now();
        let right = Date.parse(contest.endTime);
        if(mid < left){
            setStatusLine1("Yet to start: ");
            setStatusLine2(covertTo(left - mid));
        } else if(mid < right){
            setStatusLine1("Running");
            setStatusLine2("Elaplsed: "+covertTo(mid - left));
            setStatusLine3("Remaining: "+covertTo(right - mid));
        } else {
            setStatusLine1("Contest Ended")
        }
        console.log(left, mid - left, mid,  mid - right, right);
    }

    const fetchSubmissions = async () => {
        // console.log("sibmissionnnnnnnnnnnnnnnnnnnnn");
        // console.log(problems);
        await axios.post('http://localhost:3000/submission/byContest/'+id,{
            contestId: id,
            'contestAuthorization': localStorage.getItem('contestToken'),
        }, {
            headers:{
                'contestAuthorization': localStorage.getItem('contestToken'),
                'authorization': localStorage.getItem('token')
            }
        }).then(res => {
            console.log(res.data);
            // console.log(res.data[0].createdAt, contest.startTime);
            // console.log(Date.parse(res.data[0].createdAt), Date.parse(contest.startTime));
            // console.log(Date.parse(res.data[0].createdAt) - Date.parse(contest.startTime));
            
            const validSubs = res.data.filter(
                sub => Date.parse(sub.createdAt) >= Date.parse(contest.startTime)
                 && Date.parse(sub.createdAt) <= Date.parse(contest.endTime)
            )
            console.log(validSubs);
            
            setSubmissions(validSubs);
            validSubs.map((sub) => {
                let tVerdicts = verdicts;
                let pid = sub.problemId;
                if(sub.verdict == "Accepted") {
                    tVerdicts.accepted.set(pid, (tVerdicts.accepted.get(pid) || 0) + 1);
                }
                else {
                    tVerdicts.rejected.set(pid, (tVerdicts.rejected.get(pid) || 0) + 1);
                }
                setVerdicts(tVerdicts);
            })

            const uniqueUsers = getUniqueValues(validSubs);
            // console.log(uniqueUsers);
            let tStanding = [];
            uniqueUsers.map((uid) => {
                const subByUid = validSubs.filter(
                    sub => sub.userId == uid
                )
                let totalSub = subByUid.length;

                    // console.log(subByUid);

                const onlyAc = subByUid.filter(
                    sub => sub.verdict == "Accepted"
                )


                const onlyCe = subByUid.filter(
                    sub => sub.verdict == "Compilation Error"
                )

                    // console.log(onlyAc);

                // const uniqueAc = getUniqueSub(onlyAc);

                //     console.log(uniqueAc);

                let acCount = 0;
                
                
                let mp = new Map();
                let penalty = 0;

                onlyAc.map((sub) => {
                    console.log(sub);
                    if(mp.has(sub.problemId)){
                        penalty += 20;
                    } else {
                        acCount++ ;
                        mp.set(sub.problemId, 1);
                        console.log(sub.createdAt, Date.parse(sub.createdAt));
                        console.log(contest.startTime, Date.parse(contest.startTime));
                        let iPenalty = Date.parse(sub.createdAt) - Date.parse(contest.startTime);
                        penalty += iPenalty / 60000;
                    }
                })

                penalty += 20* (totalSub - acCount - onlyCe.length);


                tStanding = [...tStanding, {"userId":uid, "userName":subByUid[0].userName, 
                                            "solved":acCount, "penalty":Math.floor(penalty)}]
            })
            tStanding.sort(objectComparisonCallback)
            // console.log(tStanding);

            setStanding(tStanding);



        }).catch(res => {
            console.log(res);
        });

    }

    const fetchProblems = async () => {
        if(contest.length != 0) {
            calculateTime();
            // console.log("problemmmmmmmmmmmmmmmmmmm");
            // console.log(contest);
            await axios.post('http://localhost:3000/contest/showProblems/'+id,{
                contestId: id,
                'contestAuthorization': localStorage.getItem('contestToken'),

            }, {
                headers:{
                    'contestAuthorization': localStorage.getItem('contestToken'),
                    'authorization': localStorage.getItem('token')
                }
            }).then(res => {
                // console.log("Problems: ", res.data);
                setCurrentProblem(res.data[0].problemID);
                setProblems(res.data);
            }).catch(res => {
                console.log(res);
           });
        }
    }

    const fetchContest = async () => {
        // console.log("contestttttttttttttttt");
        await axios.get('http://localhost:3000/contest/byId/'+id
        ).then(res => {
            console.log(res.data);
            setContest(res.data);
        }).catch(res => {
            console.log(res);
        });
    }

    const checkContestAccess = async () => {
        // console.log(localStorage.getItem('contest'), localStorage.getItem('contestToken'));
        axios.post('http://localhost:3000/contest/joincontest', {
            contestId: id,
            'contestAuthorization': localStorage.getItem('contestToken')
		},{
            headers:{
                'contestAuthorization': localStorage.getItem('contestToken'),
                'authorization': localStorage.getItem('token'),
            }
        }).then((res) =>{
            fetchContest();
		}).catch((res) =>{
            console.log(res);
            window.location.href = "/joinContest/"+id;
		})
    }
    

    useEffect(() => {
        fetchSubmissions();
    }, [problems]);


    useEffect(() => {
        fetchProblems();
    }, [contest]);

    useEffect(() => {
        checkContestAccess();
    }, []);

	return (
        <div className="Contest">
            <TopBar></TopBar>
            <div className="flexRow">
                <div className="Steps ">
                        <div className={mainContent=="Dashboard"?"ActiveStepContainer":"StepContainer"}>
                            <text onClick={loadDashboard}>Dashboard</text>
                        </div>
                        <div className={mainContent=="Problems"?"ActiveStepContainer":"StepContainer"}>
                            <text onClick={loadProblems}>Problems</text>
                        </div>
                        <div className={mainContent=="Standing"?"ActiveStepContainer":"StepContainer"}>
                            <text onClick={loadStanding}>Standings</text>
                        </div>
                        <div className={mainContent=="Status"?"ActiveStepContainer":"StepContainer"}>
                            <text onClick={loadStatus}>Status</text>
                        </div>
                        <div className={mainContent=="Clarification"?"ActiveStepContainer":"StepContainer"}>
                            <text onClick={loadClarification}>Clarification</text>
                        </div>
                </div>
                <div className="gapBig" />
                    <div className="TimeContainer">
                        {statusLine1} <br/>
                        {statusLine2} <br/>
                        {statusLine3}
                    </div>
            </div>
            {
                mainContent === "Dashboard" ? <Problemset problems = {problems} verdicts = {verdicts} gotoProblem = {gotoProblem}/> :
                mainContent === "Problems" ? <ProblemListSmall contest = {id} setCurrentProblem = {setCurrentProblem} pid = {currentProblem} problems = {problems}/> :
                mainContent === "Standing" ? <Standing contest = {id} standing = {standing}/> :
                mainContent === "Status" ? <Status contest = {id} submissions = {submissions} gotoProblem = {gotoProblem}/> :
                <Clarification contest = {id}/>
            }
        </div>
  );
}

export default Contest;