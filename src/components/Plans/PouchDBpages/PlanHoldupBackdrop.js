import React from "react";

class PlanHoldupBackdrop extends React.Component {
  render() {
    return (
      <div className="picker_backdrop" onClick={this.props.close}>
      </div>
    );
  }
}
export default PlanHoldupBackdrop;