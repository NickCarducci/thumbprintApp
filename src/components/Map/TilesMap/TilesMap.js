import React from "react";
import "./TilesMap.css";
import { Link } from "react-router-dom";

class TilesSlideDrawer extends React.Component {
  state = {
    tileChosen: 1
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
  render() {
    let drawerClasses = "tiles_slide-drawer closedmap";
    let drawerClasses1 = "tilesbackdropclosedmap";
    if (this.props.show === false) {
      drawerClasses = "tiles_slide-drawermap";
      drawerClasses1 = "tilesbackdropmap";
    }
    return (
      <div>
      <div className={drawerClasses1} onClick={this.props.close}>
      <div className={drawerClasses}>
        <div className="tilesset">
          <div>
            <Link to='/events'>
            {this.state.tileChosen === 1 ? (
              <img
                className="tilesselected"
                onClick={this.tileChoose1}
                src="https://www.dl.dropboxusercontent.com/s/9ik0gzhls9x68lm/EVENTTYPES_Events%20%20%281%29.png?dl=0"
                
                alt="error"
              />
            ) : (
              <img
                className="tilesnotselected"
                onClick={this.tileChoose1}
                src="https://www.dl.dropboxusercontent.com/s/z975s62yciuy356/TILES_Events%20%28closed%29.png?dl=0"
                
                alt="error"
              />
            )}
            </Link>
          </div>
          <div>
            {this.state.tileChosen === 2 ? (
              <img
                className="tilesselected"
                onClick={this.tileChoose2}
                src="https://www.dl.dropboxusercontent.com/s/kiql31g6gv2agft/CENTER%20PLUS_Club.png?dl=0"
                
                alt="error"
              />
            ) : (
              <img
                className="tilesnotselected"
                onClick={this.tileChoose2}
                src="https://www.dl.dropboxusercontent.com/s/vrm3lvir0t49kt2/TILES_Clubs%20%28closed%29.png?dl=0"
                
                alt="error"
              />
            )}
          </div>
          <div>
          {this.state.tileChosen === 3 ? (
            <img
              className="tilesselected"
              onClick={this.tileChoose3}
              src="https://www.dl.dropboxusercontent.com/s/0tusz7lqrbnzvlx/EVENTTYPES_Jobs.png?dl=0"
              
              alt="error"
            />
          ) : (
            <img
              className="tilesnotselected"
              onClick={this.tileChoose3}
              src="https://www.dl.dropboxusercontent.com/s/uslvfnp7xqmh2y8/TILES_Jobs%20%28closed%29%20%281%29.png?dl=0"
              
              alt="error"
            />
          )}
        </div>
        <div>
          {this.state.tileChosen === 4 ? (
            <img
              className="tilesselected"
              onClick={this.tileChoose4}
              src="https://www.dl.dropboxusercontent.com/s/rdx2xb7xczvomd1/EVENTTYPES_Housing.png?dl=0"
              
              alt="error"
            />
          ) : (
            <img
              className="tilesnotselected"
              onClick={this.tileChoose4}
              src="https://www.dl.dropboxusercontent.com/s/jamhnuor263bx8z/TILES_Housing%20%28closed%29%20%281%29.png?dl=0"
              
              alt="error"
            />
          )}
        </div>
          <div>
          {this.state.tileChosen === 5 ? (
            <img
              className="tilesselected"
              onClick={this.tileChoose5}
              src="https://www.dl.dropboxusercontent.com/s/3t3b223xt8rt0zt/EVENTTYPES_Shops.png?dl=0"
              
              alt="error"
            />
          ) : (
            <img
              className="tilesnotselected"
              onClick={this.tileChoose5}
              src="https://www.dl.dropboxusercontent.com/s/yj95k4p9e1j6koq/EVENTTYPES_Shops%20%28closed%29.png?dl=0"
              
              alt="error"
            />
          )}
        </div>
          <div>
          {this.state.tileChosen === 6 ? (
            <img
              className="tilesselected"
              onClick={this.tileChoose6}
              src="https://www.dl.dropboxusercontent.com/s/0vtvmbjgruqv0z7/EVENTTYPES_Restaurants.png?dl=0"
              
              alt="error"
            />
          ) : (
            <img
              className="tilesnotselected"
              onClick={this.tileChoose6}
              src="https://www.dl.dropboxusercontent.com/s/0mtamjp1faf29tx/EVENTTYPES_Restaurants%20%28closed%29%20%281%29.png?dl=0"
              
              alt="error"
            />
          )}
        </div>
          <div>
          {this.state.tileChosen === 7 ? (
            <img
              className="tilesselected"
              onClick={this.tileChoose7}
              src="https://www.dl.dropboxusercontent.com/s/6qp0bsjfr4di3w0/CENTER%20PLUS_Event.png?dl=0"
              
              alt="error"
            />
          ) : (
            <img
              className="tilesnotselected"
              onClick={this.tileChoose7}
              src="https://www.dl.dropboxusercontent.com/s/7e40g2z2kah8hf8/EVENTTYPES_Are%20you%2021_%20%28closed%29.png?dl=0"
              
              alt="error"
            />
          )}
        </div>
          <div>
          {this.state.tileChosen === 8 ? (
            <img
              className="tilesselected"
              onClick={this.tileChoose8}
              src="https://www.dl.dropboxusercontent.com/s/0jjuyb2cn56zvsh/EVENTTYPES_Services.png?dl=0"
              
              alt="error"
            />
          ) : (
            <img
              className="tilesnotselected"
              onClick={this.tileChoose8}
              src="https://www.dl.dropboxusercontent.com/s/r7sta0v63jpx4t6/EVENTTYPES_Services%20%28closed%29%20%281%29.png?dl=0"
              
              alt="error"
            />
          )}
        </div>
          <div>
            <Link to='/proposals'>
          {this.state.tileChosen === 9 ? (
            <img
              className="tilesselected"
              onClick={this.tileChoose9}
              src="https://www.dl.dropboxusercontent.com/s/pmgrqoorrymamcm/EVENTTYPES_Shops%20%281%29.png?dl=0"
              
              alt="error"
            />
          ) : (
            <img
              className="tilesnotselected"
              onClick={this.tileChoose9}
              src="https://www.dl.dropboxusercontent.com/s/v9o41yy1v3rysq6/EVENTTYPES_Proposals%20%28closed%29.png?dl=0"
              
              alt="error"
            />
          )}
          </Link>
        </div>
      </div>
      </div>
      </div>
      </div>
    );
  }
}
export default TilesSlideDrawer;
