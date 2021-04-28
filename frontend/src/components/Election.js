import React from "react";
import { Link } from "react-router-dom";

const forElection = {
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

const electionButton = {
  color: "limegreen",
  backgroundColor: "white",
  border: "none",
  fontSize: "40px",
  outline: "none",
  cursor: "pointer",
  //fontWeight: 'bold'
};

export default function Election({ election }) {
  return (
    <>
      <div className="Elections" style={forElection}>
        <div className="Electionsid">{election.ID}</div>
        <Link to={`/countdown/${election.ID}`}>
          <button className="Electionsname" style={electionButton}>
            {election.Name}
          </button>
        </Link>
      </div>
    </>
  );
}
