import React from "react";

class SeatsioBackdrop extends React.Component {
  render() {
    return (
      <div className="backdrop" onClick={this.props.close}>
      </div>
    );
  }
}
export default SeatsioBackdrop;
