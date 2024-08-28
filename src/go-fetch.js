// export as namespace GoFetch;
const cohortName = "2407-FTB-ET-WEB-FT";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;
// might rework into hooks later
/**
 * Fetches all players from the API.
 * @returns {Object[]} the array of player objects
 */
const fetchAllPlayers = async () => {
  try {
    const response = await fetch(API_URL + "/players");
    if (!response.ok)
      {
        throw new Error(response.statusText)
      }
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
    if (!response.ok)
      {
        throw new Error(response.statusText)
      }
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
    if (!response.ok)
      {
        throw new Error(response.statusText)
      }
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
    const response = await fetch(`${API_URL}/players/${playerId}`, {
      method: "DELETE",
    });
    console.log(response.status);
    if (!response.ok)
      {
        throw new Error(response.statusText)
      }
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
  }
};

/**
 * fetches teams.
 * @returns {Object}
*/
const fetchTeams = async () => {
  try {
    const response = await fetch(
      `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/teams`
    );
    console.log(response);
    if (!response.ok)
      {
        throw new Error(response.statusText)
      }
    const json = await response.json();
    return json.data.teams;
  } catch (error) {
    console.error("Error Fetching Teams!",error);
    return {}
  }
};
/**
 * Fetches teams then creates and returns a lookup object in the format of {id:name,}. If you are not engaging with teams beyond rendering the name in the relevant header, then use this over teams.
 * @returns {Object}
*/
const fetchTeamLookup = async () => {
  const teamLookup = {null:"Lone Pups"}
  try {
    const response = await fetch(
      `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/teams`
    );
    console.log(response);
    if (!response.ok)
      {
        throw new Error(response.statusText)
      }
    const json = await response.json();
    console.log(json)
    json.data.teams.forEach((team) => {
      teamLookup[team.id] = team.name;
    });
    console.log("TEAM LOOKUP MADE")
    console.table(teamLookup)
    
  } catch (error) {
    console.error("TeamLookup Failed to be made.", error);
  }
  return teamLookup
};
const verifyImageExists = async (url) =>
{
  try {
    const response =  await fetch(url, { method: "HEAD" });
    if (response.type.startsWith("image/")) {
      console.log("URL EXISTS: "+url)
    }
    if (!response.ok)
    {
      throw new Error(response.statusText)
    }
  } catch (error) {
    console.error("URL does not exist!",error);
    return false
  }
  return true
}
const capitalize = (input) => {
  return input.charAt(0).toUpperCase() + input.substring(1)
}
if (typeof window === "undefined") {
  module.exports = {fetchSinglePlayer,fetchAllPlayers,fetchTeams,fetchTeamLookup,addNewPlayer,removePlayer,capitalize,verifyImageExists}
}
export {fetchSinglePlayer,fetchAllPlayers,fetchTeams,fetchTeamLookup,addNewPlayer,removePlayer,capitalize,verifyImageExists}
export default fetchAllPlayers