import React from "react";
import { useEffect } from "react";
import fetchTeams from "../go-fetch.js"
import PuppyDisplay from "./PuppyDisplay.jsx";
function TeamDisplay(props) {
    const [teams, setTeams] = useState([]);
    useEffect(() => {
        fetchTeams().then((json) => {
            setTeams(json)})
    }, []);
    function makeTeamFilterButtons()
    {
        
    }
    return (<><div><PuppyDisplay teamLookup={props.teamLookup} players={props.players}></PuppyDisplay></div></>);
}

export default TeamDisplay;