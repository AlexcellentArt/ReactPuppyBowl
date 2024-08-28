import React, { useState } from "react";

function SearchBar(props) {
  const [hidden, setHidden] = useState(false);

  //   const [criteria, setCriteria] = useState("");
  //   console.log("Criteria: " +criteria)
  //   const filteredPlayers = criteria ? Search(props.players) : props.players;
  //   console.log("Filtered Players are ");
  //   console.log(filteredPlayers)
  function Search(players, criteria) {
    if (criteria === undefined || null || "") {
      props.setHasFilter(false);
      return props.players;
    }
    props.setHasFilter(true);
    props.setPlayers(
      players.filter((player) => player.name.toLowerCase().includes(criteria))
    );
    console.log("Players filtered to");
    console.log(players);
  }
  return (
    <label>
      <button onClick={()=>setHidden(!hidden)}>{hidden ? "Show":"Hide"} Search:</button>
      <div className={hidden ? "hidden searchBar":"searchBar"}>
        <input
          type="text"
          placeholder="search"
          onChange={(e) => {
            // setCriteria(e.target.value.toLowerCase());
            Search(props.players, e.target.value.toLowerCase());
          }}
        ></input>
      </div>
    </label>
  );
}

export default SearchBar;
