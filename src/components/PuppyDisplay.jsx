import { useParams, useNavigate, json } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
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
  const [hidden, setHidden] = useState(false);

  const [mode, setDisplayMode] = useState(props.mode);
  const [hasFilter, updateFilter] = useState(false);
  const [players, setPlayers] = useState([]);
  const [playersFiltered, setPlayersFiltered] = useState([]);
  // const [teams, setTeams] = useState("teamArray" in props ? props.teams : []);
  const [filterTeams, setFilterTeams] = useState([]);
  const [teamLookup, setTeamLookup] = useState(props.teamLookup);
  //   const teamLookup = {};
  const params = useParams();
  // if (props.mode === "single")
  // {
  //     let userId = useParams()
  // }
  useEffect(() => {
    console.log("DISPLAY MODE IS: " + mode);
    // clear players first, just in case.
    console.log("PLAYERS BEFORE:");
    console.table(players);
    if (mode !== "teams") {
      GoFetch.fetchTeamLookup().then((json) => {
        setTeamLookup(json);
        console.log("TEAM LOOKUP IS ");
        console.table(teamLookup);
      });
    }
    if (mode === "single") {
      GoFetch.fetchSinglePlayer(params.id).then((json) => {
        setPlayers([json]);
        setPlayersFiltered([json]);
      });
    } else if (mode === "multi") {
      GoFetch.fetchAllPlayers().then((json) => {
        setPlayers(json);
        setPlayersFiltered(json);
      });
    }
  }, [mode, params]);

  function makeCards(data) {
    // // const cards = [];
    // if (mode === "list")
    return (
      <PuppyCard
        key={data.id}
        data={data}
        mode={mode}
        teamLookup={teamLookup}
        setMode={setDisplayMode}
        triggerRefetch={refetch}
      ></PuppyCard>
    );
  }
  // function showFiltered() {
  //   if (filterTeams.length && playersFiltered.length === 0) {
  //     return <h3>No Players Found</h3>;
  //   }
  //   // team filtering is handled right here, with name searches coming first as they cull the filter list the most.
  //   if (filterTeams.length > 0)
  //   {
  //     console.log(players.filter((player) => filterTeams.includes(player.teamId)))
  //     const teamFiltered = playersFiltered.filter((player) => filterTeams.includes(player.teamId))
  //     console.log(teamFiltered)

  //   }
  //   return playersFiltered.map(makeCards);
  // }
  function outputDisplay() {
    if (hasFilter === false) {
      return players.map(makeCards);
    } else if (playersFiltered.length === 0 && filterTeams.length === 0) {
      return <div><h3>No Players Found</h3></div>;
    }
    // team filtering is handled right here, with name searches coming first as they cull the filter list the most.
    if (filterTeams.length > 0) {
      console.log(
        players.filter((player) => filterTeams.includes(player.teamId))
      );
      const teamFiltered = playersFiltered.filter(
        (player) => filterTeams.includes(`${player.teamId}`) === true
      );
      console.log(teamFiltered);
      // playersFiltered is not set to prevent a rerender loop
      return teamFiltered.map(makeCards);
    }
    return playersFiltered.map(makeCards);
  }
  async function refetch() {
    if (mode !== "single") {
      GoFetch.fetchAllPlayers().then((json) => {
        setPlayers(json);
      });
    } else if (mode === "teams") {
      GoFetch.fetchAllPlayers().then((json) => {
        setPlayers(json);
      });
    }
  }
  function makeTeamFilters() {
    return Object.keys(teamLookup).map((key) => {
      const teamName = teamLookup[key];
      return (
        <button
        className={filterTeams.includes(key) && "toggled"}
          key={key + "Filter"}
          value={key}
          onClick={() => {
            toggleTeamFilter(key);
          }}
        >
          {GoFetch.capitalize(teamName)}
        </button>
      );
    });
  }
  function toggleTeamFilter(id) {
    console.log(id);
    console.log(filterTeams);
    const idx = filterTeams.findIndex((i) => i === id);
    console.log(filterTeams.concat(id));
    if (idx === -1) {
      // const comb = filterTeams.push(id);
      // console.log(comb)
      setFilterTeams(filterTeams.concat(id));
    } else {
      setFilterTeams(filterTeams.toSpliced(idx, 1));
    }
    console.log("Filter Teams Updated");
    console.log(filterTeams);
    updateFilter(true);
  }
  // function updatePlayers(context,data){
  //   switch (context) {
  //     case "refetch":
  //       GoFetch.fetchAllPlayers().then((json) => {
  //         setPlayers(json);
  //         setPlayersFiltered(json));
  //       break;
  //       case "addToLocal":
  //         {}
  //     default:
  //       break;
  //   }

  // }
  // by having the className just be the mode name with render on it, I can have multiple views completely handled by one mode input.
  // two ways I can approach. 1. Only focuses on rendering. 2. include filtering. For now lets make them one and factor out later
  return (
    <body>
      {mode !== "single" && (
        <NewPlayerForm
          key="playerForm"
          teamLookup={teamLookup}
          refetch={refetch}
        />
      )}
      <div className="tools">
        {mode !== "single" ? (
          <>
            <SearchBar
              players={players}
              setPlayers={setPlayersFiltered}
              setHasFilter={updateFilter}
            ></SearchBar>
            <label>
              <button onClick={()=>setHidden(!hidden)}>{hidden ? "Show":"Hide"} Filter By Team:</button>
              <div className={hidden ? "hidden teamFilters":"teamFilters"}>{makeTeamFilters()}</div>
            </label>
          </>
        ) : (
          <h1 className="tools">Details</h1>
        )}
      </div>
      <main className={`${mode}Render`}>{outputDisplay()}</main>
    </body>
  );
}

export default PuppyDisplay;
