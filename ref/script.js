// Use the API_URL variable to make fetch requests to the API.
// Replace the placeholder with your cohort name (ex: 2109-UNF-HY-WEB-PT)
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
    //clean form
    // for (i in inputs) {
    //   inputs[i].value = "";
    // }
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
 * Updates `<main>` to display a list of all players.
 *
 * If there are no players, a corresponding message is displayed instead.
 *
 * Each player is displayed in a card with the following information:
 * - name
 * - id
 * - image (with alt text of the player's name)
 *
 * Additionally, each card has two buttons:
 * - "See details" button that, when clicked, calls `renderSinglePlayer` to
 *    display more information about the player
 * - "Remove from roster" button that, when clicked, will call `removePlayer` to
 *    remove that specific player and then re-render all players
 *
 * Note: this function should replace the current contents of `<main>`, not append to it.
 * @param {Object[]} playerList - an array of player objects
 */
const renderAllPlayers = (playerList) => {
  // TODO
  console.log(playerList);
  if ( playerList == null || !playerList.length) {
    puppyHolder.innerHTML =
      /*html*/
      `<li>No Puppies Found</li>`;
    return;
  }
  console.log("puppies found");
  console.table(playerList);
  const puppiesUI = playerList.map((puppy) => {
    //make and fill out ui
    console.log(puppy)
    const ui = makeCardUI(puppy)

    // make view button
    const viewButton = document.createElement("button");
    viewButton.textContent = "View Puppy";
    ui.querySelector(".clipCard").append(viewButton);
    viewButton.addEventListener("click", () => renderSinglePlayer(puppy));

    return ui;
  });
  console.log(puppyHolder)
  puppyHolder.replaceChildren(...puppiesUI);
  puppyHolder.classList.add("multiRender")
  puppyHolder.classList.remove("singleRender")
  console.log("PUPPIES RENDERED");
};

/**
 * Updates `<main>` to display a single player.
 * The player is displayed in a card with the following information:
 * - name
 * - id
 * - breed
 * - image (with alt text of the player's name)
 * - team name, if the player has one, or "Unassigned"
 *
 * The card also contains a "Back to all players" button that, when clicked,
 * will call `renderAllPlayers` to re-render the full list of players.
 * @param {Object} player an object representing a single player
 */
const renderSinglePlayer = (player) => {
  // TODO
  console.log("RENDERING SINGLE PLAYER")
  console.log(player);
  player.name = "Name: " + player.name;
  player.breed = "Breed: " + player.breed;
  player.status = "Status: " + player.status;
  const ui = makeCardUI(player);
  const p = ui.querySelector("p")
  // Team is held off on being assigned until after, so as to not mess with translating ids to team names
  p.textContent = "Team: "+ p.textContent
  // make back button
  const backButton = document.createElement("button");
  backButton.textContent = "Go Back";
  // backButton.classList.add("infobox")
  ui.querySelector(".clipCard").append(backButton);
  backButton.addEventListener("click", () => rerender());
  puppyHolder.replaceChildren(ui);
  // apply and remove appropriate classes
  puppyHolder.classList.remove("multiRender")
  puppyHolder.classList.add("singleRender")
  console.log("PUPPIES RENDERED");
};

/**
 * Fills in `<form id="new-player-form">` with the appropriate inputs and a submit button.
 * When the form is submitted, it should call `addNewPlayer`, fetch all players,
 * and then render all players to the DOM.
 */
const renderNewPlayerForm = () => {
  try {
    // TODO
    // add in the teams from fetch teams

    const form = document.querySelector("#new-player-form");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      console.log("TEAM VALUE: " + event.target.team.value)
      const newPlayer = {
        name: event.target.name.value.trim(),
        breed: event.target.breed.value.trim(),
        status: event.target.status.value.trim(),
        teamId: event.target.team.value.trim(),
        imageUrl: event.target.img.value.trim(),
      };
      console.log(newPlayer);
      console.log("ADDDING")
      // const val = validatePlayer(newPlayer)
      // console.log(val)
      // // if (val.general != true){
      // // console.log("NU:::::")
      // // return null
      // // }
      const added = await addNewPlayer(newPlayer);
      console.log(added)
      console.log("ADDDED")
      if (added != null){
        console.log("CLEARING");
        event.target.name.value = "";
        event.target.breed.value = "";
        event.target.status.value  = "";
        event.target.team.value  = "";
        event.target.img.value = "";
      }
      console.log("TRYING TO RERENEDER");
      rerender()
    });

    //submit button made; it will be used as the lodestone for placement of other elements
    const submit = document.createElement("input");
    submit.type = "submit";
    submit.value = "Submit";
    // name, breed, status, team, img
    form.append(submit);
    // make img input
    const imgInput = document.createElement("input");
    imgInput.type = "img";
    imgInput.name = "img";
    imgInput.id = "img";
    imgInput.addEventListener("change", (event) => showImg(event));
    form.insertBefore(imgInput, submit);

    // make img preview
    const imgPreview = document.createElement("img");
    imgPreview.id = "previewImg";
    imgPreview.alt = "aaaa";

    
    createLabel("img", "Image");
    // make name and breed inputs
    createTextInput("name", "Name");
    createTextInput("breed", "Breed");
    // make team and status selection inputs
    createSelectionForm();
    imgPreview.style.display = "none";
    const tools = document.createElement("div");
    tools.classList.add("tools")
    const previewDiv = document.createElement("div")
    tools.append(previewDiv)
    // make IMG preview toggle
    const previewButton = document.createElement("button");
    previewDiv.append(previewButton);
    previewDiv.append(imgPreview);
    previewButton.textContent = "Show Image Preview";
    form.after(tools)
    previewButton.addEventListener("click", (event) => {
      toggleHideShow(event,imgPreview,"Image Preview")
    });
  } catch (err) {
    console.error("Uh oh, trouble rendering the new player form!", err);
  }
};

