import React from "react";
import { Link } from "react-router-dom";
import "./Marker.css";

class Marker extends React.Component {
  /*
  openEvent = (event) => <Redirect
          to={{
            pathname: "/events/"+event.id,
            state: { from: this.props.location }
          }}
        />*/
  render() {
    const { event } = this.props;
    //console.log(event.id)
    var eventDate = event.data.date._seconds * 1000;
    var today = new Date().getTime();
    var chopped = (eventDate - today) / 86400;
    var colorTime = chopped.toString().substr(0, 1);
    //console.log(eventDate)
    //console.log(today)
    console.log(event);
    var color =
      colorTime >= 0 && colorTime < 1
        ? "#A357F6"
        : colorTime >= 1 && colorTime < 2
        ? "#9365F3"
        : colorTime >= 2 && colorTime < 3
        ? "#8472EF"
        : colorTime >= 3 && colorTime < 4
        ? "#7480EC"
        : colorTime >= 4 && colorTime < 5
        ? "#658DE9"
        : colorTime >= 5 && colorTime < 6
        ? "#559BE5"
        : colorTime >= 6 && colorTime < 7
        ? "#45A8E2"
        : colorTime >= 7 && colorTime < 8
        ? "#36B6DE"
        : colorTime >= 8
        ? "#26C3DB"
        : "#26C3DB";
    return (
      <div onClick={() => this.props.chooseEvent(event)}>
        <Link
          to={{
            pathname: "/events/" + event.id
            /*state: {
              from: this.props.location
            }*/
          }}
        >
          <div
            className="pin bounce"
            style={{ backgroundColor: color, cursor: "pointer" }}
            //title={name}
          />

          <div className="pulse" />
        </Link>
      </div>
    );
  }
}

export default Marker;
