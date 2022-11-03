import React from "react";
import '../../CSS/Contest.css'
const StandingItem = (prop) => {

    const oepnContest = () => {
        window.location.href = '/contest/'+prop.contest.id;
    }


    return (
        <div className="StandingItem" onClick={oepnContest}>
            <div className="ParticipentName ThinBorder">{prop.participent.Participent}</div>
            <div className="ParticipentSolved ThinBorder">{prop.participent.Solved}</div>
            <div className="ParticipentPenalty ThinBorder">{prop.participent.Penalty}</div>
            <div className="ParticipentProblem ThinBorder">{prop.participent.A}</div>
            <div className="ParticipentProblem ThinBorder">{prop.participent.B}</div>
            <div className="ParticipentProblem ThinBorder">{prop.participent.C}</div>
            <div className="ParticipentProblem ThinBorder">{prop.participent.D}</div>
            <div className="ParticipentProblem ThinBorder">{prop.participent.E}</div>
        </div>
  );
}

export default StandingItem;