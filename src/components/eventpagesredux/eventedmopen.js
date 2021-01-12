import React from "react";
import { fireStore } from "../.././init-firebase";
import { Link } from "react-router-dom";
import back777 from ".././Icons/Images/back777.png";
import dayjs from "dayjs";

import "./eventopen.css";

export const WEEK_DAYS = {
  0: "SUNDAY",
  1: "MONDAY",
  2: "TUESDAY",
  3: "WEDNESDAY",
  4: "THURSDAY",
  5: "FRIDAY",
  6: "SATURDAY"
};
class Eventedmopen extends React.Component {
  constructor(props) {
    super(props);
    //const { id } = this.props;
    this.state = {
      title:
        this.props.eventEdm && this.props.eventEdm.name
          ? this.props.eventEdm.name
          : this.props.eventEdm
          ? this.props.eventEdm.artistList[0].name
          : null,
      body: this.props.eventEdm ? this.props.eventEdm.artistList : null,
      //chosenPhoto: this.props.plan.chosenPhoto,
      date:
        this.props.eventEdm && this.props.eventEdm.date
          ? new Date(this.props.eventEdm.date).toISOString()
          : null,
      planEditOpen: false,
      address: this.props.eventEdm ? this.props.eventEdm.venue.address : null,
      text: "",
      messages: [],
      eventEdmID: this.props.id && this.props.id,
      mounted: false
    };
    // create a ref to store the textInput DOM element
    this.textInput = React.createRef();
    //this.handleDate = this.handleDate.bind(this);
  }
  handleSend = e => {
    e.preventDefault();
    this.setState({ text: "" });
    this.props.sendMessage(this.state);
  };
  handleSend = e => {
    e.preventDefault();
    const { user } = this.props;
    const anonID = "anonID";
    const anon = "anon";
    this.setState({ text: "", messages: [] });
    fireStore
      .collection("messages")
      .add({
        eventroom: this.props.eventEdm.id,
        message: this.state.text,
        authorId: this.state.authorId ? this.state.authorId : anonID,
        username: user && user.username ? user.username : anon,
        date: new Date()
      })
      .then(ref => {
        console.log("document ID: ", ref.id);
      });
  };
  removeMessage(e) {
    /*console.log(e)
    console.log(this.state.messages)
    let filteredArray = this.state.messages.filter(item => {
      console.log(item)
      return item !== e}
      )
    this.setState({messages: filteredArray})*/
    this.setState({ messages: [] }, () => {
      fireStore
        .collection("messages")
        .doc(e)
        .delete()
        .then(ref => {
          console.log("deleted document" + ref);
        })
        .catch(err => console.log(err));
    });
  }
  componentDidMount = () => {
    if (this.state.mounted === false) {
      this.setState({ mounted: true });
    }
    let x = [];
    this.props.eventEdm &&
      this.props.eventEdm.id &&
      fireStore
        .collection("messages")
        .where("eventroom", "==", this.props.eventEdm.id)
        .onSnapshot(querySnapshot => {
          console.log(querySnapshot);
          this.setState({ messages: [] }, () => {
            x = [];
            querySnapshot.forEach(doc => {
              console.log(doc);
              var look = doc.data();
              look.id = doc.id;
              console.log(look);
              x.push(look);
              this.setState({ messages: x });
            });
          });
          /*querySnapshot.docChanges().forEach(change => {
            console.log(change);
            if (change.type === "removed") {
              console.log(this.state.messages);
              var lookey = change.doc.data();
              lookey.id = change.doc.id;
              let x = [];
              const statebucket = this.state.messages.forEach(message => {
                if (message.id !== lookey.id) x.push(message);
              });
              this.setState({
                messages: statebucket
              });
              //this.removeMessage(lookey)
              console.log(
                "Removed message: ",
                change.doc.data(),
                change.doc.id
              );
              //this.setState({messages: this.state.messages.includes(change.doc.id));
            }
          });*/
        });
    this.props.auth &&
      this.setState({
        eventEdmID: this.props.id,
        authorId: this.props.auth.uid
      });
  };
  componentWillUnmount = () => {
    this.setState({ mounted: false });
  };
  render() {
    //console.log(this.state.date);
    const { eventEdm } = this.props;
    //const date = new Date(plan.d.date.seconds)
    const today = new Date().getTime();
    if (eventEdm) {
      const eventdate = new Date(eventEdm.date).getTime();
      console.log(today);
      console.log(eventdate);
      const href = this.props.eventEdm.ticketLink;
      if (today > eventdate && this.props.messages) {
        this.props.messages &&
          this.props.messages.map(message => {
            return this.props.deleteMessage(message.id);
          });
      }
      if (today > eventdate && !this.state.old) {
        this.setState({ old: true });
      }
      var eventDate1 = new Date(eventdate);
      //console.log(eventDate1);
      function renderTime(date) {
        let d = dayjs(date);
        return d.format("h:mm a");
      }
      function renderDate(date) {
        let d = dayjs(date);
        return d.format("MMMM D YYYY");
      }
      var datenotime = new Date();
      datenotime.setHours(eventDate1.getHours(), eventDate1.getMinutes(), 0, 0);
      eventDate1.setSeconds(0);
      eventDate1.setMilliseconds(0);
      var diffDays = Math.round(
        (datenotime.getTime() - eventDate1.getTime()) / 86400000
      );
      var is_negative = diffDays < 0;
      return (
        <div>
          <Link to="/">
            <img src={back777} className="eventbackopen" alt="error" />
          </Link>

          <div className="eventopen_Header">{this.state.title}</div>
          <div className="chatbox">
            <div className="eventopenstarttime">
              <div className="timeofeventinside">
                Edmtrain.com
                {diffDays === 0
                  ? ` today`
                  : diffDays === -1
                  ? ` tomorrow`
                  : diffDays === 1
                  ? ` yesterday`
                  : is_negative
                  ? ` in ${Math.abs(diffDays)} days`
                  : ` ${diffDays} days ago`}
              </div>
              <div className="todaytomorroweventinside">
                {diffDays === 0
                  ? `${WEEK_DAYS[eventDate1.getDay()]} ${renderDate(
                      eventDate1
                    )}`
                  : diffDays === -1
                  ? `${WEEK_DAYS[eventDate1.getDay()]} ${renderDate(
                      eventDate1
                    )}`
                  : diffDays === 1
                  ? `${WEEK_DAYS[eventDate1.getDay()]} ${renderDate(
                      eventDate1
                    )}`
                  : is_negative
                  ? `${WEEK_DAYS[eventDate1.getDay()]} ${renderDate(
                      eventDate1
                    )}`
                  : `${WEEK_DAYS[eventDate1.getDay()]} ${renderDate(
                      eventDate1
                    )}`}
              </div>
            </div>
            <div className="eventopendescription">
              {this.state.body && this.state.body.length > 1
                ? this.state.body.map(i => <div>{i.name}</div>)
                : this.state.body && this.state.body[0]
                ? this.state.body[0].name
                : null}
              <br />
              {this.props.eventEdm ? (
                <a href={this.props.eventEdm.ticketLink}>
                  {this.props.eventEdm.ticketLink}
                </a>
              ) : null}
              <br />
              {this.props.eventEdm.ages ? this.props.eventEdm.ages : null}
              <br />
              {this.state.address}
            </div>
            <div className="messages">
              {this.state.messages &&
                this.state.messages
                  .sort((a, b) => {
                    if (a.date.seconds < b.date.seconds) return 1;
                    if (a.date.seconds > b.date.seconds) return -1;
                    return 0;
                  })
                  .map(message => {
                    return (
                      <div key={message.id}>
                        {message.username}: {message.message}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <p onClick={() => this.removeMessage(message.id)}>
                          &times;
                        </p>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {new Date(
                          message.date.seconds * 1000
                        ).toLocaleTimeString()}
                        {new Date(
                          message.date.seconds * 1000
                        ).toLocaleDateString()}
                      </div>
                    );
                  })}
            </div>
            {this.state.agePromised ? (
              <form
                className="stopformexp"
                onSubmit={this.state.text === "" ? null : this.handleSend}
              >
                <input
                  className="textbox4chat"
                  placeholder={this.state.old ? "-" : "Type something.."}
                  onChange={event =>
                    this.setState({ text: event.target.value })
                  }
                  value={this.state.text}
                />
              </form>
            ) : this.state.hideChatterBox ? null : (
              <div className="textbox4chat">
                Are you above 13?
                <div onClick={() => this.setState({ agePromised: true })}>
                  Yes
                </div>
                <div
                  onClick={() =>
                    this.setState({ hideChatterBox: true, agePromised: false })
                  }
                >
                  No
                </div>
              </div>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div className="container center">
          <p>Loading project...</p>
        </div>
      );
    }
  }
}

export default Eventedmopen;

/*import React from "react";
import { fireStore } from "../.././init-firebase";
import { Link } from "react-router-dom";
import back777 from ".././Icons/Images/back777.png";
import dayjs from "dayjs";

import "./eventopen.css";

export const WEEK_DAYS = {
  0: "SUNDAY",
  1: "MONDAY",
  2: "TUESDAY",
  3: "WEDNESDAY",
  4: "THURSDAY",
  5: "FRIDAY",
  6: "SATURDAY"
};
class Eventedmopen extends React.Component {
  constructor(props) {
    super(props);
    //const { id } = this.props;
    this.state = {
      title:
        this.props.eventEdm && this.props.eventEdm.name
          ? this.props.eventEdm.name
          : this.props.eventEdm
          ? this.props.eventEdm.artistList[0].name
          : null,
      body: this.props.eventEdm ? this.props.eventEdm.artistList : null,
      //chosenPhoto: this.props.plan.chosenPhoto,
      date:
        this.props.eventEdm && this.props.eventEdm.date
          ? new Date(this.props.eventEdm.date).toISOString()
          : null,
      planEditOpen: false,
      address: this.props.eventEdm ? this.props.eventEdm.venue.address : null,
      text: "",
      messages: [],
      eventEdmID: this.props.id && this.props.id,
      mounted: false
    };
    // create a ref to store the textInput DOM element
    this.textInput = React.createRef();
    //this.handleDate = this.handleDate.bind(this);
  }
  handleSend = e => {
    e.preventDefault();
    this.setState({ text: "" });
    this.props.sendMessage(this.state);
  };
  handleSend = e => {
    e.preventDefault();
    const { user } = this.props;
    const anonID = "anonID";
    const anon = "anon";
    this.setState({ text: "", messages: [] });
    fireStore
      .collection("messages")
      .add({
        eventroom: this.props.eventEdm.id,
        message: this.state.text,
        authorId: this.state.authorId ? this.state.authorId : anonID,
        username: user && user.username ? user.username : anon,
        date: new Date()
      })
      .then(ref => {
        console.log("document ID: ", ref.id);
      });
  };
  removeMessage(e) {
    /*console.log(e)
    console.log(this.state.messages)
    let filteredArray = this.state.messages.filter(item => {
      console.log(item)
      return item !== e}
      )
    this.setState({messages: filteredArray})
    this.setState({ messages: [] }, () => {
      fireStore
        .collection("messages")
        .doc(e)
        .delete()
        .then(ref => {
          console.log("deleted document" + ref);
        })
        .catch(err => console.log(err));
    });
  }
  componentDidMount = () => {
    if (this.state.mounted === false) {
      this.setState({ mounted: true });
    }
    let x = [];
    this.props.eventEdm &&
      this.props.eventEdm.id &&
      fireStore
        .collection("messages")
        .where("eventroom", "==", this.props.eventEdm.id)
        .onSnapshot(querySnapshot => {
          console.log(querySnapshot);
          this.setState({ messages: [] }, () => {
            x = [];
            querySnapshot.forEach(doc => {
              console.log(doc);
              var look = doc.data();
              look.id = doc.id;
              console.log(look);
              x.push(look);
              this.setState({ messages: x });
            });
          });
          /*querySnapshot.docChanges().forEach(change => {
            console.log(change);
            if (change.type === "removed") {
              console.log(this.state.messages);
              var lookey = change.doc.data();
              lookey.id = change.doc.id;
              let x = [];
              const statebucket = this.state.messages.forEach(message => {
                if (message.id !== lookey.id) x.push(message);
              });
              this.setState({
                messages: statebucket
              });
              //this.removeMessage(lookey)

              console.log(
                "Removed message: ",
                change.doc.data(),
                change.doc.id
              );
              //this.setState({messages: this.state.messages.includes(change.doc.id));
            }
          });
        });
    this.props.auth &&
      this.setState({
        eventEdmID: this.props.id,
        authorId: this.props.auth.uid
      });
  };
  componentWillUnmount = () => {
    this.setState({ mounted: false });
  };
  render() {
    //console.log(this.state.date);
    const { eventEdm } = this.props;
    //const date = new Date(plan.d.date.seconds)
    const today = new Date().getTime();
    if (eventEdm) {
      const eventdate = new Date(eventEdm.date).getTime();
      console.log(today);
      console.log(eventdate);
      const href = this.props.eventEdm.ticketLink;
      if (today > eventdate && this.props.messages) {
        this.props.messages &&
          this.props.messages.map(message => {
            return this.props.deleteMessage(message.id);
          });
      }
      if (today > eventdate && !this.state.old) {
        this.setState({ old: true });
      }
      var eventDate1 = new Date(eventdate);
      //console.log(eventDate1);
      function renderTime(date) {
        let d = dayjs(date);
        return d.format("h:mm a");
      }
      function renderDate(date) {
        let d = dayjs(date);
        return d.format("MMMM D YYYY");
      }
      var datenotime = new Date();
      datenotime.setHours(eventDate1.getHours(), eventDate1.getMinutes(), 0, 0);
      eventDate1.setSeconds(0);
      eventDate1.setMilliseconds(0);
      var diffDays = Math.round(
        (datenotime.getTime() - eventDate1.getTime()) / 86400000
      );
      var is_negative = diffDays < 0;
      return (
        <div>
          <Link to="/">
            <img src={back777} className="eventbackopen" alt="error" />
          </Link>

          <div className="eventopen_Header">{this.state.title}</div>
          <div className="chatbox">
            <div className="eventopenstarttime">
              <div className="timeofeventinside">
                Edmtrain.com
                {diffDays === 0
                  ? ` today`
                  : diffDays === -1
                  ? ` tomorrow`
                  : diffDays === 1
                  ? ` yesterday`
                  : is_negative
                  ? ` in ${Math.abs(diffDays)} days`
                  : ` ${diffDays} days ago`}
              </div>
              <div className="todaytomorroweventinside">
                {diffDays === 0
                  ? `${WEEK_DAYS[eventDate1.getDay()]} ${renderDate(
                      eventDate1
                    )}`
                  : diffDays === -1
                  ? `${WEEK_DAYS[eventDate1.getDay()]} ${renderDate(
                      eventDate1
                    )}`
                  : diffDays === 1
                  ? `${WEEK_DAYS[eventDate1.getDay()]} ${renderDate(
                      eventDate1
                    )}`
                  : is_negative
                  ? `${WEEK_DAYS[eventDate1.getDay()]} ${renderDate(
                      eventDate1
                    )}`
                  : `${WEEK_DAYS[eventDate1.getDay()]} ${renderDate(
                      eventDate1
                    )}`}
              </div>
            </div>
            <div className="eventopendescription">
              {this.state.body && this.state.body.length > 1
                ? this.state.body.map(i => <div>{i.name}</div>)
                : this.state.body
                ? this.state.body[0].name
                : null}
              <br />
              {this.props.eventEdm ? (
                <a href={this.props.eventEdm.ticketLink}>
                  {this.props.eventEdm.ticketLink}
                </a>
              ) : null}
              <br />
              {this.props.eventEdm.ages ? this.props.eventEdm.ages : null}
              <br />
              {this.state.address}
            </div>
            <div className="messages">
              {this.state.messages &&
                this.state.messages
                  .sort((a, b) => {
                    if (a.date.seconds < b.date.seconds) return 1;
                    if (a.date.seconds > b.date.seconds) return -1;
                    return 0;
                  })
                  .map(message => {
                    return (
                      <div key={message.id}>
                        {message.username}: {message.message}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <p onClick={() => this.removeMessage(message.id)}>
                          &times;
                        </p>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {new Date(
                          message.date.seconds * 1000
                        ).toLocaleTimeString()}
                        {new Date(
                          message.date.seconds * 1000
                        ).toLocaleDateString()}
                      </div>
                    );
                  })}
            </div>
            <form
              className="stopformexp"
              onSubmit={this.state.text === "" ? null : this.handleSend}
            >
              <input
                className="textbox4chat"
                placeholder={this.state.old ? "-" : "Type something.."}
                onChange={event => this.setState({ text: event.target.value })}
                value={this.state.text}
              />
            </form>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container center">
          <p>Loading project...</p>
        </div>
      );
    }
  }
}

export default Eventedmopen;*/
