const cohortName = "2407-FTB-ET-WEB-FT";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;
const puppyHolder = document.querySelector("main");
const state = {
  teams:{null:"Lone Pup"}
}

/**
 * Fetches all players from the API.
 * @returns {Object[]} the array of player objects
 */
const fetchAllPlayers = async () => {
  try {
    const response = await fetch(API_URL + "/players");
    const json = await response.json();
    console.log(json.data.players);
    return json.data.players;
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
    return {}
  }
};

/**
 * Fetches a single player from the API.
 * @param {number} playerId
 * @returns {Object} the player object
 */
const fetchSinglePlayer = async (playerId) => {
  try {
    // TODO
    console.log("FETCHING SINGLE ID: " + playerId);
    const response = await fetch(`${API_URL}/players/${playerId}`);
    const json = await response.json();
    console.log(json);
    return json.data.player;
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
    return {}
  }
};

/**
 * Adds a new player to the roster via the API.
 * @param {Object} playerObj the player to add
 * @returns {Object} the player returned by the API
 */
const addNewPlayer = async (playerObj) => {
  try {
    console.log("TRYING TO ADD NEW PLAYER");
    console.log(JSON.stringify(playerObj));
    const response = await fetch(API_URL + "/players", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(playerObj),
    });
    const json = await response.json();
    console.log(json);
    return json;
  } catch (err) {
    console.error("Oops, something went wrong with adding that player!", err);
    return null;
  }
};

/**
 * Removes a player from the roster via the API.
 * @param {number} playerId the ID of the player to remove
 */
const removePlayer = async (playerId) => {
  try {
    // TODO
    const response = await fetch(`${API_URL}/players/${playerId}`, {
      method: "DELETE",
    });
    console.log(response.status);
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
  }
};
/**
 *  Updates local state of what teams there are.
 * */
const updateTeams = async () =>{
    //get teams
    teams = await fetchTeams();
    teams.forEach(obj => state.teams[obj.id] = obj.name)
    console.log("Teams Updated")
    console.table(teams)
    console.table(state)
}
/**
 * fetches teams
*/
const fetchTeams = async () => {
  try {
    const response = await fetch(
      `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/teams`
    );
    console.log(response);
    const json = await response.json();
    return json.data.teams;
  } catch (error) {
    console.error(error);
    return {}
  }
};

export {fetchSinglePlayer,fetchAllPlayers,fetchTeams,addNewPlayer,removePlayer}