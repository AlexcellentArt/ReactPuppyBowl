import {Link} from "react-router-dom";
function Navbar() {
    // It'd be neat to add in a feature where players could be starred and added to navbar
  return (
    <navbar id="navbar">
      <Link to="/">Home</Link>
      <Link to="/players">Players</Link>
      {/* <Link to="/teams">Teams</Link> */}
    </navbar>
  );
}

export default Navbar;