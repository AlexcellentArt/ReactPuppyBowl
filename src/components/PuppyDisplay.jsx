import { useParams, useNavigate, json } from "react-router-dom";
import React, { useState, useEffect } from "react";
import * as GoFetch from "../go-fetch.js";
import NewPlayerForm from "./NewPlayerForm.jsx";
import SearchBar from "./SearchBar.jsx";
// import { fetchTeamLookup } from "../go-fetch.js";
// let GoFetch = require('../go-fetch.js').default;
// GoFetch from "../go-fetch.js";
import PuppyCard from "./PuppyCard";
function PuppyDisplay(props) {
  // mode can be isolated to here I think because its not relevant to other stuff. Sans maybe search.
  // I could just have it able to tell by the amount of data though. If there is only one dog, then it's obviously detail mode.
  // still, might as well play it safe and keep it mode. Would be easy to dummy out later if needed

  const [mode, setDisplayMode] = useState(props.mode);
  const [players, setPlayers] = useState([]);
  const [playersFiltered, setPlayersFiltered] = useState([]);
  const [teams, setTeams] = useState([]);
  const [teamLookup, setTeamLookup] = useState(props.teamLookup);
  //   const teamLookup = {};
  const params = useParams();
  // if (props.mode === "single")
  // {
  //     let userId = useParams()
  // }
  useEffect(() => {
    console.log("DISPLAY MODE IS: "+mode)
    // clear players first, just in case.
    console.log("PLAYERS BEFORE:");
    console.table(players);
    // setMode(props.mode);
    // players.clear();
    // async function handleSetup() {
    //   if (mode !== "team") {
    //     setTeams(await GoFetch.fetchTeams());
    //   } else {
    //     setTeamLookup(await GoFetch.fetchTeamLookup());
    //   }
    //   if (mode === "single") {
    //     // const singlePlayer = await GoFetch.fetchSinglePlayer(params.id);
    //     setPlayersFiltered([await GoFetch.fetchSinglePlayer(params.id)]);
    //     console.log("PARAM ID IS : " + params.id);
    //   } else if (mode === "multi") {
    //     await GoFetch.fetchAllPlayers().then((res) => {
    //       setPlayers(res);
    //       setPlayersFiltered(res);
    //     });
    //   }
    //   console.log("PLAYERS AFTER:");
    //   console.table(players);
    //   // if (Array.isArray(players) === false) {
    //   //   console.log("NOT ARRAY");
    //   //   setPlayers([]);
    //   // }
    //   console.log("PLAYERS FILTERED");
    //   console.log("RELOADED");
    // }
    // handleSetup();
    if (mode !== "team") {
      GoFetch.fetchTeams().then((json)=> setTeams());
    } 
    GoFetch.fetchTeamLookup().then((json)=>{setTeamLookup(json); console.log("TEAM LOOKUP IS ");console.table(teamLookup);})
    if (mode === "single") {
      GoFetch.fetchSinglePlayer(params.id).then((json)=>{setPlayers([json]); setPlayersFiltered([json]);})
    } else if (mode === "multi") {
      GoFetch.fetchAllPlayers().then((json)=>{setPlayers(json); setPlayersFiltered(json);});
    }
  }, [mode,params]);

  function convertArrayOfObjsToP(arr) {
    return arr.map((obj) => {
      return <p>{JSON.stringify(obj)}</p>;
    });
  }
  function makeCards(data) {
    // const cards = [];
    return (
      <PuppyCard
        key={data.id}
        data={data}
        mode={mode}
        teamLookup={teamLookup}
        setMode={setDisplayMode}
      ></PuppyCard>
    );
  }
  function determineMainContent() {
    let content = null;
    if (mode !== "single") {
      mode !== "single"
        ? (content = playersFiltered.map(makeCards))
        : (content = players.map(makeCards));
    }
    if (content.length < 0) {
      content = (
        <div>
          <h3>No Players Found</h3>
        </div>
      );
    }
    return content;
  }
  // by having the className just be the mode name with render on it, I can have multiple views completely handled by one mode input.
  // two ways I can approach. 1. Only focuses on rendering. 2. include filtering. For now lets make them one and factor out later
  return (
    <>
      <body>
        {mode !== "single" && (
          <NewPlayerForm key="playerForm" teamLookup={teamLookup} />
        )}
        <h1 className="tools">{mode}</h1>
        {mode !== "single" ? (
          <SearchBar
            players={players}
            setPlayers={setPlayersFiltered}
          ></SearchBar>
        ) : (
          <h1 className="tools">Details</h1>
        )}

        {/* <main className={`${mode}Render`}>
          {playersFiltered.length === 0 ? (
            playersFiltered.map(makeCards)
          ) : (
            <h3>No Players Found</h3>
          )}
        </main> */}
        {playersFiltered.length === 0 ? (
          <main>
            <h3>No Players Found</h3>
          </main>
        ) : (
          <main className={`${mode}Render`}>
            {players.map(makeCards)}
          </main>
        )}
      </body>
    </>
  );
}

export default PuppyDisplay;
