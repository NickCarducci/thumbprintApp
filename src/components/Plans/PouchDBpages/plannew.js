import React from "react";
import firebase from "../../.././init-firebase";
import { Link } from "react-router-dom";
import arrowright from "../.././Icons/Images/arrowright.png";
import back from "../.././Icons/Images/back.png";
import timer from "../.././Icons/Images/timer.png";
import settings from "../.././Icons/Images/settings.png";
import DatepickerBackdrop from ".././DatepickerBackdrop";
//import DatePicker from 'react-mobile-datepicker';
//import { convertDate } from './timechosen/time.js';
//import DatePicker from './timechosen/index';
//import DatepickerSlider from ".././DatepickerSlider";
import dayjs from "dayjs";
import DateFnsUtils from "@date-io/date-fns";
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import mapStyles from "../.././Map/mapStyles.json";

import GoogleMapReact from "google-map-react";
import MapWrapper from "../.././Map/MapWrapper";
import Geohash from "latlon-geohash";
import PlanHoldupBackdrop from "./PlanHoldupBackdrop";

import "./plannew.css";
import ImageClickables from "../../eventpagesredux/ImageClickables";
const google = window.google;
///* global google */
export const WEEK_DAYS = {
  0: "SUNDAY",
  1: "MONDAY",
  2: "TUESDAY",
  3: "WEDNESDAY",
  4: "THURSDAY",
  5: "FRIDAY",
  6: "SATURDAY"
};
class NewNotePage extends React.PureComponent {
  constructor(props) {
    super(props);
    // create a ref to store the textInput DOM element
    this.service = new google.maps.places.AutocompleteService();
    this.textInput = React.createRef();
    this.state = {
      title: "",
      body: "",
      createdAt: null,
      updatedAt: null,
      date: new Date(),
      term: null,
      saving: false,
      time: new Date(),
      planDateOpen: false,
      planSettingsOpen: false,
      predictions: [],
      city: "",
      enteredValue: "",
      location: [34.0522, -118.2437],
      makeEnterTitle: false
    };
    this.handleDate = this.handleDate.bind(this);
  }

  queryUnsplash = async title => {
    await fetch(
      "https://us-central1-thumbprint-1c31n.cloudfunctions.net/getUnsplashKey"
    )
      .then(async response => await response.json())
      .then(async result => {
        const ok = result.apiKey.toString();
        console.log(ok);
        await fetch(
          `https://api.unsplash.com/search/photos?query=${title}&per-page=9`,
          {
            headers: { Authorization: ok }
          }
        )
          .then(async responsee => await responsee.json())
          .then(response => {
            console.log(response);
            this.setState({ images: response.data.results });
            //this.setState({ image: response.data.results["0"].urls.regular });
          })
          .catch(err => console.log(err));
      })
      .catch(err => {
        console.log(err);
      });
  };
  handleTitle(e) {
    this.setState({ title: e.target.value });
  }

  handleDescription = event => {
    this.setState({ body: event.target.value });
  };

  stopSubmit(e) {
    e.preventDefault();
    return false;
  }
  onSubmitCustomTriggered = event => {
    event.preventDefault();
    this.setState({
      usearch: event
    });
    this.onPhotoSearchCustom(event);
  };
  planDateOpener = () => {
    this.setState({
      planDateOpen: true
    });
  };
  planDateCloser = () => {
    this.setState({
      planDateOpen: false
    });
  };
  planHoldupOpener = e => {
    e.preventDefault();
    this.setState({
      planSubmitPaused: !this.state.planSubmitPaused
    });
  };
  planHoldupCloser = () => {
    this.setState({
      planSubmitPaused: false
    });
  };
  planSettingsOpener = () => {
    this.setState({
      planSettingsOpen: !this.state.planDateOpen
    });
  };
  planSettingsCloser = () => {
    this.setState({
      planSettingsOpen: false
    });
  };

  choosePhoto = image => {
    //console.log(image.urls.regular);
    this.setState({ chosenPhoto: image.urls.regular });
    //console.log(this.state.chosenPhoto);
  };

