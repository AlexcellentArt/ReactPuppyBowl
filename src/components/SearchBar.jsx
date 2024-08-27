import React, { useState } from "react";

function SearchBar(props) {
//   const [criteria, setCriteria] = useState("");
//   console.log("Criteria: " +criteria)
//   const filteredPlayers = criteria ? Search(props.players) : props.players;
//   console.log("Filtered Players are ");
//   console.log(filteredPlayers)
  function Search(players,criteria) {
    if (criteria === undefined || null || "")
    {
        return props.players
    }
    
    props.setPlayers(players.filter((player) => player.name.toLowerCase().includes(criteria)));
    console.log("Players filtered to")
    console.log(players)
  }
  return (
    <div>
      <label>
        Search:{" "}
        <input
          type="text"
          placeholder="search"
          onChange={(e) => {
            // setCriteria(e.target.value.toLowerCase());
            Search(props.players,e.target.value.toLowerCase());
          }}
        ></input>
      </label>{" "}
    </div>
  );
}

export default SearchBar;
