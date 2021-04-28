import React, { useState } from "react";
//import { useRef } from 'react'

const forCandidate = {
  flex: "1",
  display: "flex",
  outline: "0",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 40px",
  backgroundColor: "white",
  border: "2px solid limegreen",
  color: "black",
  margin: "2px",
  marginTop: "50px",
  fontSize: "30px",
  borderRadius: "10px",
};

const forVoteCount = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const voteButton = {
  color: "limegreen",
  backgroundColor: "white",
  border: "none",
  fontSize: "40px",
  outline: "none",
  cursor: "pointer",
  //fontWeight: 'bold'
};

export default function Candidate({ candidate, voteCasted, setVoteCasted }) {
  let [voteForThisCandidate, setVoteForThisCandidate] = useState(false);

  async function voteForCandidate(candidate) {
    console.log(candidate);
    //console.log("shahriar");
    try {
      const response = await fetch("http://localhost:3000/votecasting", {
        method: "POST",
        withCredentials: true,
        credentials: "include", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          electionid: candidate.ElectionID,
          candidateid: candidate.ID,
        }),
      });

      const data = await response.json();
      console.log(data);

      //console.log("shahriar");

      setVoteForThisCandidate(true);
      setVoteCasted(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="candidate" style={forCandidate}>
        <div className="voteCount" style={forVoteCount}>
          {candidate.votes}
        </div>
        <div className="candidateID">{candidate.ID}</div>
        <div className="candidateName">{candidate.Name}</div>
        <div className="candidateMarka">{candidate.Marka}</div>

        {!voteCasted && (
          <button
            onClick={() => voteForCandidate(candidate)}
            disabled={candidate.votes}
            style={voteButton}
          >
            {" "}
            Vote{" "}
          </button>
        )}

        {voteCasted && !voteForThisCandidate && <div>😭</div>}

        {voteForThisCandidate && <div>😊</div>}
      </div>
    </>
  );
}
