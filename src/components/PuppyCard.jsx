import React, { useState, useEffect } from "react";

function PuppyCard(props) {
  const [data, setData] = useState(props.data);
  const [mode, setMode] = useState("group");
  return (
    <>
      <div class="clipCard">
        <h1 class="cardTitle">
          {mode === "single" ? "Name: " + puppy.name : puppy.name}
        </h1>
        <img src={data.imageUrl} alt="puppy.imageUrl" className="aspect" />
        <div className="infobox">
          <h2>{mode === "single" ? "Breed: " + data.breed : data.breed}</h2>
          <h3>{mode === "single" ? "Status: " + data.status : data.status}</h3>
          <p>
            {mode === "single"
              ? "Status: " + props.teams[data.teamId]
              : props.teams[data.teamId]}
          </p>
          <button>Delete Puppy</button>
          {mode === "single" ? <button onClick={()=> props.renderAll()}>Go Back</button>:<button onClick={()=> props.renderSingle(data)}>View Detail</button>}
        </div>
      </div>
    </>
  );
}

export default PuppyCard;
