import React from "react";
import "./EventTypesMap.css";

class EventTypes extends React.Component {
  state = {
    tileChosen: 1,
    socialOpen: false
  };
  tileChoose1 = () => {
    this.setState({
      tileChosen: 1
    });
  };
  tileChoose2 = () => {
    this.setState({
      tileChosen: 2
    });
  };
  tileChoose3 = () => {
    this.setState({
      tileChosen: 3
    });
  };
  tileChoose4 = () => {
    this.setState({
      tileChosen: 4
    });
  };
  tileChoose5 = () => {
    this.setState({
      tileChosen: 5
    });
  };
  tileChoose6 = () => {
    this.setState({
      tileChosen: 6
    });
  };
  tileChoose7 = () => {
    this.setState({
      tileChosen: 7
    });
  };
  tileChoose8 = () => {
    this.setState({
      tileChosen: 8
    });
  };
  tileChoose9 = () => {
    this.setState({
      tileChosen: 9
    });
  };
  tileChoose10 = () => {
    this.setState({
      tileChosen: 10
    });
  };
  tileChoose11 = () => {
    this.setState({
      tileChosen: 11
    });
  };
  socialOpener = () => {
    this.setState({
      socialOpen: !this.state.socialOpen
    });
  };
  render() {
    //console.log(this.props.show)
    let drawerClasses = "eventtypes closedmap";
    let drawerClasses1 = "Etypebackdropclosedmap";
    if (this.props.show) {
      drawerClasses = "eventtypesmap";
      drawerClasses1 = "Etypebackdropmap";
    }
    return (
      <div>
        <div className={drawerClasses1} onClick={this.props.close}>
          <div className={drawerClasses}>
            <div className="eventtypessetmap">
              <div onClick={this.props.etypeChanger}>
                {this.state.tileChosen === 1 ? (
                  <img
                    className="eventtypesselected"
                    onClick={this.tileChoose1}
                    src="https://www.dl.dropboxusercontent.com/s/kr9xqztnplw80ex/EVENTTYPES_All%20%28closed%29%20%282%29.png?dl=0"
                    alt="error"
                    id="all"
                  />
                ) : (
                  <img
                    className="eventtypesnotselected"
                    onClick={this.tileChoose1}
                    src="https://www.dl.dropboxusercontent.com/s/22p0kgf2s80mxzf/EVENTTYPES_All%20%28closed%29%20%281%29.png?dl=0"
                    alt="error"
                    id="all"
                  />
                )}
              </div>
              <div onClick={this.props.etypeChanger}>
                {this.state.tileChosen === 2 ? (
                  <img
                    className="eventtypesselected"
                    onClick={this.tileChoose2}
                    src="https://www.dl.dropboxusercontent.com/s/z78oeh1t63yt21y/EVENTTYPES_Food.png?dl=0"
                    alt="error"
                    id="food"
                  />
                ) : (
                  <img
                    className="eventtypesnotselected"
                    onClick={this.tileChoose2}
                    src="https://www.dl.dropboxusercontent.com/s/hho9wzzxj9ffsip/EVENTTYPES_Food%20%28closed%29.png?dl=0"
                    alt="error"
                    id="food"
                  />
                )}
              </div>
              <div onClick={this.props.etypeChanger}>
                {this.state.tileChosen === 3 ? (
                  <img
                    className="eventtypesselected"
                    onClick={this.tileChoose3}
                    src="https://www.dl.dropboxusercontent.com/s/4ybgp4auh1lhxh2/EVENTTYPES_Business.png?dl=0"
                    alt="error"
                    id="business"
                  />
                ) : (
                  <img
                    className="eventtypesnotselected"
                    onClick={this.tileChoose3}
                    src="https://www.dl.dropboxusercontent.com/s/5mcj3n7ktcm6am3/EVENTTYPES_Business%20%28closed%29.png?dl=0"
                    alt="error"
                    id="business"
                  />
                )}
              </div>
              <div onClick={this.props.etypeChanger}>
                {this.state.tileChosen === 4 ? (
                  <img
                    className="eventtypesselected"
                    onClick={this.tileChoose4}
                    src="https://www.dl.dropboxusercontent.com/s/edom45hrd0d95pl/EVENTTYPES_Tech.png?dl=0"
                    alt="error"
                    id="tech"
                  />
                ) : (
                  <img
                    className="eventtypesnotselected"
                    onClick={this.tileChoose4}
                    src="https://www.dl.dropboxusercontent.com/s/nhd0inv9277p98x/EVENTTYPES_Tech%20%28closed%29.png?dl=0"
                    alt="error"
                    id="tech"
                  />
                )}
              </div>
              <div onClick={this.props.etypeChanger}>
                {this.state.tileChosen === 5 ? (
                  <img
                    className="eventtypesselected"
                    onClick={this.tileChoose5}
                    src="https://www.dl.dropboxusercontent.com/s/9pqf8zpkdsxllrq/EVENTTYPES_Recreational.png?dl=0"
                    alt="error"
                    id="recreation"
                  />
                ) : (
                  <img
                    className="eventtypesnotselected"
                    onClick={this.tileChoose5}
                    src="https://www.dl.dropboxusercontent.com/s/qpz15r5kedt0oga/EVENTTYPES_Recreational%20%28closed%29.png?dl=0"
                    alt="error"
                    id="recreation"
                  />
                )}
              </div>
              <div onClick={this.props.etypeChanger}>
                {this.state.tileChosen === 6 ? (
                  <img
                    className="eventtypesselected"
                    onClick={this.tileChoose6}
                    src="https://www.dl.dropboxusercontent.com/s/rv27bbh015odcwh/EVENTTYPES_Educational.png?dl=0"
                    alt="error"
                    id="education"
                  />
                ) : (
                  <img
                    className="eventtypesnotselected"
                    onClick={this.tileChoose6}
                    src="https://www.dl.dropboxusercontent.com/s/ux354kb91c151e6/EVENTTYPES_Educational%20%28closed%29.png?dl=0"
                    alt="error"
                    id="education"
                  />
                )}
              </div>
              <div onClick={this.props.etypeChanger}>
                {this.state.tileChosen === 7 ? (
                  <img
                    className="eventtypesselected"
                    onClick={this.tileChoose7}
                    src="https://www.dl.dropboxusercontent.com/s/cv16smvhj1fzule/EVENTTYPES_Arts.png?dl=0"
                    alt="error"
                    id="arts"
                  />
                ) : (
                  <img
                    className="eventtypesnotselected"
                    onClick={this.tileChoose7}
                    src="https://www.dl.dropboxusercontent.com/s/gtij6rjt9lo1cxn/EVENTTYPES_Arts%20%28closed%29.png?dl=0"
                    alt="error"
                    id="arts"
                  />
                )}
              </div>
              <div onClick={this.props.etypeChanger}>
                {this.state.tileChosen === 8 ? (
                  <img
                    className="eventtypesselected"
                    onClick={this.tileChoose8}
                    src="https://www.dl.dropboxusercontent.com/s/i02rrtpdd65t0fe/EVENTTYPES_Sports.png?dl=0"
                    alt="error"
                    id="sports"
                  />
                ) : (
                  <img
                    className="eventtypesnotselected"
                    onClick={this.tileChoose8}
                    src="https://www.dl.dropboxusercontent.com/s/psg1ctymtc17gm3/EVENTTYPES_Sports%20%28closed%29.png?dl=0"
                    alt="error"
                    id="sports"
                  />
                )}
              </div>
              <div onClick={this.props.etypeChanger}>
                {this.state.tileChosen === 9 ? (
                  <img
                    className="eventtypesselected"
                    onClick={this.tileChoose9}
                    src="https://www.dl.dropboxusercontent.com/s/9vcq3tiuwiqzt0k/EVENTTYPES_Concerts.png?dl=0"
                    alt="error"
                    id="concerts"
                  />
                ) : (
                  <img
                    className="eventtypesnotselected"
                    onClick={this.tileChoose9}
                    src="https://www.dl.dropboxusercontent.com/s/71r5fn5nxmpzu2y/EVENTTYPES_Concerts%20%28closed%29%20%281%29.png?dl=0"
                    alt="error"
                    id="concerts"
                  />
                )}
              </div>
              <div onClick={this.props.etypeChanger}>
                {this.state.tileChosen === 10 ? (
                  <img
                    className="eventtypesselected"
                    onClick={this.tileChoose10}
                    src="https://www.dl.dropboxusercontent.com/s/e166m8dq57xcutj/EVENTTYPES_Causes.png?dl=0"
                    alt="error"
                    id="sports"
                  />
                ) : (
                  <img
                    className="eventtypesnotselected"
                    onClick={this.tileChoose10}
                    src="https://www.dl.dropboxusercontent.com/s/ezfawkuhltuux07/EVENTTYPES_Causes%20%28closed%29.png?dl=0"
                    alt="error"
                    id="causes"
                  />
                )}
              </div>
              <div onClick={this.props.etypeChanger}>
                {this.state.tileChosen === 11 ? (
                  <img
                    className="eventtypesselected"
                    onClick={this.tileChoose11}
                    src="https://www.dl.dropboxusercontent.com/s/yp1tokscuupg7qp/EVENTTYPES_Social_%20%282%29.png?dl=0"
                    alt="error"
                    id="parties"
                  />
                ) : (
                  <img
                    className="eventtypesnotselected"
                    onClick={this.tileChoose11}
                    src="https://www.dl.dropboxusercontent.com/s/id7s95nx884i553/EVENTTYPES_Social%20%28closed%29%20%282%29.png?dl=0"
                    alt="error"
                    id="parties"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default EventTypes;
