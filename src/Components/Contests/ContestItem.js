import React from "react";
import '../../CSS/Contest.css'
const ContestItem = (prop) => {

    const oepnContest = () => {
        if(!prop.header) window.location.href = "/joinContest/"+prop.contest.contestID;
    }

    return (
        <div className="ContestItem">
            <div className= {prop.header?"ContestName ThinBorder" : "ContestName ThinBorder clickable"}
             onClick={oepnContest}>{prop.contest.contestName}</div>
            <div className="ContestStart ThinBorder">{prop.contest.startTime}</div>
            <div className="ContestStart ThinBorder">{prop.contest.endTime}</div>
            <div className="ContestParticipation ThinBorder">{prop.contest.Participation}</div>

        </div>
  );
}

export default ContestItem;