/**
 * Initializes the app by fetching all players and rendering them to the DOM.
 */
const init = async () => {
  const players = await fetchAllPlayers();
  await updateTeams();
  renderAllPlayers(players);
  renderNewPlayerForm();
};
//
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
/**
 *Makes a new text input and label element for it.
* @param {string} text what the text input's label's textContent should be set to.
*/
const createTextInput = (name, label) => {
  const input = document.createElement("input");
  input.type = "text";
  input.name = name;
  input.id = name;
  document
    .querySelector("#new-player-form")
    .insertBefore(input, document.querySelector('input[type="submit"]'));
  createLabel(name, label);
};
/**
 * Makes the selection form. This had to be factored out to it's own function because of await fetch needing to be async.
 * */
const createSelectionForm = async () => {
  // create selects
  createSelect(
    [
      { status: "bench", name: "Bench" },
      { status: "field", name: "Field" },
    ],
    "name",
    "status",
    "status"
  );
  createSelect(await fetchTeams(), "name", "id", "team");
  // create labels
  createLabel("team", "Team");
  createLabel("status", "Status");
};
/**
 *Makes a new label element, setting for equal to forWhat and textContent equal to text. The label is then inserted into the element with an id of new-player-form before the element inside the form with an id that matches forWhat.

 Elements should be created before using this to make labels because of this, but the labels can be freely created at any point after safely.
* @param {string} forWhat id of the element you want for set to and the label inserted before.
* @param {string} text what the label's textContent should be set to.
*/
const createLabel = (forWhat, text) => {
  const label = document.createElement("label");
  label.for = forWhat;
  label.textContent = text + ": ";
  document
    .querySelector("#new-player-form")
    .insertBefore(label, document.querySelector("#" + forWhat));
  console.log("LABEL MADE FOR: " + label.for);
};
/**
 *Makes a new select element and options for it from looping through optionsObjArray, calling the textKey and valueKey on each one to create options. If an id is assigned, it is set as the ID for the select.
* @param {Object} optionsObjArray array of objects you want to use as the source for the text and values for the options.
* @param {string} textKey what key you want the text to be drawn from.
* @param {string} valueKey what key you want the value to be drawn from.
* @param {string} valueKey what you want the new select ID to be set as.
*@returns {select} a new select DOM element with the generated options inside it.
*/
const createSelect = async (optionsObjArray, textKey, valueKey, id = "") => {
  const select = document.createElement("select");
  // const select = document.querySelector(id);

  console.log("Keys found: " + Object.keys(optionsObjArray));
  Object.keys(optionsObjArray).forEach((key) => {
    key = optionsObjArray[key];
    console.log(key);
    const op = document.createElement("option");
    op.text = key[textKey];
    op.value = key[valueKey];
    select.appendChild(op);
  });
  select.id = id;
  select.name = id;
  document
    .querySelector("#new-player-form")
    .insertBefore(select, document.querySelector('input[type="submit"]'));
};
/**
 *takes an event and gets the value from it, assuming it's an img path. It sets an element on the page with the id previewImg's src and alt equal to that value
* @param {Event} event
*/
const showImg = (event) => {
  console.log("CHANGING IMG");
  const img = event.target.value;
  const preview = document.querySelector("#previewImg");
  preview.src = img;
  preview.alt = img;
  // console.log("CHANGED IMG");
  preview.style.width = "50%"
};
/**
 *takes an object with name, breed, status, and team as keys and uses values to fill out card. teamId cannnot be safely modified before this function, so make any text changes after.
* @param {Object} matchObj
*@returns {Object} returns a div with the generic card ui inside it
*/
const makeCardUI = (puppy) => {
  // form.append(makeCardUI())
  const ui = document.createElement("div");
  ui.innerHTML = /*html*/ `
  <div class = "clipCard"><h1 class= "cardTitle">${puppy.name}</h1>
  <img src=${puppy.imageUrl} alt="puppy.imageUrl" class = "aspect"></>
  <div class = "infobox">
  <h2>${puppy.breed}</h2>
  <h3>${puppy.status}</h3>
  <p>${state.teams[puppy.teamId]}</p>
  </div></div>
  `;
  // make delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete Puppy";
  deleteButton.classList.add("delete");
  ui.querySelector(".clipCard").append(deleteButton);
  deleteButton.addEventListener("click", async () => {await removePlayer(puppy.id);rerender();});
  return ui;
};
/**
 *rerenders the UI to show all players.
*/
const rerender = async () =>
{
  const players = await fetchAllPlayers();
  renderAllPlayers(players);
}
/**
 *takes an object with name, breed, status, and team as keys and uses values to search
* @param {Object} matchObj
*/
const findByKey = async (matchObj) => {
  // get all players
  let players = await fetchAllPlayers()
  // for each key in match obj, loop through and filter from players non matches
  Object(matchObj).keys.forEach(key => players = players.filter(player => player[key] === matchObj[key]))
  return players
}
/**
 *takes an object with name, breed, status, and team as keys and checks if values are blank.
* @param {Object} matchObj
@returns {{general:Boolean,specific:Object}} general is a general validity evaluation while specific is an object with all the keys input as keys and their values as true or false depending on if they failed validation or not.
*/
const validatePlayer = (newPlayer) => {
  const evalObj = {};
  Object.keys(newPlayer).forEach((key) => {
    if (newPlayer[key] === "") {
      console.error(key + " is BLANK.");
      evalObj[key] = false;
    }
    else{
    evalObj[key] = true;
    }
  });
  return evalObj
}
/**
 *Makes a button when clicked hide whatever was input into hide/show itself as well as change the buttons text to read Hide or Show respectively with the subtext added on.
* @param {Object} event click event used to change textContent of button
* @param {string} hide what DOM element to hide/show
* @param {string} subtext what text should be appended to Hide and Show
*@returns {select} a new select DOM element with the generated options inside it.
*/
const toggleHideShow = (event,hide,subtext="") => {
  if (hide.style.display === "none") {
    hide.style.display = "block";
    event.target.textContent = "Hide " +subtext;
  } else {
    hide.style.display = "none";
    event.target.textContent = "Show " +subtext;
  }
}
// const fs = fetch('JSONFilePath').then().then().catch();

