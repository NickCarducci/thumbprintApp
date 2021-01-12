import React from "react";
import { Link } from "react-router-dom";
import "./Marker.css";

class MarkerEdm extends React.Component {
  /*
  openEvent = (event) => <Redirect
          to={{
            pathname: "/events/"+event.id,
            state: { from: this.props.location }
          }}
        />*/
  render() {
    const { eventEdm } = this.props;
    //console.log(event.id)
     var eventDate = new Date(this.props.eventEdm.date)/1000
     var today = new Date()/1000
     var chopped = (eventDate - today)/86400
     var colorTime = chopped.toString().substr(0,1)
     //console.log(eventDate)
     //console.log(today)
     //console.log(colorTime)
     var color = colorTime >= 0 && colorTime < 1 ? "#A357F6" 
     : colorTime >= 1 && colorTime < 2 ? "#9365F3" 
     : colorTime >= 2 && colorTime < 3 ? "#8472EF"
     : colorTime >= 3 && colorTime < 4 ? "#7480EC"
     : colorTime >= 4 && colorTime < 5 ? "#658DE9"
     : colorTime >= 5 && colorTime < 6 ? "#559BE5"
     : colorTime >= 6 && colorTime < 7 ? "#45A8E2"
     : colorTime >= 7 && colorTime < 8 ? "#36B6DE"
     : colorTime >= 8 ? "#26C3DB" : "#26C3DB"
    return (
      <div onClick={() => eventEdm.id.length > 10 ? null : this.props.chooseEdmevent(eventEdm)}
      //onClick={() => this.openEvent(event)}
      >
        <Link
          to={{
            pathname: "/events/edmtrain/" + eventEdm.id
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

          {color === "#A357F6" ? <div className="pulse" /> : null}
        </Link>
      </div>
    );
  }
}

export default MarkerEdm;

//<img alt="error" src="https://www.dl.dropboxusercontent.com/s/zg9lbe70gdukg46/map%20marker%20coming%20up%20%281%29.png?dl=0" scale="0.25" />
