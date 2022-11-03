import {useState, useEffect, React} from "react";
import { useParams } from "react-router-dom";
import '../../CSS/Problem.css'
import TopBar from "../TopBar";
import axios from 'axios';
import {Button} from '@mui/material'
import PublishIcon from '@mui/icons-material/Publish';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
const Problem = () => {
    const {id} = useParams();
    const [Problem, setProblem] = useState([]);


	async function fetch (){
        const response = await axios.get('http://localhost:3001/problem/'+id);

        console.log(response.data);
        setProblem(response.data);
	}

	useEffect(() => {
		fetch();
	}, [])

    return (
        <div className="Problem">
            <TopBar/>
            <div className="ProblemHeader">
                <div className="ProblemInfo flexRow">
                    <Button variant="outlined" color="success" className="ProblemInfo"><CheckCircleIcon/></Button>
                    <div className="gap24"/>
                    <h1>{Problem.title}</h1>
                    <div className="gap24"/>
                    <div className="flexColumn">
                        <span>Time Limit: 1000 ms</span>
                        <span>Memory Limit 520000 kb</span>
                        <span>OS: Linux</span>
                    </div>
                    <div className="gap24"/>
                    <div className="flexColumn">
                        <span>Author: Jamil314</span>
                        <span>Tried: 54</span>
                        <span>Solved: 47</span>
                    </div>
                    <div className="gap24"/>
                    <div className="flexColumn">
                        <span>Rating: 1200</span>
                        <span>Submissions</span>
                        <span>Tags: Ad-hoc, Binary Search</span>
                    </div>
                </div>
                <Button variant="contained" className="ProblemInfo"><PublishIcon/>Submit</Button>
            </div>
            <div className="Description"> {Problem.statement} </div>
            <div className="Description"> Input <br/><br/> {Problem.inputDescription} </div>
            <div className="Description"> Output <br/><br/>  {Problem.outputDescription} </div>
            <div className="Sample flexRow">
                <div className="SampleDescription flexColumn">
                    <div className="flexRow">
                        Sample input 1 
                        <Button variant="outlined" className="copyDirect"><ContentCopyIcon/></Button>
                    </div> 
                    4 <br/>
                    4 2 1 3
                </div>

                <div className="SampleDescription flexColumn">
                    <div className="flexRow">
                        Sample Output 1 
                        <Button variant="outlined" className="copyDirect"><ContentCopyIcon/></Button>
                    </div> 
                    1 2 3 4
                </div>

            </div>



        </div>
  );
}


export default Problem;