import React from "react";
import '../../CSS/Contest.css'
const ContestItem = (prop) => {

    const oepnContest = () => {
        
        window.location.href = '/contest/'+prop.contest.id;
    }

    return (
        <div className="ContestItem" onClick={oepnContest}>
            <div className="ContestName ThinBorder clickable">{prop.contest.Name}</div>
            <div className="ContestStart ThinBorder">{prop.contest.Start}</div>
            <div className="ContestDuration ThinBorder">{prop.contest.Duration}</div>
            <div className="ContestParticipation ThinBorder">{prop.contest.Participation}</div>
            <div className="ContestOwner ThinBorder">{prop.contest.Owner}</div>

        </div>
  );
}

export default ContestItem;