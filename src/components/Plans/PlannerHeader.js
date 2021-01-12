import React from "react";
import logo from ".././Icons/Images/logo_large1.png";
import search from ".././Icons/Images/search.png";
//import invites_large from ".././Icons/Images/invites_large.png";
//import filter from ".././Icons/Images/filter.png";
import { Link } from "react-router-dom";

import ".././Icons/Headerstyles.css";
import "../.././styles.css";


class PlannerHeader extends React.Component {
  stopSubmit(e) {
    e.preventDefault()
    return false
  }
  render(props) {
    return (
      <div>
        <img src={search} className="search" alt="error" />
        <img
          src={logo}
          className="logo_large"
          onClick={this.props.dayCalOpener}
          alt="error"
        />
        <form  onSubmit={this.stopSubmit}>
          <input className="Planner_Header" type="text"
        name="note" placeholder="Search" 
        value={this.props.search}
        onChange={this.props.updateSearch}
        autoComplete="off"
        />
        </form>
        <Link to="/invites">
        <img src="https://www.dl.dropboxusercontent.com/s/59dwabz13tz723b/invites%20box%20%281%29.png?dl=0" className="invitesl_large" alt="error" />
        </Link>
        <img src="https://www.dl.dropboxusercontent.com/s/szxg897vw4bwhs3/filter%20%281%29.png?dl=0" className="planfilter" alt="error" />
      </div>
    );
  }
}
export default PlannerHeader;
