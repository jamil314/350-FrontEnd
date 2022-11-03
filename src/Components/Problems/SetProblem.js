import React, { useState, useEffect, useRef, useMemo  } from "react";
import JoditEditor from 'jodit-react';
import axios from 'axios';
import {Button, TextField, InputAdornment} from '@mui/material'
import Grid from "@material-ui/core/Grid";

import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import AddTaskIcon from '@mui/icons-material/AddTask';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


import '../../CSS/Problem.css'
import TopBar from '../TopBar'
const SetProblem = () => {
	const editor = useRef(null);
	const [content, setContent] = useState('');

    const [step, setStep] = useState(1)
    const [title, setTitle] = useState("")
    const [timeLimit, settimeLimit] = useState("")
    const [memoryLimit, setmemoryLimit] = useState("")
    const [statement, setstatement] = useState("")
    const [inputDescription, setinputDescription] = useState("")
    const [outputDescription, setoutputDescription] = useState("")
    const [tagList, setTagList] = useState([{ tag: "" }]);
    const [sampleTestList, setSampleTestList] = useState([{input: "" , output: ""}]);
    const [mainTestList, setmainTestList] = useState([{input: "" , output: ""}]);

    const handleTagChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...tagList];
        list[index][name] = value;
        setTagList(list);
    };

    const handleTagRemove = (index) => {
        alert("removing", index)
        const list = [...tagList];
        list.splice(index, 1);
        setTagList(list);
    };
    
    
    const handleTagAdd = () => {
        setTagList([...tagList, { tag: "" }]);
    };



    const handleSampleInputChange = (e, index) => {
        const file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            const list = [...sampleTestList];
            list[index]["input"] = e.target.result;
            setSampleTestList(list);
        }
    };

    const handleSampleOutputChange = (e, index) => {
        const file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            const list = [...sampleTestList];
            list[index]["output"] = e.target.result;
            setSampleTestList(list);
        }
    };

    const handleSampleTestRemove = (index) => {
        console.log(index)
        const list = [...sampleTestList];
        console.log(list);
        list.splice(index, 1);
        console.log(list);
        setSampleTestList(list);
    };
    
    
    const handleSampleTestAdd = () => {
        setSampleTestList([...sampleTestList, {input: "" , output: ""}]);
    };




    const handlemainInputChange = (e, index) => {
        const file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            const list = [...mainTestList];
            list[index]["input"] = e.target.result;
            setmainTestList(list);
        }
    };

    const handlemainOutputChange = (e, index) => {
        const file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            const list = [...mainTestList];
            list[index]["output"] = e.target.result;
            setmainTestList(list);
        }
    };

    const handlemainTestRemove = (index) => {
        console.log(index)
        const list = [...mainTestList];
        console.log(list);
        list.splice(index, 1);
        console.log(list);
        setmainTestList(list);
    };
    
    
    const handlemainTestAdd = () => {
        setmainTestList([...mainTestList, {input: "" , output: ""}]);
    };


    const submit = () => {

        // axios.post('http://localhost:3001/problem', {
        //     title, 'inputmainFile':inputSampleFile, 'outputSampleFile': outputSampleFile, 'inputMainFile':inputMainFile, 'outputMainFile': outputMainFile, timeLimit, memoryLimit, statement, inputDescription, outputDescription, tagList
        // })

        alert("Successfull");
    }




	useEffect(() => {
        handleTagAdd();
        handleSampleTestAdd();
        handlemainTestAdd();
	}, [])

    return (
        <div className="SetProblem">
            <TopBar/>
            <div className="App SetProblemMain">
                <div className="Steps">
                    <div className="StepContainer Step1Container">
                        <text onClick={() => setStep(1)}>Step 1</text>
                    </div>
                    <div className="StepContainer Step2Container">
                        <text onClick={() => setStep(2)}>Step 2</text>
                    </div>
                    <div className="StepContainer Step3Container">
                        <text onClick={() => setStep(3)}>Step 3</text>
                    </div>
                    <div className="StepContainer Step4Container">
                        <text onClick={() => setStep(4)}>Step 4</text>
                    </div>
                </div>
                {                    
                    step === 1? (
                        <div className="flexRow">
                            <div className="NewProblem1 flexRow">
                                <TextField 
                                    fullWidth
                                    label="Problem Title" 
                                    margin="normal" 
                                    variant="outlined" 
                                    onChange={e => setTitle(e.target.value)}
                                    value = {title}
                                    className="NewProblemText1"
                                />
                                <div className="gap24"/>
                                <div className="flexColumn">
                                    <Button variant="contained" onClick={() => setStep(2)} className="NewProblemButton1">Next<NavigateNextOutlinedIcon/></Button>
                                </div>
                            </div>
                        </div>
                    ) :step === 2? (
                        <div className="flexRow">
                            <div className="NewProblem2 flexColumn">
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField 
                                            label="Time Limit" 
                                            margin="normal" 
                                            variant="outlined" 
                                            onChange={e => settimeLimit(e.target.value)}
                                            value = {timeLimit}
                                            className="NewProblemText2"
                                            InputProps={{
                                                endAdornment: <InputAdornment position='end'>ms</InputAdornment>,
                                            }}
                                        />
                                    </Grid>
                                    
                                    <Grid item xs={6}>
                                        <TextField 
                                            label="Memory Limit" 
                                            margin="normal" 
                                            variant="outlined" 
                                            onChange={e => setmemoryLimit(e.target.value)}
                                            value = {memoryLimit}
                                            className="NewProblemText2"
                                            InputProps={{
                                                endAdornment: <InputAdornment position='end'>mb</InputAdornment>,
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs = {6}>
                                        <label htmlFor="Tests">Sample Test Cases</label>
                                    </Grid>
                                    <Grid item xs = {6}>
                                        <label htmlFor="Tests">Main Test Cases</label>
                                    </Grid>
                                </Grid>
                                <div className="flexRow">
                                    <div className="NewProblem2Scroll">
                                        {sampleTestList.map((singleSample, index) => (
                                            <div key={index} >
                                            {sampleTestList.length - 1 === index ? (
                                                null ) : (
                                                <div className="TestSuit flexRow">
                                                    <div className="flexColumn">
                                                        <div className="TestSuitInput">
                                                            <input 
                                                                type="file"
                                                                onChange={(e) => {handleSampleInputChange(e, index)}}
                                                            />
                                                            <div className="TestSuitInputOver">Input</div>
                                                        </div>
                                                        <div className="TestSuitInput">
                                                            <input 
                                                                type="file"
                                                                onChange={(e) => {handleSampleOutputChange(e, index)}}
                                                            />
                                                            <div className="TestSuitInputOver">Output</div>
                                                        </div>
                                                    </div>
                                                    <Button onClick={() => handleSampleTestRemove(index)}><HighlightOffIcon/></Button>
                                                </div> 
                                            )}
                                            <div className="gap8" />
                                            {sampleTestList.length - 1 === index? (
                                                sampleTestList.length === 16? null :
                                                <Button variant="outlined" onClick={handleSampleTestAdd}><AddTaskIcon/>Add sample test</Button>
                                            ) : (
                                                null
                                                )}
                                        </div>
                                        ))}
                                    </div>
                                    
                                    <div className="NewProblem2Scroll">
                                        {mainTestList.map((singlemain, index) => (
                                            <div key={index} >
                                            {mainTestList.length - 1 === index ? (
                                                null ) : (
                                                <div className="TestSuit flexRow">
                                                    <div className="flexColumn">
                                                        <div className="TestSuitInput">
                                                            <input 
                                                                type="file"
                                                                onChange={(e) => {handlemainInputChange(e, index)}}
                                                            />
                                                            <div className="TestSuitInputOver">Input</div>
                                                        </div>
                                                        <div className="TestSuitInput">
                                                            <input 
                                                                type="file"
                                                                onChange={(e) => {handlemainOutputChange(e, index)}}
                                                            />
                                                            <div className="TestSuitInputOver">Output</div>
                                                        </div>
                                                    </div>
                                                    <Button onClick={() => handlemainTestRemove(index)}><HighlightOffIcon/></Button>
                                                </div> 
                                            )}
                                            <div className="gap8" />
                                            {mainTestList.length - 1 === index? (
                                                mainTestList.length === 16? null :
                                                <Button variant="outlined" onClick={handlemainTestAdd}><AddTaskIcon/>Add main test</Button>
                                            ) : (
                                                null
                                                )}
                                        </div>
                                        ))}
                                    </div>


                                </div>
                                <div className="flexRow pad32">
                                    <Button variant="contained" onClick={() => setStep(1)}><NavigateBeforeIcon/>Prev</Button>
                                    <Button variant="contained" onClick={() => setStep(3)}>Next<NavigateNextOutlinedIcon/></Button>
                                </div>
                            </div>
                        </div>
                    ) :step === 3? (
                        <div className="NewProblemFullContainer flexColumn">
                            <div className="NewProblem3 flexColumn">
                                {/* <TextField 
                                    label="Problem Statement" 
                                    margin="normal" 
                                    variant="outlined" 
                                    value={statement}
                                    onChange={e => setstatement(e.target.value)}
                                    maxRows={12}
                                    minRows={6}
                                    multiline
                                    className="NewProblemStatement"
                                /> */}

                                <JoditEditor
                                    ref={editor}
                                    value={content}
                                    onChange={newContent => {}}
                                />
                                <div className="flexRow">
                                    <TextField 
                                        label="Input Description" 
                                        margin="normal" 
                                        variant="outlined" 
                                        value={inputDescription}
                                        onChange={e => setinputDescription(e.target.value)}
                                        maxRows={5}
                                        minRows={3}
                                        multiline
                                        fullWidth

                                    />
                                    <div className="gap16px"/>
                                    <TextField 
                                        label="Output Description" 
                                        margin="normal" 
                                        variant="outlined" 
                                        value={outputDescription}
                                        onChange={e => setoutputDescription(e.target.value)}
                                        maxRows={5}
                                        minRows={3}
                                        multiline
                                        fullWidth
                                    />  
                                </div>
                                <div className="flexRow pad240">
                                    <Button variant="contained" onClick={() => setStep(2)}><NavigateBeforeIcon/>Prev</Button>
                                    <Button variant="contained" onClick={() => setStep(4)}>Next<NavigateNextOutlinedIcon/></Button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="NewProblemFullWidth flexRow">
                            <div className="NewProblemFullContainer flexColumn">
                                <div className="NewProblem4">
                                    <label htmlFor="tag">Tag(s)</label>

                                    <div className="NewProblem4Scroll">

                                        {tagList.map((singletag, index) => (
                                            <div key={index} className="flexRow pad4">

                                            {tagList.length - 1 === index ? (
                                                null ) : ( 
                                                    <TextField
                                                        hiddenLabel
                                                        name="tag"
                                                        defaultValue="Small"
                                                        variant="filled"
                                                        id="tag"
                                                        size="small"
                                                        value={singletag.tag}
                                                        onChange={(e) => handleTagChange(e, index)}
                                                        />
                                            )}
                                            
                                            {tagList.length - 1 === index ? ( null ) : ( <div className="gap8" /> )}

                                            {tagList.length - 1 === index ? (
                                                tagList.length === 16? null :
                                                <Button variant="outlined" onClick={handleTagAdd}><AddTaskIcon/>Add a tag</Button>
                                            ) : (
                                                <Button variant="outlined" onClick={() => handleTagRemove(index)}><DeleteSweepIcon/>Remove</Button>
                                                )}
                                        </div>
                                        ))}
                                    </div>
                                    <div className="flexRow">
                                        <Button variant="contained" onClick={() => setStep(3)}><NavigateBeforeIcon/>Prev</Button>
                                        <Button variant="contained" onClick={submit}><LibraryAddCheckIcon/>Submit</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }

            </div>
        </div>
  );
}

export default SetProblem;