// const readObj = async(fileName="puppies") => {
//   // fs.readFile(`${fileName}.json`, (error, data) => {
//   //   if (error) {
//   //     console.error(error);
//   //     throw err;
//   //   }
//   //   const read = JSON.parse(data);
//   //   console.log(read);
//   //   return read
//   // });
//   const data = fetch('JSONFilePath').then().then().catch;
//   const read = JSON.parse(data);
//   console.log(read);
//   return read
// }
// // This is to keep track of puppies via logging them. That way I can compare to the live list and figure out what's missing and have a dead page for them.
// const writeObj = async (obj,fileName="puppies") => {
//   const data = JSON.stringify(obj);
//   try {
//     fs.writeFileSync(`${fileName}.json`, data);
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }
// const checkPlayersForPuppy = (puppy,players) => {
//   players.
// }
// const updatePuppiesJSON = async(data) =>{
//   const players = data.players;
//   const oldPuppyData = readObj();
//   // const newPuppies = [];
//   // const newlyMissingPuppies = [];
//   const oldAliveIDs = [];
//   const currentIDs = [];
//   // for ease of comparison, compile IDs of players and old puppies
//   oldPuppyData.alive.forEach(puppy => { oldAliveIDs.push(puppy.id)});
//   players.forEach(puppy => { currentIDs.push(puppy.id)});
//   // create new live puppy data
//   const localLivePuppyData = {"alive":players, "missing":oldPuppyData.missing}
//   // current players has new puppy list
//   // old alive has old list
//   // if I check what old alive do not exist in current, then I can move them to missing.
//   // currentIDs.forEach(id => {if (oldAliveIDs.includes(id)? lo)});
//   // includes returns true if found, so just flip the result with a ! to reverse the filter criteria and get it outputting the opposite array essentially.
//   const missingIDs = oldAliveIDs.filter(id => !currentIDs.includes(id))
//   // move missing puppies from old alive puppies to missing
//   oldPuppyData.alive.forEach(puppy =>
//   {
//     // missingIDs.includes(puppy.id) ? localLivePuppyData.missing.push(puppy) : localLivePuppyData.alive.push(puppy);
//     if (missingIDs.includes(puppy.id))
//     {
//       localLivePuppyData.missing.push(puppy)
//     }
//     // else
//     // {

//     // }
//   });
//   // log then overwrite
//   writeObj(localLivePuppyData)
//   livePuppyData = localLivePuppyData;
//   return localLivePuppyData
// }
// // const missingPuppies = []
// const livePuppyData = {alive:[], missing:[]}
// This script will be run using Node when testing, so here we're doing a quick
// check to see if we're in Node or the browser, and exporting the functions
// we want to test if we're in Node.
if (typeof window === "undefined") {
  module.exports = {
    fetchAllPlayers,
    fetchSinglePlayer,
    addNewPlayer,
    removePlayer,
    renderAllPlayers,
    renderSinglePlayer,
    renderNewPlayerForm,
    updateTeams
    // updatePuppiesJSON,
    // writeObj,
    // readObj
  };
} else {
  init();
}

// // make file if it doesn't exist already
// if (fs.existsSync("puppies.json") === false){
//   writeObj(livePuppyData)
// }
