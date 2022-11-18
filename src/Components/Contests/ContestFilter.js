import React, { useEffect} from 'react';
import socketClient from 'socket.io-client'

import '../../CSS/Contest.css'
import {Button, TextField} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

const ContestFilter = () => {
    const serchContest = () => {
        const socket = socketClient('http://localhost:3000', {
            query: { token:localStorage.getItem('token') }
          });
        socket.emit('jamil')
        socket.on("reply", (data) => {
            console.log("reply: ", data);
            socket.disconnect();
            socket.emit('jamil2')
        })
    }


    return (
        <div className="ContestFilter">
            <TextField 
                label="Name" 
                margin="none"
                variant="outlined" 
                size="small"
            />
            <TextField 
                label="Group" 
                margin="none"
                variant="outlined"
                size="small" 
            />
            <TextField 
                label="Owner" 
                margin="none"
                variant="outlined"
                size="small"
            />
			<Button variant="contained" onClick={() => serchContest()}><SearchIcon/>Search</Button>
        </div>
  );
}

export default ContestFilter;
