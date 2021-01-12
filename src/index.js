import React from "react";
import ReactDOM from "react-dom";
//import PropTypes from "prop-types";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import firebase from "./init-firebase";

class ImportFireToBase extends React.Component {
  constructor() {
    super();
    this.state = {
      auth: undefined,
      users: undefined,
      user: undefined,
      stripe: null
    };
  }
  componentDidMount = () => {
    this.getUserInfo();
  };
  getUserInfo = async () => {
    this.setState({ stop: true });
    let users = [];
    firebase.auth().onAuthStateChanged((meAuth) => {
      if (meAuth) {
        this.setState({ auth: meAuth });
      }
      //console.log(meAuth.uid);
    });
    firebase
      .firestore()
      .collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          if (doc.exists) {
            let id = doc.id;
            let data = doc.data();
            users.push({ data: data, id: id });
            //console.log(users);
            //console.log(id);
            this.setState({ users });
          }
        });
        users.map((user) => {
          //console.log(user);
          //console.log("l");
          if (
            this.state.auth &&
            this.state.auth.uid &&
            user.id === this.state.auth.uid
          ) {
            //console.log("in");
            this.setState({ user });
          }
          return null;
        });
      })
      .catch((error) => {
        console.log("Error getting documents:", error);
      });
  };
  render() {
    return (
      <App
        auth={this.state.auth}
        users={this.state.users}
        user={this.state.user}
      />
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <ImportFireToBase />
  </BrowserRouter>,
  rootElement
);
