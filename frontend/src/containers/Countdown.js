import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const clock = {
  textAlign: "center",
  fontSize: "80px",
  marginTop: "0px",
  color: "limegreen",
  position: "absolute",
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const clickButton = {
  fontFamily: "Roboto sans-serif",
  outline: "1",
  background: "limegreen",
  width: "25%",
  border: "0",
  margin: "0 0 15px",
  padding: "15px",
  boxSizing: "border-box",
  color: "white",
  borderRadius: "10px",
  lineBreak: "auto",
  fontSize: "35px",
  marginTop: "500px",
};

function Countdown() {
  const { electionID } = useParams();

  const [election, setElection] = useState({ loading: true });

  useEffect(() => {
    const loadElections = async () => {
      const response = await fetch("http://localhost:3000/showallElections", {
        method: "POST",
        withCredentials: true,
        credentials: "include", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          doctype: "string",
        }),
      });

      const data = await response.text();

      let elections = [];

      if (data === undefined || data === "") {
        elections = [];
      } else {
        elections = JSON.parse(data);
      }

      //   console.log(data);

      let election = elections.find((election) => election.ID === electionID);
      console.log(election);

      setElection(election);
    };

    const electionLoader = setInterval(loadElections, 5000);
    loadElections();

    return () => clearInterval(electionLoader);
  }, [electionID]);

  const electionLoading = election?.loading === true;
  const electionFound = !(election === undefined);
  const electionRunning = !election?.Ended;

  let nextPageLink = null;

  //console.log(election);

  if (electionLoading) {
    nextPageLink = <div style={clock}>Loading...</div>;
  } else if (!electionFound) {
    nextPageLink = <div style={clock}>Invalid Election ID</div>;
  } else if (electionRunning) {
    nextPageLink = (
      <>
        <div style={clock}>
          <span>Election is running</span>
        </div>

        <Link to={`/Candidates/${electionID}`}>
          <button style={clickButton}> Choose Your Candidate </button>
        </Link>
      </>
    );
  } else {
    nextPageLink = (
      <>
        <div style={clock}>
          <span>Election is over</span>
        </div>

        <Link to={`/Results/${election.ID}`}>
          <button style={clickButton}> View Result </button>
        </Link>
      </>
    );
  }

  return nextPageLink;
}

export default Countdown;
