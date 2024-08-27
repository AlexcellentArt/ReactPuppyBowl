import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import * as GoFetch from "../go-fetch.js";
import NewPlayerForm from "./NewPlayerForm.jsx";
// import { fetchTeamLookup } from "../go-fetch.js";
// let GoFetch = require('../go-fetch.js').default;
// GoFetch from "../go-fetch.js";
import PuppyCard from "./PuppyCard";
function PuppyDisplay(props) {
  // mode can be isolated to here I think because its not relevant to other stuff. Sans maybe search.
  // I could just have it able to tell by the amount of data though. If there is only one dog, then it's obviously detail mode.
  // still, might as well play it safe and keep it mode. Would be easy to dummy out later if needed

  const [mode, setMode] = useState(props.mode);
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [teamLookup, setTeamLookup] = useState({});
  //   const teamLookup = {};
  const params = useParams();
  // if (props.mode === "single")
  // {
  //     let userId = useParams()
  // }
  useEffect(() => {
    // clear players first, just in case.
    console.log("PLAYERS BEFORE:");
    console.table(players);
    setMode(props.mode)
    // players.clear();
    async function handleSetup() {
      if (mode !== "team")
      {
        setTeams(await GoFetch.fetchTeams());
      }
      else {
        setTeamLookup(await GoFetch.fetchTeamLookup());
      }
      if (mode === "single")
      {
        const singlePlayer = await GoFetch.fetchSinglePlayer(params.id);
        setPlayers([singlePlayer]);
      }
      else if (mode === "multi")
      {
        setPlayers(await GoFetch.fetchAllPlayers());
      }
    }
    handleSetup();
    console.log("PLAYERS AFTER:");
    console.table(players);
    if (Array.isArray(players) === false) {
      console.log("NOT ARRAY");
      players = [];
    }
  }, []);

  function makeCards(data) {
    // const cards = [];
    return (
      <PuppyCard
        key={data.id}
        data={data}
        mode={mode}
        teamLookup={teamLookup}
      ></PuppyCard>
    );
  }
  // by having the className just be the mode name with render on it, I can have multiple views completely handled by one mode input.
  // two ways I can approach. 1. Only focuses on rendering. 2. include filtering. For now lets make them one and factor out later
  return (
    <>
      <NewPlayerForm key="playerForm" teamLookup={teamLookup} />
      <h1>{mode}</h1>
      <main className={`${mode}Render`}>{players.map(makeCards)}</main>
    </>
  );
}

export default PuppyDisplay;
