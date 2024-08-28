import React, { useState, useRef } from "react";
import { addNewPlayer, capitalize, verifyImageExists } from "../go-fetch";
import PlayerInput from "./PlayerInput";
function NewPlayerForm(props) {
  // form data i might refactor to ref later
  const [formData, setFormData] = useState({});
  const [validationData, setValidationData] = useState({});
  const [allValid, setAllValid] = useState(true);
  const [error, setError] = useState();
  const [isFirstTry, setIsFirstTry] = useState(true);
  const [FormStatus, setFormStatus] = useState("fresh");
  const form = useRef(null)

  async function handleSubmit(e) {
    e.preventDefault();
    // trim form data via iterable and confirm its validity while also setting the value to empty
    console.log("TARGETS");
    const fD = new FormData(e.target);
    const obj = {};
    const validationInfo = [];
    for (let i = 0; i < e.target.length; i++) {
      //get key, value, and type attr
      const key = e.target.elements[i].getAttribute("name");
      const type = e.target.elements[i].getAttribute("type");
      let value = e.target.elements[i].value;
      // if value is string, trim it
      if (Object.prototype.toString.call(value) === '[object String]')
      {
        value = value.trim()
      }
      console.log(`Key: ${key} Value: ${value} Type: ${type}`);
      if (type !== "submit") {
        validationInfo.push({ key: key, value: value, type: type });
        //set
        fD[key] = value;
        obj[key] = value
      }
    }
    // update states
    setFormData(obj);
    validateForm(validationInfo,obj)
    setFormStatus("validating")
  }
  async function validateForm(validationInfo,data) {
    // input is an array of {key:key,value:value,type:type}
    let allDataValid = true
    const validation = {};
    // const sendOff = {}
    for (let i = 0; i < validationInfo.length; i++) {
      const obj = validationInfo[i];
      const isValid = await verifyInput(obj.type, obj.value);
      validationData[obj.key] = isValid;
      // sendOff[obj.key] = obj.value.trim()
      // if one mismatch is found, set allDataValid to false.
      if (isValid === false) {
        allDataValid = false;
      }
    }
    setValidationData(validation);
    setAllValid(allDataValid);
    if (isFirstTry === true) {
      setIsFirstTry(false);
    }
    // check if allValid. if not, then throw error. Else, add new player
    try {
      if (!allValid) {
        throw Error("Fields are blank.");
      }
      // try and add new player
      const res = await addNewPlayer(data);
      if (res === null) {
        throw new Error("Error on server side.");
      }
      else
      {
        console.log("New player added successfully. Updating players.")
        props.refetch()
        setFormStatus("needsReset")
        // log current form elements and then reset
        console.log(form.current.elements)
        form.current.reset()
        setFormStatus("fresh")
        // set first try to true, as this is a fresh form
        setIsFirstTry(true)

      }
    } catch (error) {
      setError(error.message);
      return
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
        res = await verifyImageExists(inputVal);
        break;
      }
      default:
        res = true;
        break;
    }
    console.log(`${key}'s validity is: ${res}`);
    return res;
  }
  function createInputClassName(base = "",key) {
    if (isFirstTry || !validationData[key] === true) {
      return base;
    } else {
      return base+" invalid";
    }
  }
  function makeInput(type, key, label = "") {
    // dummying out for now
    //  value, setFunc
    // if not first try and validation false, add invalid to class
    return (
      <label
        key={key}
        id={key}
        for={key}
        className={createInputClassName("input",key)}
      >
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
      <label className="select" key={key} id={key} for={key} htmlFor="">
        {label === "" ? capitalize(key) : label}
        <select name={key} key={key} id={key}>
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
 function handleReset(){
  console.log("handling reset")
 }
//  function
  // reset if needsReset
  return (
    <form id="new-player-form" onSubmit={handleSubmit} ref={form} onReset={handleReset}>
      {error && <p>{error}</p>}
      <div className="formInput">
      {makeInput("text", "name")}
      {makeInput("text", "breed")}
      {makeInput("imageUrl", "imageUrl", "Image")}
      </div>
      <div className="formSelect">
      {makeSelect("teamId", props.teamLookup, "Team")}
      {makeSelect("status", ["bench", "field"])}
      </div>
      <button type="submit" className={allValid ? "" : "disabled"}>
        Submit
      </button>

    </form>
  );
}

export default NewPlayerForm;
