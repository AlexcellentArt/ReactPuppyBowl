import React, { useState, useRef } from "react";
import { addNewPlayer, capitalize } from "../go-fetch";
import PlayerInput from "./PlayerInput";
function NewPlayerForm(props) {
  // form data i might refactor to ref later
  const [formData, setFormData] = useState({});
  const [validationData, setValidationData] = useState({});
  const [allValid, setAllValid] = useState(true);
  const [error, setError] = useState();
  const [isFirstTry, setIsFirstTry] = useState(true);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {};
    const validation = {};

    // have made key and value const for easier readability
    const key = 0;
    const value = 1;
    let allDataValid = true;
    // trim form data via iterable and confirm its validity while also setting the value to empty
    for (const entry of new FormData(e.target).entries()) {
      // key = value
      data[(entry[key] = entry[value].trim())];
      console.log(e.target[entry[key]]);
      // verify input
      const isValid = await verifyInput(
        e.target[entry[key]].type,
        entry[value]
      );
      validation[entry[key]] = isValid;
      if (isValid === false) {
        allDataValid = false;
      }
    }
    // update states
    setFormData(data);
    setValidationData(validation);
    setAllValid(allDataValid);
    if ((isFirstTry = true)) {
      setIsFirstTry(false);
    }
    // check if allValid. if not, then throw error. Else, add new player
    try {
      if (!allValid) {
        throw Error("Fields are blank.");
      }
      // try and add new player
      const res = await addNewPlayer(formData);
      if (res === null) {
        throw new Error("Error on server side.");
      }
    } catch (error) {
      setError(error.message);
    }
  }
  async function verifyInput(key, inputVal) {
    let res = false;
    switch (key) {
      case "text":
        if (inputVal.split().length > 0) {
          res = true;
        }
        break;

      case "img": {
        // checking the content-type header
        fetched = await fetch(inputVal, { method: "HEAD" });
        if (fetched.type.startsWith("image/")) {
          res = true;
        }
        break;
      }
      default:
        res = true;
        break;
    }
    console.log(`${key}'s validity is: ${res}`);
    return res;
  }
  function createInputClassName(base = "") {
    if (isFirstTry || !validationData[key] === true) {
      return "";
    } else {
      return "invalid";
    }
  }
  function makeInput(type, key, label = "") {
    // dummying out for now
    //  value, setFunc
    // if not first try and validation false, add invalid to class
    return (
      <label htmlFor="" className={createInputClassName()}>
        <p>{label !== "" ? label : capitalize(key)}</p>
        <input
          type={type}
          name={key}
          id={key}
          // onChange={(e) => {
          //   setFunc(e.target.value);
          //   // verifyInput(password, "Password", passwordReqs);
          // }}
        />
        {/* {password && verifyInput(password, "Password", passwordReqs)} */}
      </label>
    );
  }
  //   function createInputs(){

  //   }
  // might break off making inputs to loop or component later, for now just get it working
  function makeSelect(key, options, label = "") {
    // make options out of keys
    return (
      <label htmlFor="">
        {label === "" ? capitalize(key) : label}
        <select name={key} id={key}>
          {makeOptions(options)}
        </select>
      </label>
    );
  }

  function makeOptions(options) {
    if (Array.isArray(options) === true) {
      return options.map((option) => {
        return <option value={option}>{capitalize(option)}</option>;
      });
    } else {
      return Object.keys(options).map((key) => {
        return <option value={key}>{capitalize(options[key])}</option>;
      });
    }
  }
  return (
    <form id="new-player-form" onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
      {makeInput("text", "name")}
      {makeInput("text", "breed")}
      {makeSelect("teamId", props.teamLookup,"Team")}
      {makeSelect("status",["Bench","Field"])}
      {makeInput("imageUrl", "teamId", "Image")}
      <button className={allValid ? "" : "disabled"}>Submit</button>
    </form>
  );
}

export default NewPlayerForm;
