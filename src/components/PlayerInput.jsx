import React from 'react';
function PlayerInput(props) {
    function createInputClassName(base=""){
        if (props.isFirstTry || !props.isValid === true)
        {
            return ""
        }
        else {
            return "invalid"
        }
      }
    // dummying out for now
    //  value, setFunc
    // if not first try and validation false, add invalid to class
    <label htmlFor="" className={createInputClassName()}>
      <p>{label in props ? props.label:key.charAt(0).toUpperCase() + key.substring(1)}</p>
      <input
        type={props.type}
        name={props.key}
        id={props.key}
        // onChange={(e) => {
        //   setFunc(e.target.value);
        //   // verifyInput(password, "Password", passwordReqs);
        // }}
      />
      {/* {password && verifyInput(password, "Password", passwordReqs)} */}
    </label>;
  }
export default PlayerInput