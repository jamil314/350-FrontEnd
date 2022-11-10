// import {React, useState} from "react";
// import '../../CSS/Contest.css'
// import '../../CSS/Problem.css'


import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import Jodit from 'jodit'

const Status = ({ placeholder }) => {
    // var editor = Jodit.make('#editor');
    // editor.setEditorValue('<p>start</p>')

	return (
        <div>
                status
                <textarea id="editor"></textarea>

        </div>
	);
}
export default Status;