import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const heading = {
  color: "black",
  fontSize: "70px",
  textAlign: "centre",
};

const tableStyle = {
  marginTop: "200px",
  border: "3px solid limegreen",
  width: "70%",
  position: "relative",
  marginLeft: "300px",
};

const headerStyle = {
  fontSize: "30px",
  color: "black",
};

const dataStyle = {
  fontSize: "25px",
  color: "black",
  border: "2px",
  borderColor: "limegreen",
};

export default function CalculateResult() {
  const { electionID } = useParams();

  const [result, setResult] = useState([]);
  const [candidates, setCandidates] = useState([]);

  //const [election, setElection] = useState({ loading: true });
  useEffect(() => {
    const loadResults = async () => {
      const response = await fetch("http://localhost:3000/calculateResult", {
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

      let electionResult = [];

      if (data === undefined || data === "") {
        electionResult = [];
      } else {
        electionResult = JSON.parse(data);
        setResult(electionResult);
      }
    };

    loadResults();

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

      let candidateList = [];

      if (data === undefined || data === "") {
        candidateList = [];
      } else {
        candidateList = JSON.parse(data);
        setCandidates(candidateList);
      }
    };

    loadCandidates();
  }, [electionID]);

  function generateHeader() {
    const columnHeader = ["Candidate Name", "Marka", "Total Votes"];

    let res = [];
    for (var i = 0; i < columnHeader.length; i++) {
      res.push(<th key={columnHeader[i]}> {columnHeader[i]} </th>);
    }
    return res;
  }

  function generateTableData() {
    let res = [];

    for (let candidate of candidates) {
      let { Name, Marka } = candidate;

      let candidateVotes = result.filter(
        (candidateResult) => candidateResult.CandidateID === candidate.ID
      );

      let Votes = 0;

      if (candidateVotes.length !== 0) {
        Votes = candidateVotes[0].VoteCount;
      }

      res.push(
        <tr key={candidate.ID}>
          <td> {Name} </td>
          <td> {Marka} </td>
          <td> {Votes} </td>
        </tr>
      );
    }

    // let tableData = candidates.candidates;
    // for (var i = 0; i < tableData.length; i++) {
    //   res.push(
    //     <tr key={i}>
    //       <td key={tableData[i].Name}> {tableData[i].name} </td>
    //       <td key={tableData[i].Marka}> {tableData[i].marka} </td>
    //       <td key={tableData[i].Votes}> {tableData[i].votes} </td>
    //     </tr>
    //   );
    // }
    return res;
  }

  //   function generateTableData() {
  //     let res = [];
  //     let tableData = candidates.candidates;
  //     for (var i = 0; i < tableData.length; i++) {
  //       res.push(
  //         <tr key={i}>
  //           <td key={tableData[i].Name}> {tableData[i].name} </td>
  //           <td key={tableData[i].Marka}> {tableData[i].marka} </td>
  //           <td key={tableData[i].Votes}> {tableData[i].votes} </td>
  //         </tr>
  //       );
  //     }
  //     return res;
  //   }

  return (
    <>
      <h1 style={heading}> Election Results </h1>
      {/* <h2>{JSON.stringify(result, null, 2)}</h2> */}
      {/* <h2>{JSON.stringify(candidates, null, 2)}</h2> */}

      <div>
        <table
          defaultsorted={[
            {
              id: "votes",
              desc: true,
            },
          ]}
          className="table table-hover"
          style={tableStyle}
        >
          <thead>
            <tr style={headerStyle}>{generateHeader()}</tr>
          </thead>
          <tbody style={dataStyle}>{generateTableData()}</tbody>
        </table>
      </div>
    </>
  );
}
