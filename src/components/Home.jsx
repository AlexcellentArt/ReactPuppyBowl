import React, { useInsertionEffect } from "react";
import {useParams,useNavigate } from 'react-router-dom';

function Home() {
    const nv = useNavigate()
  return (
    <>
      <div className="home">
        <h1>Welcome To Puppy Bowl</h1>
        <div className="buttonBox">
        <button onClick={(()=>{window.alert("Sorry, We're sold out!")})}>Order Tickets</button>
        <button onClick={()=>{nv("/teams")}}>View Teams</button>
        <button onClick={()=>{nv("/players")}}>View Players</button>
        {/* If they don't go over it soon, then figure out loaders and add one in below. */}
        <button onClick={(()=>{window.alert("Sorry, the puppies ate this functionality!")})}>View Random Player</button>
        </div>
      </div>
    </>
  );
}

export default Home;
