import React from "react";
import "./DatepickerBackdrop.css";
//import DatepickerSlider from "./DatepickerSlider";

class DatepickerBackdrop extends React.Component {
  render() {
    return (
      <div className="picker_backdrop" onClick={this.props.close}>
        <div></div>
      </div>
    );
  }
}
export default DatepickerBackdrop;