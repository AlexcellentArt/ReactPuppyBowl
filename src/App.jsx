import { useState,useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Link, Route, Routes, BrowserRouter } from "react-router-dom";
import PuppyDisplay from "./components/PuppyDisplay";
import Home from "./components/Home";
import TeamDisplay from "./components/TeamDisplay";
import Navbar from "./components/Navbar";
import { fetchTeamLookup,fetchAllPlayers } from "./go-fetch";
function App() {
  const [count, setCount] = useState(0);
  const [teamLookup, setTeamLookup] = useState({});
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    async function fetchData()
    {
      setTeamLookup(await fetchTeamLookup())
      setPlayers(await fetchAllPlayers());
    }
    fetchData()
  }, []);
  return (
    <>
      {/* Okay lets divide the code up. 
    JSX:
    Form
    Tools
    Search
    Puppy Display: Name, Photo, Breed,
    Puppy Card: sole job is to render card data. I can have a function to call viewing that card in detail mode passed down to it by Puppy Display, with it being saved binded to that card's id.
    Puppy Nav Footer: Stretch Goal of saving old puppies and naving to them.
    JS Modules:
    FetchModule : I think the fetch functions from the last code can be safely isolated and broken off.
    RenderModule: I can likely isolate the render functions to either here or in Puppy Display. Then again, JSX more or less handles it live. So I might bve able to ditch entirely. Looking at it, renderAll can be the default card and the vars rerender themselves based on mode. That or bring in react-dom and render that way
    // okay new game plan. Make Teams a SPA 
    */}
    {/* <header><Navbar/></header> */}
      <BrowserRouter>
      <header><Navbar/></header>
        <Routes>
          <Route path="/" element={<Home/>} />
          {/* <Route path="/teams" element={<PuppyDisplay mode="teams" />} /> */}
          <Route path="players" element={<PuppyDisplay mode="multi" teamLookup={teamLookup}/>} players={players}/>
          <Route path="players/:id" element={<PuppyDisplay mode="single" teamLookup={teamLookup} players={players}/>} />
          <Route path="/teams" element={<TeamDisplay mode="multi" teamLookup={teamLookup}/>} players={players}/>
          <Route path="/teams/players/:id" element={<TeamDisplay mode="single" teamLookup={teamLookup} players={players}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
