import React, { useState, useEffect } from "react";
import '../../CSS/Contest.css'
import TopBar from "../TopBar";
import axios from 'axios';


import {Button, TextField, InputAdornment} from '@mui/material'
import AddTaskIcon from '@mui/icons-material/AddTask';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
    KeyboardDateTimePicker
  } from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';


const NewContest = () => {
    const [title, settitle] = useState()
    const [password, setPassword] = useState()
    const [des, setDes] = useState()
    const [problemList, setProblemList] = useState([{ id: "", title: "", alias: ""}]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

	async function fetchTitle (index){
        const list = [...problemList];
        await axios.get('http://localhost:3000/problem/byId/'+list[index]['id'])
            .then (res => {
                list[index]['title'] = res.data.title;
                list[index]['alias'] = res.data.title;
                setProblemList(list);
            })
            .catch(e => {
                list[index]['title'] = 'No Such Problem';
                setProblemList(list);
            });
	}

    const handleStartDateChange = (date) => {
        console.log(date);
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        console.log(date);
        setEndDate(date);
    };



    const handleProblemAdd = () => {
        setProblemList([...problemList, { id: "", title: "Problem "+(problemList.length+1), alias: ""}]);
        console.log(problemList);
    };

    const handleProblemIdChange = (e, index) => {
        const list = [...problemList];
        list[index]['id'] = e.target.value;
        setProblemList(list);

        fetchTitle(index);
    };

    const handleProblemAliasChange = (e, index) => {
        const list = [...problemList];
        list[index]['alias'] = e.target.value;
        setProblemList(list);
    };

    const handleProblemRemove = (index) => {
        const list = [...problemList];
        list.splice(index, 1);
        setProblemList(list);
    };

    const submit = () => {
        axios.post('http://localhost:3000/contest/', {
            contestName:title,
            contestDescription: des,
            contestPassword: password,
            startTime: startDate,
            endTime: endDate,
            problemList         
        },{
            headers: { 'authorization': localStorage.getItem('token') },
        }).then((res) =>{
            alert('Successfully created contest');
            window.location.href = "/contests";

        }).catch((res) =>{
            alert("Contest Creation failed")
        })
    }



    return (
        <div className="NewContest">
            <TopBar/>
            <div className="NewContestContainer">
                <div className="flexColumn NewContestInfo">
                    <TextField 
                        label="Contest Title" 
                        margin="normal" 
                        variant="outlined" 
                        onChange={e => settitle(e.target.value)}
                        value = {title}
                    />
                    <TextField 
                        label="Password" 
                        margin="normal" 
                        variant="outlined" 
                        onChange={e => setPassword(e.target.value)}
                        value = {password}
                    />
                    
  
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDateTimePicker
                            id="time-picker"
                            label="Starts at"
                            format="dd//MM/yyyy - hh:mm a"
                            value={startDate}
                            onChange={handleStartDateChange}
                        />

                        <div className="gap24" />

                        <KeyboardDateTimePicker
                            id="time-picker"
                            label="Ends at"
                            format="dd//MM/yyyy - hh:mm a"
                            value={endDate}
                            onChange={handleEndDateChange}
                        />
                    </MuiPickersUtilsProvider>


                </div>

                <div className="flexColumn">
                    <div className="NewContestDes">
                        <TextField 
                            label="Description" 
                            margin="normal" 
                            variant="outlined" 
                            fullWidth
                            maxRows={3}
                            multiline
                            onChange={e => setDes(e.target.value)}
                            value = {des}
                        />
                    </div>
                    <div className="flexColumn NewContestMain">
                        <div className="flexRow">
                            <TextField
                                hiddenLabel
                                variant="filled"
                                size="small"
                                value="Problem Id"
                                disabled
                            />

                            <div className="gap24" />

                            <TextField
                                hiddenLabel
                                variant="filled"
                                size="small"
                                value="Problem Title"
                                disabled
                            />

                            <div className="gap24" />
                            
                            <TextField
                                hiddenLabel
                                variant="filled"
                                size="small"
                                value="Alias"
                                disabled
                            />

                            <div className="gap24" />
                            <div className="gap24" />
                            <div className="gap24" />
                            <div className="gap24" />
                            <div className="gap8" />

                        </div>
                        <div className="flexRow pad4">
                            
                        </div>
                        <div className="NewContestScroll">
                            {problemList.map((singleProblem, index) => (
                                <div key={index} className="flexRow pad4">
                                    {problemList.length - 1 === index ? (
                                        problemList.length === 20? 
                                        <Button variant="outlined" onClick={submit}><LibraryAddCheckIcon/>Submit</Button>
                                            :
                                        <div className="flexRow">
                                            <Button variant="outlined" onClick={handleProblemAdd}><AddTaskIcon/>Add Problem</Button>
                                            <div className="gap24" />
                                            <Button variant="outlined" onClick={submit}><LibraryAddCheckIcon/>Submit</Button>
                                        </div>
                                    ) : (
                                        <div className="flexRow">
                                            <TextField
                                                hiddenLabel
                                                name="id"
                                                defaultValue="Small"
                                                variant="filled"
                                                id="id"
                                                size="small"
                                                value={singleProblem.id}
                                                onChange={(e) => handleProblemIdChange(e, index)}
                                            />

                                            <div className="gap24" />

                                            <TextField
                                                hiddenLabel
                                                disabled
                                                name="title"
                                                defaultValue="Small"
                                                variant="filled"
                                                id="title"
                                                size="small"
                                                value={singleProblem.title}
                                            />

                                            <div className="gap24" />

                                            <TextField
                                                hiddenLabel
                                                name="alias"
                                                defaultValue="Small"
                                                variant="filled"
                                                id="alias"
                                                size="small"
                                                value={singleProblem.alias}
                                                onChange={(e) => handleProblemAliasChange(e, index)}
                                            />

                                            <div className="gap24" />

                                            <Button variant="outlined" onClick={() => handleProblemRemove(index)}><DeleteSweepIcon/></Button>
                                        </div>
                                    )}

                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
            {/* <Button variant="contained" onClick={() => setStep(2)} className="NewProblemButton1">Next</Button> */}
        </div>
  );
}

export default NewContest;