import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import back777 from "../.././Icons/Images/back777.png";
import settings33 from "../.././Icons/Images/settings33.png";

import "./planopen.css";

class ShowPage extends React.PureComponent {
  renderDate() {
    let d = dayjs(this.props.note.updatedAt);
    return d.format("MMMM D YYYY, HH:mm");
  }
  /*
  componentWillMount() {
    if (!this.props.note) {
      this.props.history.replace(`/planner`);
      return;
    }
  }
*/
  render() {
    const { note } = this.props;

    if (!note) {
      return null;
    }

    return (
      <div>
        <div className="planopenpage">
          <Link to={`/plans/${note._id}/edit`}>
            <img src={settings33} className="settings33" alt="error" />
          </Link>
          <Link to="/plan">
            <img src={back777} className="backopen" alt="error" />
          </Link>

          <div className="Plan_Header">{note.title}</div>
        </div>
        {/*<div className="note-open">
          <h1>{note.title}</h1>
          <div className="note-created">{this.renderDate()}</div>
    </div>*/}
      </div>
    );
  }
}

export default ShowPage;
