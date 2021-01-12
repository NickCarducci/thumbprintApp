import React from "react";
import { Redirect } from "react-router-dom";
import firebase, { fireStore, auth } from "./init-firebase";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
//import Slider from "react-input-slider";
import "./SignupConfirm.css";

import "./login.css";
//import SignupConfirm from "./SignupConfirm";
const initialState = {
  uid: "",
  phone: "",
  lastAttemptedPhone: "",
  password: "",
  username: "",
  name: "",
  id: "",
  tickets: [],
  events: [],
  clubs: [],
  jobs: [],
  housing: [],
  shops: [],
  restaurants: [],
  bars: [],
  services: [],
  proposals: [],
  authError: "",
  textedCode: "",
  alertExistingUser: false,
  noUserPleaseSignUp: null,
  recaptchaGood: false,
  showrecaptcha: false,
  recaptchaResponse: "",
  normalFinish: false,
  loading: false,
  working: true,
  above13: false,
  volume: 0,
  time: 0,
  playing: false,
  closeContinue: false,
  goSignupConfirm: false,
  watchingSignupVideo: false
};
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: this.props.auth && this.props.auth.uid ? this.props.auth.uid : "",
      phone:
        this.props.auth && this.props.auth.phoneNumber
          ? this.props.auth.phoneNumber
          : "",
      lastAttemptedPhone: "",
      username:
        this.props.user && this.props.user.username
          ? this.props.user.username
          : "",
      name: this.props.user && this.props.user.name ? this.props.user.name : "",
      authError: "",
      textedCode: "",
      alertExistingUser: false,
      noUserPleaseSignUp: null,
      recaptchaGood: false,
      showrecaptcha: false,
      recaptchaResponse: "",
      normalFinish: false,
      loading: false,
      working: true,
      above13: false,
      volume: 0,
      time: 0,
      playing: false,
      closeContinue: false,
      goSignupConfirm: false,
      watchingSignupVideo: false
    };
    this.menuGrabber = React.createRef();
    this.recaptcha1 = React.createRef();
  }

  /*requestTextCodeBox = e => {
    e.preventDefault();
    this.props.signIn(this.state);
  };*/

  changeTime = y => {
    this.refs.vidRef.currentTime = y;
    this.setState({ time: y });

    /*if(this.state.time !== this.refs.vidRef.currentTime){
      this.setState({ time: this.refs.vidRef.currentTime });
    }*/
  };
  playContinue = () => {
    this.setState({ closeContinue: true });
    this.playVideo();
  };
  playVideo() {
    this.refs.vidRef.play();
    this.setState({ playing: true });
  }
  pauseVideo = () => {
    // Pause as well
    this.refs.vidRef.pause();
    this.setState({ playing: false });
  };
  handleChange = (e, users) => {
    if (e.target.id === "phone") {
      this.setState({
        [e.target.id]: "+1" + e.target.value
      });
    } else if (e.target.id === "username") {
      const enteredUsername = e.target.value;
      const usernames = [];
      users && users.map(user => usernames.push(user.name));
      if (usernames.includes(enteredUsername)) {
        this.setState({ newUserPlease: true });
      } else {
        this.setState({
          [e.target.id]: enteredUsername
        });
      }
    } else {
      this.setState({
        [e.target.id]: e.target.value
      });
    }
  };

  confirmCode = e => {
    e.preventDefault();
    //console.log(this.state.textedCode);
    window.confirmationResult
      .confirm(this.state.textedCode)
      .then(async result => {
        var user = result.user;
        //console.log(user);
        //window.location.reload();
        console.log("NormalFinish");
        const start = this.state;
        console.log(user.uid);
        console.log("No such document! Adding to firestore...");
        fireStore
          .collection("users")
          .doc(user.uid)
          .set({
            username: start.username,
            name: start.name
          })
          .catch(err => {
            console.log(err);
          });
        if (!this.props.user) {
          this.props.history.push("/");
          this.props.goSignupConfirmed();
        } else {
          window.location.reload();
        }

        /*
        await fetch(
          "https://us-central1-thumbprint-1c31n.cloudfunctions.net/newDesignerKey"
        )
          .then(async response => await response.json())
          .then(json => {
            console.log(json.id);
            start.Seastioid = json.id;
          })
          .catch(err => {
            this.setState({ authError: err });
            console.log(err);
          });*/
      })
      .catch(err => {
        this.setState({ authError: err });
        console.log(err);
      });
  };
  /*UNSAFE_componentWillUpdate = () => { 
if(this.state.Seastioid !== ""){
  this.props.signUp(this.state)
  this.props.goSignupConfirmed();
}
  }*/
  //SignIn && SignUp
  requestTextCodeBox = () => {
    //if (this.state.appVerifier === "") return this.stopSubmit;
    //this.setState({ loading: true });
    console.log(this.state.textedCode);
    //const firestore = getFirestore();
    console.log("ok");
    this.setState({ lastAttemptedPhone: this.state.phone });
    auth
      .signInWithPhoneNumber(this.state.phone, this.state.appVerifier)
      .then(confirmationResult => {
        console.log(confirmationResult);
        window.confirmationResult = confirmationResult;
        console.log("yo");
      })
      .catch(err => {
        console.log(err);
        this.setState({
          loading: false,
          noUserPleaseSignUp: null,
          showrecaptcha: false,
          recaptchaGood: false,
          authError: err.message
        });
      });
  };
  componentDidMount = () => {
    //this.firebase = firebase
    /*if (!this.props.loginOpenstate) {
      this.props.loginOpen();
    }
    this.menuGrabber.current.addEventListener("gestureend", e => {
      e.preventDefault();
      console.log("touched");
      if (e.scale < 1) {
        this.props.menuOpener();
      }
    });*/
    this.refs.vidRef &&
      this.refs.vidRef.addEventListener("volumechange", event => {
        this.setState({ volume: event });
      });
    this.refs.vidRef &&
      this.refs.vidRef.addEventListener("timeupdate", e => {
        const time = e.target.currentTime;
        const timecut = time.toString().substr(0, time.toString().length - 5);
        this.setState({
          time: timecut,
          duration: e.target.duration
        });
      });
    if (this.props.menuOpen) {
      this.props.closeMenu();
    }
    console.log("ok");
    console.log(this.props.userLoaded);
    if (window.location.pathname === "/login") {
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        this.recaptcha1.current,
        {
          size: "normal",
          callback: response => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            // ...
            console.log(response);
            //const jsonresponse = await response.toString()
            //this.setState({ recaptchaResponse: response });
            this.setState({
              lastAttemptedPhone: this.state.phone,
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
        }
      );

      const appVerifier = window.recaptchaVerifier;
      appVerifier.render();
      if (this.state.appVerifier !== appVerifier) {
        this.setState({ appVerifier });
      }
    }
  };

  checkPhoneTaken = e => {
    e.preventDefault();
    const usphone = this.state.phone;
    this.setState({ authError: "", loading: true, working: true }, async () => {
      await fetch(
        "https://us-central1-thumbprint-1c31n.cloudfunctions.net/doesUserPhoneExist",
        {
          method: "POST",
          //credentials: "include",
          headers: {
            "Content-Type": "Application/JSON",
            "Access-Control-Request-Method": "POST"
          },
          body: JSON.stringify({ usphone: usphone }),
          maxAge: 3600
          //"mode": "cors",
        }
      )
        .then(async response => await response.text())
        .then(body => {
          if (this.state.noUserPleaseSignUp) {
            console.log(body);
            console.log("Successfully fetched user data, signup:", body);
            if (body === this.state.phone) {
              this.setState({
                showrecaptcha: true,
                noUserPleaseSignUp: false,
                loading: false
              });
              console.log("user exists, please sign in");
            }
          } else if (!this.state.noUserPleaseSignUp) {
            console.log(body);
            console.log("Successfully fetched user data, login:", body);
            if (body === this.state.phone) {
              //this.setState({ noUserPleaseSignUp: null });
              this.setState({
                showrecaptcha: true,
                noUserPleaseSignUp: false,
                loading: false
              });
              console.log("user exists, here's the recaptcha");
            }
          }
        })
        .catch(err => {
          if (this.state.noUserPleaseSignUp) {
            console.log("No user phone!");
            //this.setState({ noUserPleaseSignUp: null });
            console.log("no user exists, here's the recaptcha");
            this.setState({
              showrecaptcha: true,
              noUserPleaseSignUp: true,
              loading: false
            });
          } else if (!this.state.noUserPleaseSignUp) {
            console.log("No user phone!");
            console.log("no user exists, please sign up");
            console.log(err);
            this.setState({
              showrecaptcha: false,
              noUserPleaseSignUp: true,
              loading: false
            });
          }
        });
    });
  };

  stopSubmit(e) {
    e.preventDefault();
    return false;
  }
  clickHandle = () => {
    /*if (this.props.history.length > 1 && this.props.location.pathname !== prevProps.history.location){this.props.history.goBack();}
    else {*/
    this.props.chatcloser();
    this.props.history.push("/plan");
  };
  handleOptionChange = e => {
    if (e.target.id === "above") {
      this.setState({
        above13: e.target.value
      });
    }
    if (e.target.id === "below") {
      this.setState({
        above13: !e.target.value
      });
    }
  };
  render() {
    //console.log(this.props.auth.uid);
    //console.log(this.state.noUserPleaseSignUp);
    let backdrop;
    //console.log(this.props.meData)
    //console.log(this.props.history.length);
    const { users } = this.props;

    let { from } = this.props.location.state || {
      from: { pathname: "/" }
    };
    if (
      this.props.auth &&
      this.props.auth.uid &&
      this.props.user &&
      this.props.user.username
    ) {
      return <Redirect to={from} />;
    }
    return (
      <div /*ref={this.menuGrabber} */>
        <div className="login">
          <img
            className="alternative"
            src="https://www.dl.dropboxusercontent.com/s/9ctrgn3angb8zz4/Screen%20Shot%202019-10-02%20at%2011.30.21%20AM.png?dl=1"
            alt="error"
          />
          <video
            ref="vidRef"
            id="background-video"
            loop
            autoPlay
            playsInline
            muted
          >
            <source
              src="https://www.dl.dropboxusercontent.com/s/eqdqu6op7pa2wmg/My%20Movie%2015.mp4?dl=1"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <div className="absolutethem">
            <div onClick={this.clickHandle} className="plusrightexit">
              &times;
            </div>
            <form
              onSubmit={e =>
                !this.state.showrecaptcha && !this.state.authError
                  ? this.checkPhoneTaken(e)
                  : this.stopSubmit(e)
              }
              className="form1"
            >
              <div className="loginsentence">
                You must log in to view {from.pathname}
                <br />
                standard rates apply
              </div>
              {this.state.noUserPleaseSignUp !== true ? (
                <div className="loginwarning">
                  Your calendar & chats are stored locally. Chats (will be)
                  encrypted, then downloaded when both users have thumbprint.app
                  open in the browser through webRTC connection.
                  <br />
                  <br />
                  Your phone, username, name, public comments & posts, like
                  events, are stored in Firestore. We reserve rights to delete
                  old or inappropriate public content, out of beta. This is
                  beta.
                  <br />
                  <br />
                  Sim card security depends on your Internet Service Provider's
                  identification process and some identity theft happens.
                </div>
              ) : null}
              <div>
                {this.state.authError ? this.state.authError.toString() : null}
                {this.state.noUserPleaseSignUp === null
                  ? null
                  : this.state.noUserPleaseSignUp
                  ? "no user exists, use recaptcha to get auth text"
                  : "user exists, use recaptcha to get auth text"}
              </div>
              <br />
              {this.state.noUserPleaseSignUp && !this.state.authError ? (
                <label
                  required
                  onChange={event => this.handleOptionChange(event)}
                >
                  No&nbsp;{" "}
                  <input
                    onClick={() => {
                      this.setState({ above13: false });
                    }}
                    type="checkbox"
                    value="below"
                    checked={this.state.above13 === false}
                    onChange={this.handleOptionChange}
                  />
                  &nbsp; are you 13 or older?
                  <br />
                  ■-■¬(≖_≖ )&nbsp;{" "}
                  <input
                    onClick={() => {
                      this.setState({ above13: true });
                    }}
                    type="checkbox"
                    value="above"
                    checked={this.state.above13 === true}
                    onChange={this.handleOptionChange}
                  />
                  &nbsp; Yes
                </label>
              ) : null}
              <div>
                <label htmlFor="phone" className="spaceforphone">
                  Phone{" "}
                </label>
                {/*<input
                required
                type="tel"
                id="phone"
                onChange={this.state.authError ? null : this.handleChange}
              />
                className={this.state.authError ? "input-fielddark" : "input-field"}*/}
                <PhoneInput
                  country="US"
                  required
                  placeholder="Enter phone number"
                  value={this.state.phone}
                  onChange={value => this.setState({ phone: value })}
                  type="tel"
                  //countrySelectComponent={CustomCountrySelect}
                />
                <div onClick={() => this.setState(initialState)}>&#8634;</div>
                {this.state.noUserPleaseSignUp && !this.state.authError ? (
                  <div>
                    {this.state.above13 === false ? (
                      <div>
                        <label htmlFor="username">Parent email </label>
                        <input
                          required
                          className="input-field"
                          type="email"
                          id="parentEmail"
                          value={this.state.parentEmail}
                          onChange={this.handleChange}
                          minLength="2"
                        />
                      </div>
                    ) : null}
                    <div>
                      <label htmlFor="username">Username </label>
                      <input
                        required
                        className="input-field"
                        type="username"
                        id="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                        minLength="2"
                      />
                    </div>
                    <div>
                      <label htmlFor="username">Name </label>
                      <input
                        required
                        className="input-field"
                        type="name"
                        id="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                ) : null}

                {this.state.loading ? (
                  <img
                    src="https://www.dl.dropboxusercontent.com/s/le41i6li4svaz0q/802%20%282%29.gif?dl=0"
                    alt="error"
                  />
                ) : !this.state.showrecaptcha &&
                  !this.state.authError &&
                  this.state.phone !== this.state.lastAttemptedPhone ? (
                  <div className="loginsignup">
                    <button type="submit" className="loginbtn">
                      {this.state.noUserPleaseSignUp ? "Sign Up" : "Log in"}
                    </button>
                  </div>
                ) : null}
              </div>
            </form>
            <div
              className="openSignupVid"
              onClick={this.props.goSignupConfirmed}
            >
              ?
            </div>

            <div
              ref={this.recaptcha1}
              className={
                this.state.showrecaptcha ? "showrecaptcha" : "hiderecaptcha"
              }
            />
            {this.state.recaptchaGood && this.state.authError === "" ? (
              <form
                className="showphonecodeform"
                onSubmit={e => {
                  console.log("ya");
                  this.confirmCode(e);
                }}
              >
                <input
                  className="phonecodeinput"
                  placeholder="Verification Code"
                  id="textedCode"
                  onChange={this.handleChange}
                />
                <button className="showphonecodeformbtn" type="submit">
                  Confirm
                </button>
              </form>
            ) : null}

            <button className="previewbtn" onClick={this.clickHandle}>
              Preview
            </button>
          </div>
        </div>
        {backdrop}
      </div>
    );
  }
}

export default Login;
