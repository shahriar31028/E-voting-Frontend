import React, { Component, useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Election from "../components/Election";
import { nativeTouchData } from "react-dom/test-utils";

const heading = {
  color: "black",
  fontSize: "70px",
  textAlign: "centre",
};

const forElections = {
  height: "500px",
  width: "700px",
  margin: "10px auto",
  display: "flex",
  flexDirection: "column",
  marginTop: "100px",
};

export default function Elections(props) {
  const [elections, setElections] = useState([]);

  useEffect(() => {
    async function loadElections() {
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

      if (data === undefined || data === "") {
        setElections([]);
      } else {
        setElections(JSON.parse(data));
      }

      console.log(data);
      // setElections(data);
    }

    console.log("shuru hoise");

    const electionsLoader = setInterval(loadElections, 5000);
    loadElections();

    return () => clearInterval(electionsLoader);
  }, []);

  return (
    <>
      <h1 style={heading}> Running Elections </h1>
      <div className="Elections" style={forElections}>
        {elections === null && <h1>Loading...</h1>}
        {elections?.length === 0 && <h1>No Election is running</h1>}

        {elections.map((elec, i) => (
          <Election key={i} election={elec} />
        ))}
      </div>
    </>
  );
}
