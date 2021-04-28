import React, { useEffect, useState } from "react";
//import { useRef } from 'react'
import { useParams } from "react-router-dom";
import Candidate from "../components/Candidate";
const heading = {
  color: "black",
  fontSize: "70px",
  textAlign: "centre",
};

const forCandidates = {
  height: "500px",
  width: "1000px",
  margin: "10px auto",
  display: "flex",
  flexDirection: "column",
  marginTop: "100px",
};

const clickButton = {
  fontFamily: "Roboto sans-serif",
  outline: "1",
  background: "limegreen",
  width: "20%",
  border: "0",
  margin: "0 0 15px",
  padding: "15px",
  boxSizing: "border-box",
  color: "white",
  borderRadius: "10px",
  lineBreak: "auto",
  fontSize: "25px",
  fontWeight: "bold",
  marginTop: "80px",
};

function Candidates(props) {
  const { electionID } = useParams();

  const [candidates, setCandidates] = useState({ loading: true });
  const [voteCasted, setVoteCasted] = useState(false);

  useEffect(() => {
    const loadCandidates = async () => {
      const response = await fetch("http://localhost:3000/showallCandidate", {
        method: "POST",
        withCredentials: true,
        credentials: "include", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          electionid: electionID,
        }),
      });

      const data = await response.text();

      let candidates = [];

      if (data === undefined || data === "") {
        candidates = [];
      } else {
        candidates = JSON.parse(data);
      }

      setCandidates(candidates);
    };

    const candidatesLoader = setInterval(loadCandidates, 5000);
    loadCandidates();

    return () => clearInterval(candidatesLoader);
  }, [electionID]);

  console.log(candidates);

  let candidatesLoading = candidates?.loading;
  let candidatesNotFound = candidates === undefined;

  if (candidatesLoading) {
    return <h1 className="heading">Loading Candidates...</h1>;
  }

  if (candidatesNotFound) {
    return <h1 className="heading">Candidates not found</h1>;
  }

  async function logout(props) {
    console.log("logout started");

    await fetch("http://localhost:3000/logoutUser", {
      method: "GET",
      withCredentials: true,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    props.history.push("/Login");
  }
  return (
    <>
      <h1 style={heading}> Vote For Your Candidate </h1>

      <div>
        <button onClick={() => logout(props)} style={clickButton}>
          {" "}
          logout{" "}
        </button>
      </div>

      <div className="candidates" style={forCandidates}>
        {candidates.map((cand, i) => (
          <Candidate
            key={i}
            candidate={cand}
            voteCasted={voteCasted}
            setVoteCasted={setVoteCasted}
          />
        ))}
      </div>

      {/* <Link to="/over">
        <button style={clickButton}> See Results </button>
      </Link> */}
    </>
  );
}

export default Candidates;
