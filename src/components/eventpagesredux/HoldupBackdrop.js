import React from "react";
import "./HoldupBackdrop.css";

class HoldupBackdrop extends React.Component {
  render() {
    return (
      <div className="picker_backdrop" onClick={this.props.close}>
      </div>
    );
  }
}
export default HoldupBackdrop;