import React from "react";
import '../../CSS/Problem.css'
import {Button, TextField} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
const ProblemFilter = () => {
    return (
        <div className="ProblemFilter">
            <TextField 
                label="Title" 
                margin="none"
                variant="outlined" 
                size="small"
            />
            <TextField 
                label="Tag" 
                margin="none"
                variant="outlined"
                size="small" 
            />
            <TextField 
                label="Difficulty" 
                margin="none"
                variant="outlined"
                size="small"
            />
			<Button variant="contained"><SearchIcon/>Search</Button>
        </div>
  );
}

export default ProblemFilter;