import React from "react";
import { Link } from "react-router-dom";
import "./Backdrop.css"

class CreateSlider extends React.Component {
  render() {
    let drawerClasses = "slide-drawer closed";
    if (this.props.show) {
      drawerClasses = "slide-drawer";
    }
    return (<div>
      {this.props.show ? <div className="create-drawer-backdrop" onClick={this.props.toggle}/> : null }
      <div className={drawerClasses}>
        <div className="createphotoset">
        <Link to="/new">
            <img
              onClick={this.props.toggle}
              src="https://www.dl.dropboxusercontent.com/s/nves40phq4yhd57/CENTER%20PLUS_Plan.png?dl=0"
              className="createphoto"
              alt="error"
            />
        </Link>

        <Link to="/newevent">
            <img
              onClick={this.props.toggle}
              src="https://www.dl.dropboxusercontent.com/s/6qp0bsjfr4di3w0/CENTER%20PLUS_Event.png?dl=0"
              className="createphoto"
              alt="error"
            />
        </Link></div>

        {/*<Link className=""
        to="/new"
        onClick={this.props.toggle}
    ><h1>Event</h1></Link>*/}
      </div>
      </div>
    );
  }
}
export default CreateSlider;
