import React from "react";
import firebase, { fireStore } from "../.././init-firebase";
import { GeoFirestore } from "geofirestore";
import { Link } from "react-router-dom";
import arrowright from ".././Icons/Images/arrowright.png";
import back from ".././Icons/Images/back.png";
import timer from ".././Icons/Images/timer.png";
import settings from ".././Icons/Images/settings.png";
//import DatepickerSlider from ".././DatepickerSlider";
import DatepickerBackdrop from ".././Plans/DatepickerBackdrop";
import SeatsioBackdrop from "./SeatsioBackdrop";
//import PlanSettings from "./plansettingsredux";
import dayjs from "dayjs";
import DateFnsUtils from "@date-io/date-fns";
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
//import { SeatsioDesigner } from "@seatsio/seatsio-react";
import ImageClickables from "./ImageClickables";
//import SearchLocationEvent from "./SearchLocationEvent";
import HoldupBackdrop from "./HoldupBackdrop";
import Geohash from "latlon-geohash";
//import { changeLocation } from "../../store/actions/actions";
import GoogleMapReact from "google-map-react";
import MapWrapper from "../Map/MapWrapper";
import mapStyles from "../Map/mapStyles.json";
import "react-dropdown/style.css";

import "./imagelist.css";

import ".././Plans/DatepickerBackdrop.css";
import "../Plans/PouchDBpages/plannew.css";
import "../Plans/PouchDBpages/plansettings.css";
//import MapCreateSquare from "./MapCreateSquare";
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
var typingTimer;
class CreateEvent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.menuGrabber = React.createRef();
    this.component = React.createRef();
    this.componentsearch = React.createRef();
    this.makeType = this.makeType.bind(this);
    this.makeTypeClear = this.makeTypeClear.bind(this);
    this.service = new google.maps.places.AutocompleteService();
    // create a ref to store the textInput DOM element
    this.textInput = React.createRef();
    this.state = {
      title: "",
      body: "",
      chosenPhoto: "",
      date: new Date(),
      createdAt: null,
      updatedAt: null,
      eventDateOpen: false,
      eventSettingsOpen: false,
      search: "",
      lsearch: "",
      predictions: null,
      places: [],
      images: [],
      seatsioOpen: false,
      addTicketsOpen: false,
      allCharts: [],
      clientDesignerKey: "",
      address: "",
      location: [{ lat: 34.0522, lng: -118.2436 }],
      city: "",
      etype: [],
      unmounted: false,
      //posterOptions:this.props.user.pages,
      submitPaused: false,
      enteredValue: ""
    };
    //this.handleDate = this.handleDate.bind(this);
  }

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
  eventDateOpener = () => {
    this.setState({
      eventDateOpen: !this.state.eventDateOpen
    });
  };
  eventDateCloser = () => {
    this.setState({
      eventDateOpen: false
    });
  };
  holdupOpener = () => {
    this.setState({
      submitPaused: !this.state.submitPaused
    });
  };
  holdupCloser = () => {
    this.setState({
      submitPaused: false
    });
  };
  eventSettingsOpener = () => {
    this.setState({
      eventSettingsOpen: !this.state.eventSettingsOpen
    });
  };
  eventSettingsCloser = () => {
    this.setState({
      eventSettingsOpen: false
    });
  };

  openSeatsio = () => {
    this.setState({
      seatsioOpen: !this.state.seatsioOpen
    });
  };
  openAddTickets = () => {
    this.setState({
      addTicketsOpen: !this.state.addTicketsOpen
    });
  };

  choosePhoto = image => {
    //console.log(image.urls.regular);
    this.setState({ chosenPhoto: image.urls.regular });
    //console.log(this.state.chosenPhoto);
  };

  makeType = types => {
    this.component.current.scrollIntoView({ behavior: "auto" });
    if (this.state.etype.indexOf(types) > -1) {
      const newEtype = this.state.etype.filter(item => item !== types);
      this.setState({ etype: Object.values(newEtype) }, () => {
        this.component.current.scrollIntoView({ behavior: "auto" });
      });
    } else {
      //console.log(this.state.etype);
      if (this.state.etype.length < 3) {
        this.setState({ etype: [...this.state.etype, types] }, () => {
          this.component.current.scrollIntoView({ behavior: "auto" });
        });
      }
    }
    //this.messagesEnd.scrollIntoView({ behavior: "auto" });
    //this.myRef.focus();
  };
  makeTypeClear = types => {
    this.component.current.scrollIntoView({ behavior: "auto" });
    if (this.state.etype.indexOf(types) > -1) {
      const newEtype = this.state.etype.filter(item => item !== types);
      this.setState({ etype: Object.values(newEtype) }, () => {
        this.component.current.scrollIntoView({ behavior: "auto" });
      });
    } else {
      //console.log(types);
      if (this.state.etype.length < 3) {
        this.setState({ etype: [types] }, () => {
          this.component.current.scrollIntoView({ behavior: "auto" });
        });
      }
    }
    //this.messagesEnd.scrollIntoView({ behavior: "auto" });
    //this.myRef.focus();
  };
  onPhotoSearch = () => {
    //unsplash off
    //this.queryPexels(this.state.photoQuery);
    this.setState({
      title: this.state.photoQuery
    });
  };
  componentWillUnmount = () => {
    /*if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }*/
    this.unmounted = true;
  };
  componentDidUpdate = async () => {
    if (this.state.enteredValue === "") {
      this.setState({ predictions: "" });
    }
  };
  componentDidMount = () => {
    this.menuGrabber.current.addEventListener("gestureend", e => {
      e.preventDefault();
      console.log("touched");
      if (e.scale < 1) {
        this.props.menuOpener();
      }
    });

    //console.log(this.props.profile)
    this.setState(
      {
        posterOptions: this.props.meAuth && [
          this.props.meData[this.props.meAuth.uid].bars,
          "post as myself"
        ]
      },
      async () => {
        /*
        await fetch(
          "https://us-central1-thumbprint-1c31n.cloudfunctions.net/listCharts",
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "Application/JSON",
              "Access-Control-Request-Method": "POST"
            },
            body: JSON.stringify({ seatsioid: this.props.profile.id }),
            maxAge: 3600
            //"mode": "cors",
          }
        )
          .then(async response => await response.json())
          .then(body => {
            //console.log(body);
            //console.log(body.couple[0].secretKey);
            //const reader = response.body.getReader()
            //reader.read().then(value => {
            //console.log(value);
            this.setState({
              allCharts: body.couple[0].charts,
              secretKey: body.couple[0].secretKey
            });
          })
          .catch(err => console.log(err));*/
      }
    );
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
    const { types = ["geocode"] } = this.props;
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
  };
  double = () => {
    this.handleMapChange();
    this.onPlacesChanged();
  };
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
        const location = { latitude, longitude };
        //this.props.fetchLocation(location);
        //this.handleMapChange(location)
        //console.log(Object.values(location));
        const coordinates = new firebase.firestore.GeoPoint(
          Number(latitude),
          Number(longitude)
        );
        this.setState({ location, coordinates });
        const geohash = Geohash.encode(location.latitude, location.longitude, [
          12
        ]);
        console.log(geohash);
        this.setState({ geohash });
      })
      .catch(err => console.log(err));
  };
  handleSearch = async (place, distance) => {
    const q = place.description; //.replace(", USA", "");
    console.log(q);
    await fetch(
      `https://nominatim.openstreetmap.org/search?q=${q}&limit=1&format=json`,
      {
        method: "GET",
        headers: {
          "User-Agent":
            "onytp.codesandbox.io for thumbprint.us, development nmcarducci@gmail.com",
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
          //this.props.fetchLocation(location);
          //this.handleMapChange(location)
          //console.log(Object.values(location));
          const geopoint = new firebase.firestore.GeoPoint(
            Number(latitude),
            Number(longitude)
          );
          this.setState({ location, geopoint });
          const geohash = Geohash.encode(
            location.latitude,
            location.longitude,
            [12]
          );
          console.log(geohash);
          this.setState({ geohash });
          /*
          const location = [Number(body[0].lat), Number(body[0].lon)];
          this.props.fetchLocation(location);
          console.log(location);

          this.setState({
            location,
            zoom: distance,
            zoomerOpen: false,
            places: []
          });
          this.props.zoomChangedRecently();*/
        },
        err => console.log(err)
      )
      .catch(err => {
        console.log(err);
        this.setState({ city: "", address: "" });
        alert("please use a neighbor's address, none found");
      });
  };
  keyUp = () => {
    clearTimeout(typingTimer);
    if (this.state.photoQuery) {
      typingTimer = setTimeout(() => {
        this.setState({ typing: false });
        this.onPhotoSearch();
      }, 2000);
    }
  };
  handleChangeBody = e => {
    this.setState({
      body: e.target.value
    });
  };
  handleChangeDate = e => {
    const currentNote = { ...this.state };
    currentNote.date = e;

    this.setState(currentNote);
    //this.setState({
    //date: e.target.value
    //});
  };
  handleDate = e => {
    const currentNote = { ...this.state };
    currentNote.date = e;

    this.setState(currentNote);
  };
  handleSubmitPlus = async e => {
    e.preventDefault();
    this.setState({ images: "" });
    const geoFirestore = new GeoFirestore(fireStore);
    const geocollection = geoFirestore.collection("planner");
    geocollection.add({
      name: "Geofirestore",
      score: 100,
      // The coordinates field must be a GeoPoint!
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      coordinates: this.state.geopoint,
      title: this.state.title,
      body: this.state.body,
      chosenPhoto: this.state.chosenPhoto,
      date: this.state.date,
      createdAt: this.state.createdAt,
      updatedAt: this.state.updatedAt,
      address: this.state.address,
      location: this.state.location,
      city: this.state.city,
      etype: this.state.etype,
      authorId: this.props.auth.uid,
      authorName: this.props.user.data.name,
      authorUsername: this.props.user.data.username
    });
    this.props.history.push("/");
  };
  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      submitPaused: !this.state.submitPaused,
      holdupopenh: !this.state.holdupOpenh,
      createdAt: new Date()
    });
  };
  onSearchChange(e) {
    const { typesA = ["(address)"] } = this.props;
    //const { typesE = ["(establishment)"] } = this.props;
    //console.log(input)
    const numberEntered = /^[\d]/;
    //const letterEntered = /^[\W\D]/;
    const enteredValue = e.target.value;
    this.setState({ enteredValue, typesA });
    if (
      enteredValue &&
      numberEntered.test(enteredValue) &&
      this.state.address === ""
    ) {
      this.service.getPlacePredictions(
        { input: enteredValue },
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
  }
  selectAddress = prediction => {
    console.log(prediction);
    this.setState({
      address: prediction.description,
      city: prediction.structured_formatting.secondary_text
    });
    this.handleSearch(prediction);
  };
  queryPexels = async title => {
    await fetch(
      `https://us-central1-thumbprint-1c31n.cloudfunctions.net/pexels`,
      {
        headers: {
          "Content-Type": "Application/JSON",
          "Access-Control-Request-Method": "POST"
        },
        body: title
      }
    )
      .then(response => {
        let photos = [];
        response.forEach(x => {
          photos.push(x.photos.url);
        });
        this.setState({ images: photos });
      })
      .catch(err => {
        console.log(err);
      });
  };
  createStripeVendor = async e => {
    const vendorId = this.props.user.vendorId;
    const key = Math.random();
    const url = vendorId
      ? //STRIPE_LOGIN_URL
        `https://connect.stripe.com/express/oauth/authorize?redirect_uri=https://thumbprint.app&client_id=ca_G8vuYu0ldm1WmSwdzSrAOFpuBFs2scOM&state=
${key}&stripe_landing=login`
      : // STRIPE_SIGNUP_URL
        `https://connect.stripe.com/express/oauth/authorize?redirect_uri=https://thumbprint.app&client_id=ca_G8vuYu0ldm1WmSwdzSrAOFpuBFs2scOM&scope=read_write&capabilities=transfers,card_payments&state=
${key}`;
    await fetch(url, {
      //headers
    })
      .then(async vendor => {})
      .catch(err => {
        return console.log(err);
      });
    e.preventDefault();
    const authId = this.props.auth.uid;
  };
  render() {
    const numberEntered = /^[\d]/;
    //console.log(this.state.enteredValue);
    //console.log(this.state.typing);
    //console.log(this.state.secretKey)
    let drawerClasses1 = "picker-drawer";
    if (this.state.eventDateOpen) {
      drawerClasses1 = "picker-drawer open";
    }
    let drawerClasses = "settings-drawer";
    if (this.state.eventSettingsOpen) {
      drawerClasses = "settings-drawer open";
    }
    const options = [
      "food",
      "business",
      "tech",
      "recreation",
      "education",
      "arts",
      "sports",
      "concerts",
      "causes",
      "party-festival"
    ];
    //const defaultOption = options[0];
    //const optionsr = this.state.posterOptions
    //optionsr.unshift("post as myself")
    //console.log(optionsr);

    //const defaultOption2 = options[0];
    //console.log(this.state.date.toString());
    //console.log(this.state.allCharts);
    const { date, predictions } = this.state;
    let backdrop;
    if (this.state.eventDateOpen) {
      backdrop = <DatepickerBackdrop close={this.eventDateCloser} />;
    }
    let backdrop2;
    if (this.state.submitPaused) {
      backdrop2 = <HoldupBackdrop close={this.holdupCloser} />;
    }
    let backdrop1;
    if (this.state.seatsioOpen) {
      backdrop1 = <SeatsioBackdrop close={this.openSeatsio} />;
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
    //console.log(this.props.profile);
    const key = Math.random();
    const MAP = {
      defaultZoom: 6,
      defaultCenter: { lat: 34.0522, lng: -118.2437 },
      options: {
        styles: mapStyles,
        maxZoom: 19,
        center: this.state.location
      }
    };
    this.key = { x: "AIzaSyAs9BpsQZFolkkBn4ShDTzb1znu_7JM894" };
    return (
      <div ref={this.menuGrabber}>
        <div>
          <Link to="/">
            <img src={back} className="backnew" alt="error" />
          </Link>
          <div className="New_Event_Header">Event</div>
          <img
            src={settings}
            className="settings"
            onClick={this.eventSettingsOpener}
            alt="error"
          />
        </div>
        {
          //start holdup submit
        }
        {this.state.submitPaused ? (
          <div>
            <div className="closeholdup" onClick={this.holdupCloser}>
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
                        onChange={this.handleMapChange}
                        yesIWantToUseGoogleMapApiInternals
                        bootstrapURLKeys={{ key: this.key.x }}
                        onGoogleApiLoaded={() => {
                          console.log("loaded");
                        }}
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
                  ) : predictions && predictions.length > 0 ? (
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
                  ) : (
                    "none, try an address"
                  )
                ) : (
                  <div onClick={() => this.setState({ city: "", address: "" })}>
                    Clear location
                  </div>
                )}
              </div>
              {
                //event types HS
              }
              <div
                ref={this.component}
                /*ref={(el) => { this.component = el; }}*/ className="eventtypeselector"
              >
                {options.map(types => {
                  //console.log(types)
                  return (
                    <div
                      className={
                        this.state.etype.indexOf(types) > -1
                          ? "eventtypeselected"
                          : "eventtypepotential"
                      }
                      id={types}
                      onClick={e => {
                        if (
                          this.state.etype.toString() === "sports" ||
                          this.state.etype.toString() === "concerts" ||
                          this.state.etype.toString() === "parties" ||
                          this.state.etype.toString() === "festivals"
                        ) {
                          //console.log(this.state.etype.toString());
                          if (
                            types === "food" &&
                            this.state.etype.toString() === "festivals"
                          ) {
                            this.makeType(types);
                          } else {
                            this.makeTypeClear(types);
                          }
                        } else {
                          types === "sports" ||
                          types === "concerts" ||
                          types === "parties" ||
                          types === "festivals"
                            ? this.state.etype.toString() === "food"
                              ? this.makeType(types)
                              : this.makeTypeClear(types)
                            : this.makeType(types);
                        }
                      }}
                    >
                      {types}
                    </div>
                  );
                })}
              </div>
            </div>
            {this.state.address && this.state.etype ? (
              <div onClick={this.handleSubmitPlus} className="continueanyway">
                Submit
              </div>
            ) : null}
            {
              //end holdup submit
            }
            {backdrop2}
          </div>
        ) : null}
        <form
          onSubmit={
            //this.state.chosenPhoto?
            e => this.handleSubmit(e)
            /*: this.state.photoQuery !== this.state.title
              ? e => {
                  e.preventDefault();
                  //this.queryPexels();
                  //alert("please choose a photo");
                }
              : e => e.preventDefault()*/
          }
        >
          <div
            className={
              this.state.submitPaused
                ? "wholecreateeventfixed"
                : "boxforphotosevent"
            }
          >
            <div
              className={
                this.state.submitPaused
                  ? "planphotobackgrounddivfixed"
                  : "planphotobackgrounddiv"
              }
            >
              <img
                className="planphotobackgroundimg"
                src={this.state.chosenPhoto}
                alt="error"
              />
              <div className="plan-form">
                <input
                  type="text"
                  value={this.props.event}
                  className="titleofplan"
                  name="title"
                  id="title"
                  placeholder="Title"
                  autoFocus={true}
                  autoComplete="off"
                  onFocus={window.scrollTo(0, 0)}
                  onClick={this.focus}
                  ref={this.textInput}
                  required
                  autoCorrect="off"
                  onKeyUp={this.keyUp}
                  onChange={e => this.setState({ photoQuery: e.target.value })}
                  onKeyDown={() => this.setState({ typing: true })}
                />
              </div>

              <img
                src={timer}
                className="timer"
                onClick={this.eventDateOpener}
                alt="error"
              />
              <button>
                <img
                  type="image"
                  src={arrowright}
                  className="arrowright1"
                  alt="error"
                />
              </button>

              {/*<Unsplash expand /*keywords={this.state.title} photoID={this.state.chosenPhoto} />*/}
            </div>
            <div
              className={
                this.state.submitPaused
                  ? "planlistbuteventsfixed"
                  : "planlistbutevents"
              }
            >
              {this.state.typing ? (
                <div>
                  Photos provided by{" "}
                  <a href="https://www.pexels.com/">Pexels</a>
                </div>
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
        </form>
        <div
          className={this.state.submitPaused ? "timeofplanfixed" : "timeofplan"}
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
            this.state.submitPaused ? "todaytomorrowfixed" : "todaytomorrow"
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
              value={this.state.date}
              onChange={e => {
                this.handleChangeDate(e);
              }}
              animateYearScrolling
              showTodayButton={true}
              //disablePast={true}
            />
            <TimePicker
              label="Time"
              value={this.state.date}
              onChange={e => {
                this.handleChangeDate(e);
              }}
              animateYearScrolling
            />
          </MuiPickersUtilsProvider>
        </div>
        {backdrop}
        {
          //settings-drawer
        }
        <div className={drawerClasses}>
          <div className="New_EventSettings_Header">
            <img
              src={back}
              className="backnew"
              alt="error"
              onClick={this.eventSettingsCloser}
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
            onChange={e => this.handleChangeBody(e)}
            placeholder="Write details here"
            autoFocus={true}
            autoComplete="off"
            onFocus={window.scrollTo(0, 0)}
            ref={this.textInput}
          />
          <div className="ticketsandvenues">
            <div className="addtickets">
              {this.state.addTicketsOpen ? (
                <div>
                  <div
                    onClick={this.openAddTickets}
                    className="addticketsclosebox"
                  >
                    <div className="addticketsclosex">&times;</div>
                    <div className="addticketsclose">TICKETING</div>
                  </div>
                  <div>
                    <br />
                    <br />
                    Seatless
                    <input
                      placeholder="Price per ticket"
                      className="ticketinfonew"
                    />
                    <input
                      placeholder="Max capacity"
                      className="ticketinfonew"
                    />
                  </div>

                  <br />
                  <div onClick={this.openSeatsio} className="addvenue">
                    + New venue
                  </div>
                </div>
              ) : (
                <div>
                  <a
                    //onClick={this.createStripeVendor}
                    /*onClick={
                    this.props.user && this.props.user.vendorId
                      ? this.openAddTickets
                      : () => this.props.history.push("/newvendor")
                  }
                  By clicking "Sell Tickets" you agree to the Terms of Service
                  for Stripe*/
                    onClick={() => this.props.setKey(key)}
                    href={
                      this.props.user.stripeId
                        ? `https://connect.stripe.com/express/oauth/authorize?redirect_uri=https://onytp.csb.app&client_id=ca_G8vuuKkj5ZZBeruM2lybdYC7hQF0HoOX&state=${key}&stripe_landing=login`
                        : `https://connect.stripe.com/express/oauth/authorize?redirect_uri=https://onytp.csb.app&client_id=ca_G8vuuKkj5ZZBeruM2lybdYC7hQF0HoOX&state=${key}&suggested_capabilities[]=transfers`
                    }
                    className="addticketsbtn"
                  >
                    Tickets soon
                    <br />
                  </a>
                  <p>
                    By clicking, you agree to our terms and the{" "}
                    <a href="/connect-account/legal">
                      Stripe Connected Account Agreement
                    </a>
                    .
                  </p>
                </div>
              )}
            </div>
            {this.state.addTicketsOpen && this.state.vendorId ? (
              <div>AuthProfile</div>
            ) : null}
          </div>
          {backdrop1}
          {/*Refunds are not guaranteed, only trust people with long track records.
            {this.state.addTicketsOpen
              ? this.state.allCharts &&
                this.state.allCharts.map(chart => (
                  <div className="usersListedCharts">{chart}</div>
                ))
              : null}
          
          this.state.seatsioOpen ? (
            <div>
              <SeatsioDesigner
                className="seatsio"
                secretKey={this.state.secretKey}
                onExitRequested={this.openSeatsio}
                onChartUpdated={console.log("chart updated")}
                onChartPublished={console.log("chart published")}
              />
              <div>&times;</div>
            </div>
          ) : null*/}
        </div>
      </div>
    );
  }
}
export default CreateEvent;
