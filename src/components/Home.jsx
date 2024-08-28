import React, { useInsertionEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Home() {
  const nv = useNavigate();
  function notImplimentedJoke() {
    window.alert("Sorry, the puppies ate this functionality!");
  }
  return (
    <>
      <div className="tools">
        <div className="home cardTitle">
          <h1>Welcome To Puppy Bowl</h1>
          <img></img>
          <div className="buttonBox infoBox">
            <button
              onClick={() => {
                window.alert("Sorry, We're sold out!");
              }}
            >
              Order Tickets
            </button>
            {/* <button onClick={()=>{nv("/teams")}}>View Teams</button> */}
            <button
              onClick={() => {
                nv("/players");
              }}
            >
              View Players
            </button>
            {/* If they don't go over it soon, then figure out loaders and add one in below. */}
            <button onClick={notImplimentedJoke}>View Random Player</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
