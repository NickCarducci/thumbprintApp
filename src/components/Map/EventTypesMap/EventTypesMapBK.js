import React from "react";
import "./EventTypesMap";
import EventTypes from "./EventTypes";

class EventTypesBackdrop extends React.Component {
  render() {
    return (
      <div className="Etypebackdropmap" onClick={this.props.close}>
        
      </div>
    );
  }
}
export default EventTypesBackdrop;