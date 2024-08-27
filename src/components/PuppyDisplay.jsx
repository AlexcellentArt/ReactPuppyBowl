import { useParams, useNavigate } from "react-router-dom";
import * as GoFetch from "../go-fetch.js";
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
  useEffect(async () => {
    // clear players first, just in case.
    console.log("PLAYERS BEFORE:");
    console.table(players);
    players.clear();
    await handleSetup()
    console.log("PLAYERS AFTER:");
    console.table(players);
  }, []);
  async function handleSetup(){
    switch (mode) {
        case "team":
            // lookup does not need to be set as it's likely only one team will be displayed at a time
            setTeams(await GoFetch.fetchTeams());
            break;
        case "single":
            setPlayers(await GoFetch.fetchSinglePlayer(params.id));

        case "multi":
            setPlayers(await GoFetch.fetchAllPlayers())
        default:
            // both single and multi fall to here and get team lookup so it can be passed down and have cards handle parsing what name their id is without making a massive amount of fetch calls.

            setTeamLookup(await GoFetch.fetchTeamLookup());
            break;
    }
  }
  function makeCards(data) {
    // const cards = [];
    return <PuppyCard data={data} mode={mode} teamLookup={teamLookup}></PuppyCard>;
  }
  // by having the className just be the mode name with render on it, I can have multiple views completely handled by one mode input.
  // two ways I can approach. 1. Only focuses on rendering. 2. include filtering. For now lets make them one and factor out later
  return (
    <>
      <div className={`${mode}Render`}>{players.map(makeCards)}</div>
    </>
  );
}

export default PuppyDisplay;
