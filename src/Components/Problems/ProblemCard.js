import {useState, useEffect, React} from "react";
import { useParams } from "react-router-dom";
import '../../CSS/Problem.css'
import axios from 'axios';
import {Button, getDrawerUtilityClass} from '@mui/material'
import PublishIcon from '@mui/icons-material/Publish';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SubmitSolution from "./SubmitSolution";
const ProblemCard = (prop) => {
    const [Problem, setProblem] = useState([]);
    const [tried, setTried] = useState(0);
    const [solved, setSolved] = useState(0);
    const [tags, setTags] = useState("");
    const [sample, setSample] = useState([]);
    const [submitMode, setSubmitMode] = useState(false);

    // console.log(response.data);

	async function fetchMain (){
        const response = await axios.get('http://localhost:3000/problem/byId/'+prop.id);
        setProblem(response.data);
	}
	async function fetchTag (){
        const response = await axios.get('http://localhost:3000/problem/getTag/'+prop.id);
        setTags("");
        response.data.map( (tag) => {
            setTags(tags + tag.tag)
        } )
	}
	async function fetchSample (){
        const response = await axios.get('http://localhost:3000/problem/getSample/'+prop.id);
        setSample(response.data);
        console.log(sample);
	}

    const abortSubmit = () => {
        setSubmitMode(false);
    }

    const renderRT = (richText) => {
        return{__html:richText}
    }

	useEffect(() => {
		fetchMain();
		fetchTag();
		fetchSample();
	}, [])

    return (
        <div className={prop.mode == "Contest"?"SingleProblem forContest":"SingleProblem forPractice"}>
        {prop.mode == "Contest"?
                <div className="ProblemHeader">
                <div className="ProblemInfo flexRow">
                    <div className="flexColumn">
                        <CheckCircleIcon color="success"/>
                    </div>
                    <div className="gap24"/>
                    <h1>{Problem.title}</h1>
                    <div className="gap24"/>
                    <div className="flexColumn">
                        <span>Time Limit: 1000 ms</span>
                        <span>Memory Limit 520000 kb</span>
                        <span>OS: Linux</span>
                    </div>
                </div>
                <Button variant="contained" className="ProblemInfo"><PublishIcon/>Submit</Button>
            </div>
            :
            <div className="ProblemHeader">
                <div className="ProblemInfo flexRow">
                    <div className="flexColumn">
                        <CheckCircleIcon color="success"/>
                    </div>
                    <div className="gap24"/>
                    <h1>{Problem.title}</h1>
                    <div className="gap24"/>
                    <div className="flexColumn">
                        <span>Time Limit: {Problem.timeLimit} ms</span>
                        <span>Memory Limit {Problem.memoryLimit} kb</span>
                        <span>OS: Linux</span>
                    </div>
                    <div className="gap24"/>
                    <div className="flexColumn">
                        <span>Author: {Problem.author}</span>
                        <span>Tried: 54</span>
                        <span>Solved: 47</span>
                    </div>
                    <div className="gap24"/>
                    <div className="flexColumn">
                        <span>Rating: {Problem.difficulty}</span>
                        <span>Submissions</span>
                        <span>Tags: {tags}</span>
                    </div>
                </div>
                <Button variant="contained" className="ProblemInfo" onClick={() => setSubmitMode(true)}><PublishIcon/>Submit</Button>
            </div>
        }
         
            <div className="Description"> <b>Statement</b> <br/><br/> 
                <div dangerouslySetInnerHTML={renderRT(Problem.statement)}/>
            </div>
            <div className="Description"> <b>Input</b> <br/><br/> 
                <div dangerouslySetInnerHTML={renderRT(Problem.inputDescription)}/>
            </div>
            <div className="Description"> <b>Output</b> <br/><br/>
                <div dangerouslySetInnerHTML={renderRT(Problem.outputDescription)}/>
            </div>
            <div className="flexColumn">
                {sample.map((element, index) => (                
                    <div className="Sample flexRow">
                        <div className="SampleDescription flexColumn">
                            <div className="flexRow">
                            <b>Sample input {index+1}</b> 
                                <Button variant="outlined" className="copyDirect"><ContentCopyIcon/></Button>
                            </div>
                            <div 
                                dangerouslySetInnerHTML={renderRT(element.input)}
                            /> 
                            {/* {element.input} */}
                        </div>

                        <div className="SampleDescription flexColumn">
                            <div className="flexRow">
                            <b>Sample Output {index+1}</b>
                                <Button variant="outlined" className="copyDirect"><ContentCopyIcon/></Button>
                            </div> 
                            <div 
                                dangerouslySetInnerHTML={renderRT(element.output)}
                            ></div> 
                            {/* {element.output} */}
                        </div>

                    </div>

                ))}
            </div>
                {submitMode?<SubmitSolution abort = {abortSubmit} id = {Problem.problemID} />:null}

        </div>
  );
}


export default ProblemCard;