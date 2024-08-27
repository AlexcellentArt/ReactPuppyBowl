import React, { useState, useRef } from "react";
import { addNewPlayer, capitalize,verifyImageExists } from "../go-fetch";
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
    console.log("TARGETS")
    const fD = new FormData(e.target)
    const validationInfo = [];
    for (let i = 0; i < e.target.length; i++)
    {
      //get key, value, and type attr
      const key = e.target.elements[i].getAttribute("name")
      const value = e.target[key].value.trim()
      const type = e.target[key].getAttribute("type")
      console.log(`Key: ${key} Value: ${value} Type: ${type === null ? "null or select":type}`)
      validationInfo.push({key:key,value:value,type:type})
      //set
      fD[key] = value
      // const isValid = await verifyInput(
      //   type,value
      // );
      // validation[key] = isValid;
      // if (isValid === false) {
      //   allDataValid = false;
      // }
    }
    // update states
    setFormData(fD);
  }
 async function validateForm(arr){
  // input is an array of {key:key,value:value,type:type}
  
  const validation = {}
  for (let i = 0; i < e.target.length; i++)
    {
      const isValid = await verifyInput(
        type,value
      );
      validationData[key] = isValid;
      if (isValid === false) {
        allDataValid = false;
      }
    }
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

      case "imageUrl": {
        // checking the content-type header
        res = await verifyImageExists(inputVal)
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
      <label key={key} id={key} for={key} htmlFor="" className={createInputClassName()}>
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
      <label key={key} id={key} for={key} htmlFor="">
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
      {makeInput("imageUrl", "imageUrl", "Image")}
      <button type="submit" className={allValid ? "" : "disabled"}>Submit</button>
    </form>
  );
}

export default NewPlayerForm;
