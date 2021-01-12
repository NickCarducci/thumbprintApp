import React from "react";
import search from "../.././Icons/Images/search.png";
import back from "../.././Icons/Images/back.png";
import { Link } from "react-router-dom";

import "../.././Icons/Headerstyles.css";

function InvitesHeader() {
  return (
    <div>
      <Link to="/plan">
        <img src={back} className="back" alt="error" />
      </Link>
      <form><input className="Invites_Header" placeholder="Invites"></input></form>
      <img src={search} className="search" alt="error" />
    </div>
  );
}

export default InvitesHeader;