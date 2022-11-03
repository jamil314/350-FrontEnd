import React from "react";
import {Button} from '@mui/material'
import '../CSS/App.css'
const Button1 = (prop) => {
    return (
        <Button variant="contained"  onClick={prop.onClick}>{prop.text}</Button>
    );
}

export default Button1;