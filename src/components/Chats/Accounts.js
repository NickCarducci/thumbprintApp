import React from "react";
import search from ".././Icons/Images/search.png";
import back from ".././Icons/Images/back.png";
import { Link } from "react-router-dom";

import ".././Icons/Headerstyles.css";

function Accounts() {
  return (

    <div>
      <Link to="/">
        <img src={back} className="back" alt="error" />
      </Link>
      <form>
        <input className="Accounts_Header" placeholder="Accounts" />
      </form>
      <img src={search} className="search" alt="error" />
    </div>

  );
}

export default Accounts;