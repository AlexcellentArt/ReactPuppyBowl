import React, { useState, useEffect } from "react";
import {useParams,useNavigate,useLocation} from 'react-router-dom';
import {} from "../go-fetch";
function PuppyCard(props) {
    const [data, setData] = useState(props.data);
//   mode only needs to be one thing as they will be rerendered anyway
    const [mode, setMode] = useState(props.mode);
//   const mode = props.mode;
//   const data = props.data;
  const nv = useNavigate();
  const location = useLocation()
  return (
      <div className="clipCard">
        <h1 className="cardTitle">
          {mode === "single" ? "Name: " + data.name : data.name}
        </h1>
        <img src={data.imageUrl} alt="data.imageUrl" className="aspect" />
        <div className="infobox">
          <h2>{mode === "single" ? "Breed: " + data.breed : data.breed}</h2>
          <h3>{mode === "single" ? "Status: " + data.status : data.status}</h3>
          <p>
            {mode === "single"
              ? "Status: " + props.teamLookup[data.teamId]
              : props.teamLookup[data.teamId]}
          </p>
          <button>Delete Puppy</button>
          {mode === "single" ? (
            <button onClick={() => {nv("../players"); nv(0)}}>Go Back</button>
          ) : (
            <button onClick={() => {nv("/players/"+data.id); nv(0)} }>
              View Detail
            </button>
          )}
        </div>
      </div>
  );
}

export default PuppyCard;