  onPhotoSearch = () => {
    const ok = this.state.photoQuery;
    this.setState({
      title: ok
    });
    this.handleTitle(ok);
  };
  componentWillUnmount = () => {
    this.unmounted = true;
  };
  componentDidUpdate = async () => {
    if (this.state.enteredValue === "") {
      this.setState({ predictions: "" });
    }
  };
  componentDidMount = () => {
    this.menuGrabber &&
      this.menuGrabber.current.addEventListener("gestureend", e => {
        e.preventDefault();
        console.log("touched");
        if (e.scale < 1) {
          this.props.menuOpener();
        }
      });

    //console.log(this.props.profile)
    //const seatsioid = this.props.profile.id;
  };
  //onChildMouseEnter = () => {};
  //onChildMouseLeave = () => {};
  handleMapChange = ({ center, zoom, bounds }) => {
    this.setState({
      mapOptions: {
        center,
        zoom,
        bounds
      }
    });
  };
  onPlacesChanged = e => {
    e.preventDefault();
    console.log(e.target.value);
    const { types = ["(address)"] } = this.props;
    if (e.target.value !== "") {
      this.service.getPlacePredictions(
        { input: e.target.value, types },
        (predictions, status) => {
          if (status === "OK" && predictions && predictions.length > 0) {
            //console.log(predictions);
          } else {
            //console.log(predictions);
          }
          this.setState({
            places: predictions
          });
        }
      );
    } else {
      this.setState({
        places: [],
        zoomChangedRecently: !this.state.zoomChangedRecently
      });
    }
  }; /*
  nominatim = async prediction => {
    const q = prediction.description;
    console.log(q);
    await fetch(
      `https://nominatim.openstreetmap.org/search?q=${q}&limit=1&format=json`,
      {
        method: "GET",
        headers: {
          //"Content-Type": "Application/JSON",
          //"Access-Control-Request-Method": "POST",
          "User-Agent":
            "1c31n.codesandbox.io for thumbprint.us, development nmcarducci@gmail.com",

          Referer: "http://www.1c31n.codesandbox.io"
        },
        referer: "http://www.1c31n.codesandbox.io",
        maxAge: 3600
        //"mode": "cors",
      }
    )
      .then(async response => await response.json())
      .then(body => {
        console.log(body);
        const latitude = body[0].lat;
        const longitude = body[0].lon;
        const location =  [Number(latitude), Number(longitude) ]
        //this.props.fetchLocation(location);
        //this.handleMapChange(location)
        console.log(location);
        const firebase = getFirebase();
        const geopoint = new firebase.firestore.GeoPoint(
          Number(latitude),
          Number(longitude)
        );
        this.setState({ location, geopoint });
        const geohash = Geohash.encode(location.latitude, location.longitude, [
          12
        ]);
        console.log(geohash);
        this.setState({ geohash });
      })
      .catch(err => console.log(err));
  };*/
  handleSearch = async (place, distance) => {
    const q = place.description; //.replace(", USA", "");
    console.log(q);
    await fetch(
      `https://nominatim.openstreetmap.org/search?q=${q}&limit=1&format=json`,
      {
        method: "GET",
        headers: {
          "User-Agent":
            "1c31n.codesandbox.io for thumbprint.us, development nmcarducci@gmail.com",
          Referer: "http://www.1c31n.codesandbox.io"
        },
        maxAge: 3600
        //"mode": "cors",
      }
    )
      .then(async response => await response.json())
      .then(
        body => {
          console.log(body);

          const latitude = body[0].lat;
          const longitude = body[0].lon;
          const location = { latitude, longitude };
          console.log(location);
          const geopoint = new firebase.firestore.GeoPoint(
            Number(latitude),
            Number(longitude)
          );
          this.setState({
            location: [Number(latitude), Number(longitude)],
            geopoint
          });
          const geohash = Geohash.encode(
            location.latitude,
            location.longitude,
            [12]
          );
          console.log(geohash);
          this.setState({ geohash });
        },
        err => console.log(err)
      );
  };
  handleChangeBody = e => {
    this.setState({
      body: e.target.value
    });
  };
  handleChangeDate = e => {
    this.setState({ date: e });
  };
  handleDate = event => {
    this.setState({ date: event });
  }; /*
  async handleSave() {
    this.setState({ saving: true });

    //const res = await this.props.onSave({ ...this.state.note });
    this.props.history.push('/plan');
    //this.props.history.replace(`/notes/${res.id}`);
  }*/
  onSearchChange(e) {
    const { typesA = ["(address)"] } = this.props;
    //const { typesE = ["(establishment)"] } = this.props;
    //console.log(input)
    const numberEntered = /^[\d]/;
    //const letterEntered = /^[\W\D]/;
    const enteredValue = e.target.value;
    this.setState({ enteredValue });
    //if (enteredValue && numberEntered.test(enteredValue) && this.state.address === "" ) {
    this.service.getPlacePredictions(
      { input: enteredValue, typesA },
      (predictions, status) => {
        if (status === "OK" && predictions && predictions.length > 0) {
          //console.log(predictions);
        } else {
          //console.log(predictions);
        }
        this.setState({
          predictions
        });
      }
    );
  }
  selectAddress = prediction => {
    this.setState({
      address: prediction.description,
      city: prediction.structured_formatting.secondary_text
    });
    this.handleSearch(prediction);
  };
  render() {
    //console.log(this.state.location)
    const { date, predictions } = this.state;
    const numberEntered = /^[\d]/;
    let drawerClasses1 = "picker-drawer";
    if (this.state.planDateOpen) {
      drawerClasses1 = "picker-drawer open";
    }
    let drawerClasses = "settings-drawer";
    if (this.state.planSettingsOpen) {
      drawerClasses = "settings-drawer open";
    }
    //console.log(this.state.note.date.toString());
    //console.log(this.state.note.title);
    let backdrop;
    if (this.state.planDateOpen) {
      backdrop = <DatepickerBackdrop close={this.planDateCloser} />;
    }
    let backdrop2;
    if (this.state.planSubmitPaused) {
      backdrop2 = <PlanHoldupBackdrop close={this.planHoldupCloser} />;
    }
    function renderTime(date) {
      let d = dayjs(date);
      return d.format("h:mm a");
    }
    function renderDate(date) {
      let d = dayjs(date);
      return d.format("MMMM D YYYY");
    }
    var datenotime = new Date();
    datenotime.setHours(date.getHours(), date.getMinutes(), 0, 0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    var diffDays = Math.round(
      (datenotime.getTime() - date.getTime()) / 86400000
    );
    var is_negative = diffDays < 0;
    //console.log(this.state.chosenPhoto);
    console.log(this.state.predictions);
    /*const MAP = {
      defaultZoom: 6,
      defaultCenter: { lat: 34.0522, lng: -118.2437 },
      options: {
        styles: mapStyles,
        maxZoom: 19,
        center: this.state.location
      }
    };*/
    const MAP = {
      defaultZoom: 6,
      defaultCenter: { lat: 34.0522, lng: -118.2437 },
      options: {
        styles: mapStyles,
        maxZoom: 19,
        gestureHandling: "greedy"
        //center: this.state.location
      }
    };
    this.TitleQuery = this.state.makeEnterTitle ? "Enter Title" : "Title";
    return (
      <div ref={this.menuGrabber}>
        <div>
          <Link to="/plan">
            <img src={back} className="backnew" alt="error" />
          </Link>
          <div className="New_Plan_Header">Plan</div>
          <img
            src={settings}
            className="settings"
            onClick={this.planSettingsOpener}
            alt="error"
          />
        </div>
        {
          //start holdup submit
        }
        {this.state.planSubmitPaused ? (
          <div>
            <div className="closeholdup" onClick={this.planHoldupCloser}>
              &times;
            </div>
            <div className="relativeflexconfirm">
              {
                //map HS
              }
              <div className="mapholdercreateevent">
                <div className="mapsearchcreateevent">
                  <div className="mapoutlinesquare">
                    <MapWrapper>
                      <GoogleMapReact
                        defaultZoom={6}
                        defaultCenter={[34.0522, -118.2437]}
                        options={MAP.options}
                        zoom={this.state.zoomChosen}
                        center={this.state.location}
                        onChange={this.handleMapChange}
                        yesIWantToUseGoogleMapApiInternals
                        bootstrapURLKeys={{
                          key: "AIzaSyAs9BpsQZFolkkBn4ShDTzb1znu_7JM894"
                        }}
                        /*onGoogleApiLoaded={() => {
                          console.log("loaded");
                        }}*/
                      />
                    </MapWrapper>
                  </div>
                </div>
              </div>
              {
                //address HS
              }
              <div
                className={
                  numberEntered.test(this.state.enteredValue)
                    ? "eventnewcitysearchfilled"
                    : "eventnewcitysearch"
                }
              >
                {this.state.address ? (
                  <div />
                ) : (
                  <div>
                    <div>Please provide an event address</div>
                  </div>
                )}
                <div className="seachboxthing">
                  {this.state.address}
                  <form onSubmit={this.stopSubmit}>
                    <input
                      className="searchlocationevent"
                      onChange={e => this.onSearchChange(e)}
                    />
                  </form>
                </div>
                {this.state.city === "" ? (
                  this.state.enteredValue === "" ? (
                    "Search"
                  ) : (
                    predictions &&
                    predictions.map(prediction => {
                      //console.log(prediction);

                      //var amount = prediction.terms.length;
                      //var country = prediction.terms[amount - 1].value;

                      return (
                        <div
                          onClick={() => this.selectAddress(prediction)}
                          className="citypredictionsevent"
                        >
                          {prediction.description}
                        </div>
                      );
                    })
                  )
                ) : (
                  <div onClick={() => this.setState({ city: "", address: "" })}>
                    Clear location
                  </div>
                )}
              </div>
            </div>
            <Link to="/plan">
              <div
                onClick={() => this.props.handleSave(this.state)}
                className="continueanyway"
              >
                Submit
              </div>
            </Link>
            {
              //end holdup submit
            }
            {backdrop2}
          </div>
        ) : null}

        <div
          className={
            this.state.planSubmitPaused
              ? "wholecreateeventfixed"
              : "boxforphotosevent"
          }
        >
          <div
            className={
              this.state.planSubmitPaused
                ? "planphotobackgrounddivfixed"
                : "planphotobackgrounddiv"
            }
          >
            <img
              className="planphotobackgroundimg"
              src={this.state.chosenPhoto}
              alt="error"
            />
            <form className="plan-form" onSubmit={this.planHoldupOpener}>
              <input
                type="text"
                value={this.props.event}
                className="titleofplan"
                name="title"
                id="title"
                placeholder={this.TitleQuery}
                autoFocus={true}
                autoComplete="off"
                onFocus={window.scrollTo(0, 0)}
                onClick={this.focus}
                ref={this.textInput}
                autoCorrect="off"
                onKeyUp={this.keyUp}
                onChange={e => this.handleTitle(e)}
                onKeyDown={() => this.setState({ typing: true })}
                required
              />

              <img
                type="submit"
                src={arrowright}
                className="arrowright1"
                alt="error"
                onClick={
                  this.state.title !== ""
                    ? this.planHoldupOpener
                    : () => this.setState({ makeEnterTitle: true })
                }
              />
            </form>
            <img
              src={timer}
              className="timer"
              onClick={this.planDateOpener}
              alt="error"
            />

            {/*<Unsplash expand /*keywords={this.state.title} photoID={this.state.chosenPhoto} />*/}
          </div>
          <div
            className={
              this.state.planSubmitPaused
                ? "planlistbuteventsfixed"
                : "planlistbutevents"
            }
          >
            {this.state.typing ? (
              <div>loading...</div>
            ) : (
              this.state.images &&
              this.state.images.map(image => (
                <div onClick={() => this.choosePhoto(image)}>
                  <ImageClickables image={image} />
                </div>
              ))
            )}
          </div>
        </div>
        <div
          className={
            this.state.planSubmitPaused ? "timeofplanfixed" : "timeofplan"
          }
        >
          {diffDays === 0 ? renderTime(date) : renderTime(date) //note.date.toLocaleString([], { hour12: true })
          }
          &nbsp;
          {diffDays === 0
            ? `TODAY`
            : diffDays === -1
            ? `TOMORROW`
            : diffDays === 1
            ? `YESTERDAY`
            : is_negative
            ? `in ${Math.abs(diffDays)} days`
            : `${diffDays} days ago`}
        </div>
        {
          //end create event page
        }
        <div
          className={
            this.state.planSubmitPaused ? "todaytomorrowfixed" : "todaytomorrow"
          }
        >
          {diffDays === 0
            ? `${WEEK_DAYS[date.getDay()]} ${renderDate(date)}`
            : diffDays === -1
            ? `${WEEK_DAYS[date.getDay()]} ${renderDate(date)}`
            : diffDays === 1
            ? `${WEEK_DAYS[date.getDay()]} ${renderDate(date)}`
            : is_negative
            ? `${WEEK_DAYS[date.getDay()]} ${renderDate(date)}`
            : `${WEEK_DAYS[date.getDay()]} ${renderDate(date)}`}
        </div>
        {
          //datepicker
        }

        <div className={drawerClasses1}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              label="Due Date"
              //value={this.state.date}
              onChange={e => this.handleDate(e)}
              animateYearScrolling
              showTodayButton={true}
              //disablePast={true}
            />
            <TimePicker
              label="Time"
              //value={this.state.date}
              onChange={e => this.handleDate(e)}
              animateYearScrolling
            />
          </MuiPickersUtilsProvider>
        </div>
        {backdrop}

        {
          //settings-drawer
        }
        <div className={drawerClasses}>
          <div className="New_Plan_Header">
            <img
              src={back}
              className="backnew"
              alt="error"
              onClick={this.planSettingsCloser}
            />
            Event details
          </div>
          <textarea
            type="search"
            className="plan-form-details"
            name="body"
            id="body"
            rows="2"
            cols="20"
            wrap="hard"
            onChange={e => this.handleDescription(e)}
            placeholder="Write details here"
            autoFocus={true}
            autoComplete="off"
            onFocus={window.scrollTo(0, 0)}
            ref={this.textInput}
          />
        </div>
      </div>
    );
  }
}

export default NewNotePage;
