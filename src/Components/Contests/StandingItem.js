import React from "react";
import '../../CSS/Contest.css'
const StandingItem = (prop) => {

    const gotoUser = () => {
        if(! prop.header) window.location.href = '/profile/'+prop.item.userId;
    }


    return (
        <div className="StandingItem">
            <div className= {prop.header? "ParticipentName ThinBorder" : "ParticipentName ThinBorder clickable"} 
            onClick={() => gotoUser()}
            >{prop.item.userName}</div>
            <div className="ParticipentSolved ThinBorder">{prop.item.solved}</div>
            <div className="ParticipentPenalty ThinBorder">{prop.item.penalty}</div>
        </div>
  );
}

export default StandingItem;