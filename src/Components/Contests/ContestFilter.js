import React from "react";
import '../../CSS/Contest.css'
import {Button, TextField} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
const ContestFilter = () => {
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
			<Button variant="contained"><SearchIcon/>Search</Button>
        </div>
  );
}

export default ContestFilter;
