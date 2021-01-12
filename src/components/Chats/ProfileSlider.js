import React from "react";
import firebase from "../.././init-firebase";
import { auth, fireStore } from "../.././init-firebase";
import {} from "../.././init-firebase";
import "./ProfileBackdrop.css";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-number-input/mobile";
import "react-phone-number-input/style.css";

class ProfileSlideDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tileChosen: undefined,
      stopSubmit: false,
      loading: false,
      working: true,
      me: "",
      username: "",
      name: ""
    };
    this.recaptcha = React.createRef();
  }
  tileChoose0 = () => {
    this.setState({
      tileChosen: 0
    });
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
  editProfileChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  submitProfileChange = e => {
    e.preventDefault();
    if (
      this.state.username !== this.props.user.data.username &&
      this.state.name !== this.props.user.data.name &&
      this.state.username !== "" &&
      this.state.name !== ""
    ) {
      fireStore
        .collection("users")
        .doc(this.props.auth.uid)
        .update({
          data: { username: this.state.username, name: this.state.name }
        });
    }
    if (
      this.state.username !== this.props.user.data.username &&
      this.state.name === this.props.user.data.name &&
      this.state.username !== ""
    ) {
      fireStore
        .collection("users")
        .doc(this.props.auth.uid)
        .update({
          data: { username: this.state.username }
        });
    }
    if (
      this.state.username === this.props.user.data.username &&
      this.state.name !== this.props.user.data.name &&
      this.state.name !== ""
    ) {
      fireStore
        .collection("users")
        .doc(this.props.auth.uid)
        .update({
          data: { name: this.state.name }
        });
    }
    console.log("updated");
  };
  confirmCode = e => {
    e.preventDefault();
    console.log(this.state.textedCode);
    window.confirmationResult
      .confirm(this.state.textedCode)
      .then(result => {
        //var user = result.user;
        //console.log(user);
        console.log("NormalFinish");
        this.setState({ working: false });
        //this.props.history.push("/plan");
        //if (this.props.auth.uid) return <Redirect to={from} />;
      })
      .then(() => {
        firebase
          .auth()
          .signInWithPhoneNumber(this.state.phone, this.state.appVerifier)
          .then(confirmationResult => {
            console.log(confirmationResult);
            window.confirmationResult = confirmationResult;
            console.log("yo");
          });
        return fireStore
          .collection("users")
          .doc(this.props.auth.uid)
          .delete()
          .then(function() {
            console.log("Document successfully deleted!");
          })
          .catch(function(error) {
            console.error("Error removing document: ", error);
          });
      })
      .catch(err => {
        this.setState({ authError: err });
        console.log(err);
      });
  };
  handleCode = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  //SignIn && SignUp
  requestTextCodeBox = () => {
    //if (this.state.appVerifier === "") return this.stopSubmit;
    //this.setState({ loading: true });
    console.log(this.state.textedCode);
    //const firebase = getFirebase();
    //const firestore = getFirestore();
    console.log("ok");
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        return firebase
          .auth()
          .signInWithPhoneNumber(this.state.phone, this.state.appVerifier)
          .then(confirmationResult => {
            console.log(confirmationResult);
            window.confirmationResult = confirmationResult;
            console.log("yo");
          });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          loading: false,
          showrecaptcha: false,
          recaptchaGood: false,
          authError: err.message
        });
      });
  };
  componentDidMount = () => {
    if (window.location.pathname === "/") {
      window.recaptchaVerifier =
        this.props.chatsopen &&
        new firebase.auth.RecaptchaVerifier(this.recaptcha.current, {
          size: "normal",
          callback: response => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            // ...
            console.log(response);
            //const jsonresponse = await response.toString()
            //this.setState({ recaptchaResponse: response });
            this.setState({
              recaptchaGood: true,
              showrecaptcha: false
            });
            this.requestTextCodeBox();
            return response;
          },
          "expired-callback": err => {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
            this.setState({ showrecaptcha: false, recaptchaGood: false });
            console.log(err);
            return err;
          }
        });

      const appVerifier =
        window.location.pathname !== "/login" && window.recaptchaVerifier;
      appVerifier && appVerifier.render();
      if (this.state.appVerifier !== appVerifier) {
        this.setState({ appVerifier });
      }
    }
  };

  stopSubmit(e) {
    e.preventDefault();
    this.setState({ notSameNumber: true });
    return false;
  }
  render() {
    let drawerClasses = "profile_slide-drawer";
    if (this.props.show) {
      drawerClasses = "profile_slide-drawer open";
    }
    const { users } = this.props;
    var existingUsernames = [];
    users &&
      users.length > 0 &&
      users.map(number => existingUsernames.push(number.data.username));
    if (existingUsernames.includes(this.state.username)) {
      console.log("finishSignUp");
      if (!this.state.stopSubmit) {
        this.setState({ stopSubmit: true });
      }
    } else {
      if (this.state.stopSubmit) {
        this.setState({ stopSubmit: false });
      }
    }
    console.log(this.state.username);
    this.props.user && console.log(this.props.user.data.username);
    return (
      <div>
        {this.props.show ? (
          <div className="profile_backdrop" onClick={this.props.close} />
        ) : null}
        <div className={drawerClasses}>
          {1 + 1 === 2 ? (
            <div className="profileinfo">
              <form
                onSubmit={
                  this.state.stopSubmit ? null : this.submitProfileChange
                }
              >
                <label>
                  username {this.state.stopSubmit ? "taken" : null}
                  <input
                    id="username"
                    onChange={this.editProfileChange}
                    value={this.state.username}
                    placeholder={
                      this.props.user && this.props.user.data.username
                    }
                  />
                </label>
                <br />
                <label>
                  name
                  <input
                    id="name"
                    onChange={this.editProfileChange}
                    value={this.state.name}
                    placeholder={this.props.user && this.props.user.data.name}
                  />
                </label>
                <button>save</button>
              </form>
              <div
                className="logoutbtn"
                onClick={() => {
                  this.props.close();
                  firebase
                    .auth()
                    .signOut()
                    .then(() => {
                      console.log("logged out");
                    })
                    .catch(err => {
                      console.log(err);
                    });
                  window.location.reload();
                }}
              >
                Log Out
              </div>
            </div>
          ) : (
            <h1>Profile</h1>
          )}

          <div />
          {this.state.notSameNumber ? (
            <div onClick={this.setState({ phone: undefined })}>&#8634;</div>
          ) : null}
          {this.state.authError !== undefined ? (
            this.state.authError
          ) : (
            <form
              onSubmit={
                //this.this.props.user.phoneNumber === this.state.phone
                //? () => this.requestTextCodeBox()
                () => this.stopSubmit()
              }
            >
              <label>enter your phone number to delete account</label>
              <PhoneInput
                country="US"
                required
                placeholder="Enter phone number"
                value={this.state.phone}
                onChange={value => this.setState({ phone: value })}
                type="tel"
                //countrySelectComponent={CustomCountrySelect}
              />
            </form>
          )}
          {!this.state.recaptchaGood &&
          !this.state.showrecaptcha &&
          !this.state.authError &&
          this.props.auth &&
          this.props.auth.phoneNumber === this.state.phone ? (
            <div className="loginsignup">
              <button
                type="submit"
                className="loginbtn"
                onClick={() => this.setState({ showrecaptcha: true })}
              >
                Delete
              </button>
            </div>
          ) : null}
          <div
            ref={this.recaptcha}
            className={
              this.state.showrecaptcha ? "showrecaptcha" : "hiderecaptcha"
            }
          />
          {this.state.recaptchaGood && this.state.authError === undefined ? (
            <form
              className="showphonecodeform"
              onSubmit={e => {
                this.confirmCode(e);
              }}
            >
              <input
                className="phonecodeinput"
                placeholder="Verification Code"
                id="textedCode"
                onChange={this.handleCode}
              />
              <button className="showphonecodeformbtn" type="submit">
                Confirm
              </button>
            </form>
          ) : null}

          {this.props.user && this.props.user.data.vendorId ? (
            <div>{this.props.user.data.vendorId}</div>
          ) : null}
          {this.props.user && this.props.auth ? (
            <div className="eventtypesset">
              {this.props.user.data.tickets ? (
                <div>
                  <Link
                    to={{
                      pathname: "/posters/" + this.props.auth.uid,
                      state: {
                        tileChosen: 0
                      }
                    }}
                  >
                    {this.state.tileChosen === 0 ? (
                      <img
                        className="tilesselectedprofile"
                        onClick={this.tileChoose0}
                        src="https://www.dl.dropboxusercontent.com/s/52p32lj5mljf4dl/EVENTTYPES_Tickets.png?dl=0"
                        alt="error"
                      />
                    ) : (
                      <img
                        className="tilesnotselectedprofile"
                        onClick={this.tileChoose0}
                        src="https://www.dl.dropboxusercontent.com/s/nkz3fxiso14de4z/EVENTTYPES_Tickets%20%28closed%29.png?dl=0"
                        alt="error"
                      />
                    )}
                  </Link>
                </div>
              ) : null}
              {this.props.user.data.events ? (
                <div>
                  <Link
                    to={{
                      pathname: "/posters/" + this.props.auth.uid,
                      state: {
                        tileChosen: 1
                      }
                    }}
                  >
                    {this.state.tileChosen === 1 ? (
                      <img
                        className="tilesselectedprofile"
                        onClick={this.tileChoose1}
                        src="https://www.dl.dropboxusercontent.com/s/9ik0gzhls9x68lm/EVENTTYPES_Events%20%20%281%29.png?dl=0"
                        alt="error"
                      />
                    ) : (
                      <img
                        className="tilesnotselectedprofile"
                        onClick={this.tileChoose1}
                        src="https://www.dl.dropboxusercontent.com/s/z975s62yciuy356/TILES_Events%20%28closed%29.png?dl=0"
                        alt="error"
                      />
                    )}
                  </Link>
                </div>
              ) : null}
              {this.props.user.data.clubs ? (
                <div>
                  <Link
                    to={{
                      pathname: "/posters/" + this.props.auth.uid,
                      state: {
                        tileChosen: 2
                      }
                    }}
                  >
                    {this.state.tileChosen === 2 ? (
                      <img
                        className="tilesselectedprofile"
                        onClick={this.tileChoose2}
                        src="https://www.dl.dropboxusercontent.com/s/kiql31g6gv2agft/CENTER%20PLUS_Club.png?dl=0"
                        alt="error"
                      />
                    ) : (
                      <img
                        className="tilesnotselectedprofile"
                        onClick={this.tileChoose2}
                        src="https://www.dl.dropboxusercontent.com/s/vrm3lvir0t49kt2/TILES_Clubs%20%28closed%29.png?dl=0"
                        alt="error"
                      />
                    )}
                  </Link>
                </div>
              ) : null}
              {this.props.user.data.jobs ? (
                <div>
                  <Link
                    to={{
                      pathname: "/posters/" + this.props.auth.uid,
                      state: {
                        tileChosen: 3
                      }
                    }}
                  >
                    {this.state.tileChosen === 3 ? (
                      <img
                        className="tilesselectedprofile"
                        onClick={this.tileChoose3}
                        src="https://www.dl.dropboxusercontent.com/s/0tusz7lqrbnzvlx/EVENTTYPES_Jobs.png?dl=0"
                        alt="error"
                      />
                    ) : (
                      <img
                        className="tilesnotselectedprofile"
                        onClick={this.tileChoose3}
                        src="https://www.dl.dropboxusercontent.com/s/uslvfnp7xqmh2y8/TILES_Jobs%20%28closed%29%20%281%29.png?dl=0"
                        alt="error"
                      />
                    )}
                  </Link>
                </div>
              ) : null}
              {this.props.user.data.housing ? (
                <div>
                  <Link
                    to={{
                      pathname: "/posters/" + this.props.auth.uid,
                      state: {
                        tileChosen: 4
                      }
                    }}
                  >
                    {this.state.tileChosen === 4 ? (
                      <img
                        className="tilesselectedprofile"
                        onClick={this.tileChoose4}
                        src="https://www.dl.dropboxusercontent.com/s/rdx2xb7xczvomd1/EVENTTYPES_Housing.png?dl=0"
                        alt="error"
                      />
                    ) : (
                      <img
                        className="tilesnotselectedprofile"
                        onClick={this.tileChoose4}
                        src="https://www.dl.dropboxusercontent.com/s/jamhnuor263bx8z/TILES_Housing%20%28closed%29%20%281%29.png?dl=0"
                        alt="error"
                      />
                    )}
                  </Link>
                </div>
              ) : null}
              {this.props.user.data.shops ? (
                <div>
                  <Link
                    to={{
                      pathname: "/posters/" + this.props.auth.uid,
                      state: {
                        tileChosen: 5
                      }
                    }}
                  >
                    {this.state.tileChosen === 5 ? (
                      <img
                        className="tilesselectedprofile"
                        onClick={this.tileChoose5}
                        src="https://www.dl.dropboxusercontent.com/s/3t3b223xt8rt0zt/EVENTTYPES_Shops.png?dl=0"
                        alt="error"
                      />
                    ) : (
                      <img
                        className="tilesnotselectedprofile"
                        onClick={this.tileChoose5}
                        src="https://www.dl.dropboxusercontent.com/s/yj95k4p9e1j6koq/EVENTTYPES_Shops%20%28closed%29.png?dl=0"
                        alt="error"
                      />
                    )}
                  </Link>
                </div>
              ) : null}
              {this.props.user.data.restaurants ? (
                <div>
                  <Link
                    to={{
                      pathname: "/posters/" + this.props.auth.uid,
                      state: {
                        tileChosen: 6
                      }
                    }}
                  >
                    {this.state.tileChosen === 6 ? (
                      <img
                        className="tilesselectedprofile"
                        onClick={this.tileChoose6}
                        src="https://www.dl.dropboxusercontent.com/s/0vtvmbjgruqv0z7/EVENTTYPES_Restaurants.png?dl=0"
                        alt="error"
                      />
                    ) : (
                      <img
                        className="tilesnotselectedprofile"
                        onClick={this.tileChoose6}
                        src="https://www.dl.dropboxusercontent.com/s/0mtamjp1faf29tx/EVENTTYPES_Restaurants%20%28closed%29%20%281%29.png?dl=0"
                        alt="error"
                      />
                    )}
                  </Link>
                </div>
              ) : null}
              {this.props.user.data.bars ? (
                <div>
                  <Link
                    to={{
                      pathname: "/posters/" + this.props.auth.uid,
                      state: {
                        tileChosen: 7
                      }
                    }}
                  >
                    {this.state.tileChosen === 7 ? (
                      <img
                        className="tilesselectedprofile"
                        onClick={this.tileChoose7}
                        src="https://www.dl.dropboxusercontent.com/s/6qp0bsjfr4di3w0/CENTER%20PLUS_Event.png?dl=0"
                        alt="error"
                      />
                    ) : (
                      <img
                        className="tilesnotselectedprofile"
                        onClick={this.tileChoose7}
                        src="https://www.dl.dropboxusercontent.com/s/7e40g2z2kah8hf8/EVENTTYPES_Are%20you%2021_%20%28closed%29.png?dl=0"
                        alt="error"
                      />
                    )}
                  </Link>
                </div>
              ) : null}
              {this.props.user.data.services ? (
                <div>
                  <Link
                    to={{
                      pathname: "/posters/" + this.props.auth.uid,
                      state: {
                        tileChosen: 8
                      }
                    }}
                  >
                    {this.state.tileChosen === 8 ? (
                      <img
                        className="tilesselectedprofile"
                        onClick={this.tileChoose8}
                        src="https://www.dl.dropboxusercontent.com/s/0jjuyb2cn56zvsh/EVENTTYPES_Services.png?dl=0"
                        alt="error"
                      />
                    ) : (
                      <img
                        className="tilesnotselectedprofile"
                        onClick={this.tileChoose8}
                        src="https://www.dl.dropboxusercontent.com/s/r7sta0v63jpx4t6/EVENTTYPES_Services%20%28closed%29%20%281%29.png?dl=0"
                        alt="error"
                      />
                    )}
                  </Link>
                </div>
              ) : null}
              {this.props.user.data.proposals ? (
                <div>
                  <Link
                    to={{
                      pathname: "/posters/" + this.props.auth.uid,
                      state: {
                        tileChosen: 9
                      }
                    }}
                  >
                    {this.state.tileChosen === 9 ? (
                      <img
                        className="tilesselectedprofile"
                        onClick={this.tileChoose9}
                        src="https://www.dl.dropboxusercontent.com/s/pmgrqoorrymamcm/EVENTTYPES_Shops%20%281%29.png?dl=0"
                        alt="error"
                      />
                    ) : (
                      <img
                        className="tilesnotselectedprofile"
                        onClick={this.tileChoose9}
                        src="https://www.dl.dropboxusercontent.com/s/v9o41yy1v3rysq6/EVENTTYPES_Proposals%20%28closed%29.png?dl=0"
                        alt="error"
                      />
                    )}
                  </Link>
                </div>
              ) : null}
            </div>
          ) : null}
          {/*<QRReader/>*/}
        </div>
      </div>
    );
  }
}
export default ProfileSlideDrawer;
