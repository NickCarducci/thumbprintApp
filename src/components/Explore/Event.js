import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import imagesl from "./rsz_r5pnzqqw.jpg";

//import _ from "lodash";
import "./Events.css";
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

class Event extends React.Component {
  state = {
    unsplashKey: null,
    tempPhoto: this.props.tempPhoto
  };
  componentDidMount = async () => {};
  saveEvent = (e, event) => {
    e.preventDefault();
    this.props.users[this.props.auth.uid].starredEdm
      ? this.props.addEdmToCal()
      : this.props.rmEdmfromCal();
    this.props.addEventToPlans(event);
  };
  render() {
    //console.log(event)
    const {
      event,
      edmtoday
    } = this.props; /*
    let p = this.props.etype;
    let q = event.d ? event.d.etype : event.etype;
    let y = { n: p };
    if (
      (Object.values(p)[0] && Object.values(p)[0].includes(q)) ||
      (Object.values(p)[1] && Object.values(p)[1].includes(q)) ||
      (Object.values(p)[2] && Object.values(p)[2].includes(q)) ||
      (Object.values(p)[3] && Object.values(p)[3].includes(q)) ||
      (Object.values(p)[4] && Object.values(p)[4].includes(q)) ||
      (Object.values(p)[5] && Object.values(p)[5].includes(q)) ||
      (Object.values(p)[6] && Object.values(p)[6].includes(q)) ||
      (Object.values(p)[7] && Object.values(p)[7].includes(q)) ||
      (Object.values(p)[8] && Object.values(p)[8].includes(q)) ||
      (Object.values(p)[9] && Object.values(p)[9].includes(q)) ||
      y.n.includes(q)
    ) {
      if(event.d){
          if (list.indexOf(event.d.date.seconds) === -1) {
            list.push(event.d.date.seconds);
            this.setState({ listTimes: list });
          }} else if (edmtoday){
            list.push(edmtoday);
            this.setState({ listTimes: list });
          }*/
    //console.log(list)
    var eventDate = event.date._seconds
      ? new Date(event.date._seconds * 1000)
      : new Date(event.date);
    var eventDate1 = eventDate;
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
    //console.log(this.props.users)
    return (
      /*<div id={event.date.seconds} 
                ref={this.refCallback} /*ref={refs[event.date.seconds]}>*/
      <div className="relativeevents">
        <Link
          to={
            event.id.length > 10
              ? "/events/" + event.id
              : "/events/edmtrain/" + event.id
          }
          key={event.id}
          onClick={() => {
            event.date._seconds
              ? this.props.chooseEvent(event)
              : this.props.chooseEdmevent(event);
          }}
          className="eventlistredux"
        >
          <div className="eachevent">
            <div className="timeofevent">
              {//event.d
              //? diffDays === 0
              //? renderTime(eventDate1)
              renderTime(eventDate1) //note.date.toLocaleString([], { hour12: true })
              //: "Edmtrain.com "
              }
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
            <div className="todaytomorrowevent">
              {diffDays === 0
                ? `${WEEK_DAYS[eventDate1.getDay()]} ${renderDate(eventDate1)}`
                : diffDays === -1
                ? `${WEEK_DAYS[eventDate1.getDay()]} ${renderDate(eventDate1)}`
                : diffDays === 1
                ? `${WEEK_DAYS[eventDate1.getDay()]} ${renderDate(eventDate1)}`
                : is_negative
                ? `${WEEK_DAYS[eventDate1.getDay()]} ${renderDate(eventDate1)}`
                : `${WEEK_DAYS[eventDate1.getDay()]} ${renderDate(eventDate1)}`}
            </div>
            <img
              //onLoad={this.onImgLoad}
              /*
                  event.d
                    ? event.d.chosenPhoto
                    : */
              src={imagesl}
              alt="error"
              className="imageevent"
            />
          </div>
          <div className="eventtitle">
            {event.date._seconds
              ? event.title
              : event.name
              ? event.name
              : event.artistList[0].name}
            &nbsp;{event.ages ? `(${event.ages})` : null}
          </div>
        </Link>
        {/*<div
                className="starfavorite"
                onClick={(e) => this.saveEvent(e, event)}
              >
                {this.props.planner[event.id] && this.props.planner[event.id].starred ? <p>&#9733;</p> : <p>&#9734;</p>}
                {this.props.users && this.props.users[this.props.auth.uid].starredEdm[event.id] ? <p>&#9733;</p> : <p>&#9734;</p>
                }
              </div>*/}
      </div>
    );
  }
}

export default Event;

/*
<div className="eventtitle">
  {event.d
    ? event.d.title
    : event.name
    ? event.name
    : event.artistList[0].name}
  &nbsp;{event.ages ? `(${event.ages})` : null}
</div> */

/*const { event } = this.props;
    const query = event.title
      ? event.title
      : event.name
      ? event.name
      : event.artistList[0].name;
      //UNSPLASH TIMEOUT
    await fetch(
      "https://us-central1-thumbprint-1c31n.cloudfunctions.net/getUnsplashKey"
    )
      .then(async response => await response.json())
      .then(async result => {
        const ok = result.apiKey.toString()
        console.log(ok)
        await fetch(
          `https://api.unsplash.com/search/photos?query=${query}&per-page=1`,
          {
headers: {Authorization: ok}
          }
        )
        .then(async responsee => await responsee.json())
          .then(response => {
            console.log(response)
            this.setState({ image: response.data.results["0"].urls.regular });
          })
          .catch(err => console.log(err));
      })
      .catch(err => {
        console.log(err);
      });*/
