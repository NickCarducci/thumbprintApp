import React from "react";
//import ReactDOM from 'react-dom'
//import TilesBackdrop from ".././Tiles/TilesBackdrop";
//import TypesBackdrop from ".././EventTypes/EventTypesBackdrop";
//import EventTypes from "./EventTypes/EventTypes";
//import { Link } from "react-router-dom";
//import dayjs from "dayjs";

//import _ from "lodash";
import "./Events.css";
import Event from "./Event";
//const google = window.google;

export const WEEK_DAYS = {
  0: "SUNDAY",
  1: "MONDAY",
  2: "TUESDAY",
  3: "WEDNESDAY",
  4: "THURSDAY",
  5: "FRIDAY",
  6: "SATURDAY"
};
//const events = [];
//const list = [];
class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //tempPhoto: "https://www.dl.dropboxusercontent.com/s/ki7znsnrtqq643f/tobias-van-schneider-9QrjShkAmnM-unsplash.jpg?dl=0",
      center: [34.0522, -118.2437],
      distance: 15,
      city: "Los Angeles",
      cityapi: "Los%20Angeles",
      state: "CA",
      search: "",
      date: new Date(),
      typesOrTiles: null,
      switchCommunitiesOpen: false,
      switchCMapOpen: false,
      eventsOpen: false,
      story: null,
      lookBackAtIt: false,
      listTimes: [],
      etype: [
        "food",
        "business",
        "tech",
        "recreation",
        "education",
        "arts",
        "sports",
        "concerts",
        "parties",
        "festivals"
      ],
      scrollingRadius: false,
      todayOffset: 0,
      todayOffset1: 0,
      bounding: [],
      withinRadius: false,
      edmTrain: [],
      notToday: true,
      off: 0
    };
    this.menuGrabber = React.createRef();
    this.ref = React.createRef();
  }
  onKeyPressed = e => {};
  switchCommunitiesOpener = () => {
    this.setState({ switchCommunitiesOpen: !this.state.switchCommunitiesOpen });
  };
  switchCommunitiesCloser = () => {
    this.setState({ switchCommunitiesOpen: false });
  };
  updateSearch = event => {
    this.setState({ search: event.target.value.substr(0, 20) });
  };

  etypeChanger = e => {
    const targetid = e.target.id.toString();
    console.log(targetid);
    if (targetid === "all") {
      this.setState({
        etype: [
          "food",
          "business",
          "tech",
          "recreation",
          "education",
          "arts",
          "sports",
          "concerts",
          "causes",
          "parties"
        ]
      });
    } else {
      this.setState({
        etype: targetid
      });
    }
  };
  ref = el => {
    //console.log(el.getBoundingClientRect());
  };
  componentDidUpdate = () => {
    /*
    if(this.ref.current){
    if(this.ref.current.refs.input.offsetTop !== this.state.off){
      this.setState({off: this.ref.current.refs.input.offsetTop})
    }}*/
    this.menuGrabber.current.addEventListener("gestureend", e => {
      e.preventDefault();
      console.log("touched");
      if (e.scale < 1) {
        this.setState({ menuOpen: true });
      }
    });
  };
  componentDidMount = async () => {
    this.menuGrabber.current.addEventListener("gestureend", e => {
      e.preventDefault();
      console.log("touched");
      if (e.scale < 1) {
        this.props.menuOpener();
      }
    });
    //this.keypress();
  };

  stopSubmit = e => {
    e.preventDefault();
    return false;
  };
  switchCommunitiesOpener = () => {
    this.setState({ switchCommunitiesOpen: true });
  };
  switchCommunitiesCloser = () => {
    this.setState({ switchCommunitiesOpen: false });
  };
  render() {
    let dol = [];
    this.props.events.map(ev => {
      const foo = ev.data;
      //console.log(foo);
      foo.id = ev.id;
      //console.log(foo);
      return dol.push(foo);
    });
    let combined = this.props.edmTrainevents
      ? [dol, ...this.props.edmTrainevents].sort((a, b) => {
          if (a.date < b.date) return -1;
          if (a.date > b.date) return 1;
          return 0;
        })
      : dol;
    //console.log(combined);
    return (
      <div
        className="eventlistredux"
        onKeyDown={this.onKeyPressed}
        ref={this.menuGrabber}
      >
        {combined &&
          combined.map(event => {
            if (!event.date._seconds) {
              const edmtoday = new Date(event.date).getTime();
              if (edmtoday + 10200000 > new Date().getTime()) {
                return (
                  <Event
                    //key={event.id}
                    edmtoday={edmtoday}
                    event={event}
                    etype={this.state.etype}
                    chooseEdmevent={this.props.chooseEdmevent}
                  />
                );
              } else {
                return null;
              }
            } else {
              //console.log(event.date._seconds * 1000);
              //console.log(new Date().getTime());
              const eventtime = event.date._seconds * 1000;
              if (eventtime > new Date().getTime()) {
                //console.log("in");
                return (
                  <Event
                    key={event.id}
                    event={event}
                    etype={this.state.etype}
                    chooseEvent={this.props.chooseEvent}
                  />
                );
              } else {
                return null;
              }
            }
          })}
      </div>
    );
  }
}
export default Events;

/*
    if(this.ref.current){

    // Returns something like this:
    // {top: -123, left: 0, right: 0, bottom: 25}
    if (
      this.state.off < 300 && this.state.notToday === true
    ) {
      this.setState({notToday: false})
    }
    if (
      this.state.off > 300 && this.state.notToday === false
    ) {
      this.setState({notToday: true})
    }}*/
//console.log(this.props.edmTrainevents);
//console.log(this.state.swGeohash, this.state.neGeohash);
/*{this.props.edmTrainevents &&
  this.props.edmTrainevents.map(event => {
    const edmtoday = new Date(event.date).getTime();
    if (edmtoday + 25200000 > new Date().getTime()) {
      return (
        <Event
          edmtoday={edmtoday}
          event={event}
          etype={this.state.etype}
          chooseEdmevent={this.props.chooseEdmevent}
        />
      )
    } else {
      return null;
    }
    //} else {
    //return null;
    //}
  })}*/

/*this.props.edmTrainevents &&
            this.props.edmTrainevents.map(event => {
              const edmtoday = new Date(event.date).getTime();
              if (edmtoday + 10200000 > new Date().getTime()) {
                return (
                  <Event
                    edmtoday={edmtoday}
                    event={event}
                    etype={this.state.etype}
                    chooseEdmevent={this.props.chooseEdmevent}
                  />
                );
              } else {
                return null;
              }
              //} else {
              //return null;
              //}
            })}
          {this.props.events.length > 0 ? (
            this.props.events.map(event => {
              console.log(event.data.date._seconds * 1000);
              console.log(new Date().getTime());
              const eventtime = event.data.date._seconds * 1000;
              if (eventtime > new Date().getTime()) {
                console.log("in");
                return (
                  <Event
                    key={event.id}
                    event={event}
                    etype={this.state.etype}
                    chooseEvent={this.props.chooseEvent}
                  />
                );
              } else {
                return null;
              }
              //} else {
              //return null;
              //}
            })
          ) : (
            <div className="noeventsahh">No events for this region</div>
          )*/
