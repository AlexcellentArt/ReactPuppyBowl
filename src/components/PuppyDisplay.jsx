function PuppyDisplay() {
    // mode can be isolated to here I think because its not relevant to other stuff. Sans maybe search.
    const [mode, setMode] = useState("single");
    // by having the className just be the mode name with render on it, I can have multiple views completely handled by one mode input.
    return (<><div className={`${mode}Render`}></div></>  );
}

export default PuppyDisplay;