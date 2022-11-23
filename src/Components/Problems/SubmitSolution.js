import { Button } from '@mui/material';
import React, {useState} from 'react'
import socketClient, { Socket } from 'socket.io-client'
import axios from 'axios';



const SubmitSolution = (prop) => {
    const [solution, setSolution] = useState(null)
    const [solution2, setSolution2] = useState("")
    const [status, setStatus] = useState("")
    // const [location, setLocation] = useState("")
    
    // console.log(prop.id);

    const handleSolutionChange = (e) => {
        const file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            setSolution( e.target.result.split(',')[1] );
        }
    };


    const fixTabs = (e) => {
        
        if(e.keyCode === 9){
            e.preventDefault();
            const { selectionStart, selectionEnd } = e.target;
            setSolution2(
                solution2.substring(0, selectionStart) + "    " +
                solution2.substring(selectionEnd)
            );
        }
    }


    const submitSolution = () => {
        setStatus("Submitting Solution");
        const socket = socketClient('http://localhost:3000', {
            query: { token:localStorage.getItem('token') }
        });
        if(solution == null) socket.emit('judge', prop.id, solution2, 'text');
        else socket.emit('judge', prop.id, solution, 'file');

        socket.on('submission', (folderUrl) => {
            // setLocation(folderUrl);
        })

        socket.on('Running', (tid) => {
            setStatus("Running on case " + tid);
        })

        socket.on('Verdict', (code, tid, location) => {
            console.log(code, tid, location);
            let st;
            switch (code) {
                case 0:
                    st = "Accepted";
                    break;
                case 134:
                    st = ("Runtime Error - SIGABRT on case " + tid);
                    break;
                case 136:
                    st = ("Runtime Error - SIGFPE on case " + tid);
                    break;
                case 139:
                    st = ("Runtime Error - SIGSEGV on case " + tid);
                    break;
                case 1:
                    st = ("Compilation Error");
                    break;
                case 124:
                    st = ("Time limit exceeded on case " + tid);
                    break;
                case -1:
                    st = ("Wrong Answer on case " + tid);
                    break;
                default:
                    break;
                }
                setStatus(st);
                console.log(st);
                console.log(location);
                axios.post('http://localhost:3000/submission/', {
                    solution: location,
                    problemId: prop.id,
                    contestId: prop.contest,
                    verdict: st
                },{
                    headers: { 'authorization': localStorage.getItem('token') },
                }).then((res) =>{
                }).catch((res) =>{
                })
                socket.disconnect();
        })
    }

    return (
        <div className='PopUpBg center'>
            <div className='submitSolutionContainer center'>
            <div className='flexRow submitSolutionTop'>
                Language: c++ 17
                <div className="TestSuitInput">
                    <input 
                        accept=".cpp"
                        type="file"
                        onChange={(e) => {handleSolutionChange(e)}}
                    />
                    <div className="TestSuitInputOver">Solution</div>
                </div>
                {status}
            </div>
            <textarea
                className='submitSolutionText'
                placeholder='Source code...'
                value={solution2}
                onChange={(e) => setSolution2(e.target.value)}
                onKeyDown={(e) => fixTabs(e)}
                >
            </textarea>
            <div className='flexRow submitSolutionTop'>
                <Button variant='contained' onClick={() => prop.abort()}>Close</Button>
                <Button variant='contained' onClick={() => submitSolution()}>Submit</Button>
            </div>
            </div>
        </div>
    )
}

export default SubmitSolution