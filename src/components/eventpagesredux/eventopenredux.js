import React from "react";
import { fireStore } from "../.././init-firebase";
import { GeoFirestore } from "geofirestore";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
//import dayjs from "dayjs";
import settings33 from ".././Icons/Images/settings33.png";
import back777 from ".././Icons/Images/back777.png";
//import PlanEdit from "./planeditredux";
import DateFnsUtils from "@date-io/date-fns";
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
//import Payticketbutton from "./payticketbutton";
//import { SeatsioEventManager } from "@seatsio/seatsio-react";

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
class Eventopenredux extends React.Component {
  constructor(props) {
    super(props);
    //const { id } = this.props;
    this.state = {
      title:
        this.props.eventChosen &&
        this.props.eventChosen.data &&
        this.props.eventChosen.data.title,
      body:
        this.props.eventChosen &&
        this.props.eventChosen.data &&
        this.props.eventChosen.data.body,
      //chosenPhoto: this.props.plan.chosenPhoto,
      date:
        this.props.eventChosen &&
        this.props.eventChosen.data &&
        this.props.eventChosen.data.date &&
        this.props.eventChosen.data.date._seconds * 1000,
      planEditOpen: false,
      address:
        this.props.eventChosen &&
        this.props.eventChosen.data &&
        this.props.eventChosen.data.address,
      text: "",
      messages: [],
      eventID:
        this.props.eventChosen &&
        this.props.eventChosen.id &&
        this.props.eventChosen.id,
      mounted: false
    };
    // create a ref to store the textInput DOM element
    this.textInput = React.createRef();
    //this.handleDate = this.handleDate.bind(this);
  }
  planEditOpener = () => {
    this.setState({
      planEditOpen: true
    });
  };
  planEditCloser = () => {
    this.setState({
      planEditOpen: false
    });
  };
  onDelete = id => {
    console.log(id);
    const geoFirestore = new GeoFirestore(fireStore);
    const geocollection = geoFirestore.collection("planner");
    geocollection
      .collection("planner")
      .doc(id)
      .delete();
    this.props.history.push("/");
  };
  handleChangeTitle = e => {
    this.setState({
      title: e.target.value
    });
  };
  handleChangeBody = e => {
    this.setState({
      body: e.target.value
    });
  };
  handleChangeDate = e => {
    const currentNote = { ...this.state };
    currentNote.date = e.toISOString();

    this.setState(currentNote);
    //this.setState({
    //date: e.target.value
    //});
  };
  handleChangeTime = e => {
    const currentNote = { ...this.state };
    currentNote.date = e.toISOString();

    this.setState(currentNote);
    //this.setState({
    //date: e.target.value
    //});
  };
  handleDate = e => {
    this.setState({
      date: e.target.value
    });
  };
  handleSubmit = id => {
    let event = this.state;
    const idstring = JSON.stringify(id);
    const geoFirestore = new GeoFirestore(fireStore);
    const geocollection = geoFirestore.collection("planner");
    geocollection.doc(idstring).update({
      ...event,
      updatedAt: new Date()
    });
    this.props.history.push("/events/:id");
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
        eventroom: this.props.eventChosen.id,
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
    this.setState({ messages: [] });
    fireStore
      .collection("messages")
      .doc(e)
      .delete()
      .then(ref => {
        console.log("deleted document" + ref);
      })
      .catch(err => console.log(err));
  }
  componentDidMount = () => {
    if (this.state.mounted === false) {
      this.setState({ mounted: true });
    }
    let x = [];
    this.props.eventChosen &&
      this.props.eventChosen.id &&
      fireStore
        .collection("messages")
        .where("eventroom", "==", this.props.eventChosen.id)
        .onSnapshot(querySnapshot => {
          console.log(querySnapshot);
          querySnapshot.forEach(doc => {
            console.log(doc);
            var look = doc.data();
            look.id = doc.id;
            console.log(look);
            x.push(look);
            this.setState({ messages: [...x] });
          });
          querySnapshot.docChanges().forEach(change => {
            console.log(change);
            if (change.type === "removed") {
              console.log(this.state.messages);
              var lookey = change.doc.data();
              lookey.id = change.doc.id;
              let x;
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
  };
  componentWillUnmount = () => {
    this.setState({ mounted: false });
  };
  render() {
    if (this.props.eventChosen) {
      //console.log(this.state.date);
      const { eventChosen, event, id } = this.props;

      //const date = new Date(plan.d.date.seconds)
      //if (eventChosen) {
      console.log(eventChosen + 1);
      let drawerClasses = "eventedit-drawer open";
      if (!this.state.planEditOpen) {
        drawerClasses = "eventedit-drawer";
      }
      var eventDate = eventChosen.data.date._seconds * 1000;
      console.log(eventDate);
      var eventDate1 = new Date(eventDate);
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
      if (!eventChosen) {
        return (
          <div className="containercenter">
            <p>Loading project...</p>
          </div>
        );
      } else {
        return (
          <div className="topeventdone">
            <Link to="/">
              <img src={back777} className="eventbackopen" alt="error" />
            </Link>

            <div className="eventopen_Header">{this.state.title}</div>
            <div className="chatbox">
              <div className="eventopenstarttime">
                <div>
                  <div className="timeofeventinside">
                    {eventChosen.data
                      ? diffDays === 0
                        ? renderTime(eventDate1)
                        : renderTime(eventDate1) //note.date.toLocaleString([], { hour12: true })
                      : "Edmtrain.com "}
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

            <div className={drawerClasses}>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  this.handleSubmit(e, id);
                }}
              >
                <input
                  className="eventopen_Header"
                  type="text"
                  name="title"
                  id="title"
                  value={this.state.title}
                  onChange={this.handleChangeTitle}
                  autoComplete="off"
                  required
                />

                <textarea
                  className="EventEdit_Description"
                  type="text"
                  name="body"
                  id="body"
                  value={this.state.body}
                  onChange={this.handleChangeBody}
                  placeholder="Write details here"
                  autoComplete="off"
                />
                <input className="save" type="submit" />
                <div className="cancel" onClick={this.planEditCloser}>
                  Cancel
                </div>

                <div className="dateordelete">
                  <div className="datechosen">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DatePicker
                        label="Due Date"
                        id="date"
                        value={this.state.date}
                        onChange={e => this.handleChangeDate(e)}
                        animateYearScrolling
                        showTodayButton={true}
                      />
                      <TimePicker
                        label="Time"
                        id="time"
                        value={this.state.date}
                        onChange={e => this.handleChangeTime(e)}
                        animateYearScrolling
                      />
                    </MuiPickersUtilsProvider>
                  </div>
                </div>

                <div className="deletebtn" onClick={() => this.onDelete(id)}>
                  Delete
                </div>
              </form>
            </div>
          </div>
        );
      }
    } else {
      return (
        <div
          className="nopageroute"
          onClick={() => this.props.history.push("/")}
        >
          waiting... click to go back home
        </div>
      );
    }
  }
}

export default Eventopenredux;

/*querySnapshot.docChanges().forEach(change => {
          console.log(change);
          if (change.type === "removed") {
            console.log(this.state.messages);
            var lookey = change.doc.data();
            lookey.id = change.doc.id;
            let x;
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
            )
            //this.setState({messages: this.state.messages.includes(change.doc.id));
          }
          if (change.type === "added") {
            console.log("New message: ", change.doc.data());
            var lookey = change.doc.data();
            lookey.id = change.doc.id;
            this.setState({ messages: [...this.state.messages, lookey] });
          }
          if (change.type === "modified") {
            console.log("Modified message: ", change.doc.data());
            var lookey = change.doc.data();
            lookey.id = change.doc.id;
            delete this.state.messages.id[lookey.id];
            this.setState({ messages: [...this.state.messages, lookey] });
          }
        })*/
