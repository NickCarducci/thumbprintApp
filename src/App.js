import React from "react";
import { fireStore } from "./init-firebase";
import TilesMap from "./components/Map/TilesMap/TilesMap";
import EventTypesMap from "./components/Map/EventTypesMap/EventTypesMap";
import Login from "./Login";
import SignupConfirm from "./SignupConfirm";
import Menu from "./components/Icons/Menu";
import Planner from "./components/Plans/Planner";
import Invites from "./components/Plans/Invites/Invites";
import CreateEvent from "./components/eventpagesredux/CreateEvent";
import Eventopenredux from "./components/eventpagesredux/eventopenredux";
import PlanNew from "./components/Plans/PouchDBpages/plannew";
import PlanOpen from "./components/Plans/PouchDBpages/planopen";
import PlanEdit from "./components/Plans/PouchDBpages/planedit";
import Chats from "./components/Chats/Chats";
import Accounts from "./components/Chats/Accounts";
import Events from "./components/Explore/Events";
import MainFooter from "./components/Icons/MainFooter";
import CreateDrawer from "./components/Create/CreateDrawer.js";
import search from "./components/Icons/Images/search.png";
import HeaderizeWeatherCitySkyMap from "./components/Explore/HeaderizeWeatherCitySky";
//import clockborderempty from "./components/Icons/Images/clockborderempty.png";

import { Route, Switch, Redirect, Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PDB from "./components/Plans/PouchDBpages/plannerdb";
import SDB from "./scopedb";

import "./components/Explore/Cities.css";

import "./styles.css";

import Mapp from "./components/Map/Mapp";
import SwitchCMap from "./components/Map/SwitchCMap";
import Eventedmopen from "./components/eventpagesredux/eventedmopen";
//import { border } from "@material-ui/system";
import PostersStore from "./components/Explore/PostersStore";

class App extends React.Component {
  constructor(props) {
    super(props);
    let db = new PDB();
    let sdb = new SDB();
    this.state = {
      user: "",
      cityapisLoaded: [],
      db,
      sdb,
      notes: [],
      loading: true,
      createSliderOpen: false,
      switchCommunitiesOpen: false,
      switchCMapOpen: false,
      menuOpen: false,
      billSelected: "",
      bills: [],
      cards: ["First", "Second", "Third"],
      goSignupConfirmedPlay: false,
      eventsOpen: true,
      watchingSignupVideo: false,
      justOpened: true,
      loginOpen: false,
      events: [],
      center: [34.0522, -118.2437],
      location: [34.0522, -118.2437],
      distance: null,
      city: "Los Angeles",
      cityapi: "Los%20Angeles",
      state: "CA",
      zoomChosen: null,
      radioChosen: null,
      scrollChosen: null,
      chosenEdmevent: undefined,
      queryingWait: false,
      chatsopen: false,
      eventChosen: "",
      ok: true
      //zoomChangedRecently:false
    };
    this.CreateEventThePage = React.createRef();
    this.CreateEvent = React.createRef();
    this.ref = React.createRef();
    this.pinch = React.createRef();
  }
  zoomChoose1 = () => {
    this.setState({ radioChosen: 16 });
  };
  zoomChoose2 = () => {
    this.setState({ radioChosen: 13 });
  };
  zoomChoose3 = () => {
    this.setState({ radioChosen: 10 });
  };
  zoomChoose4 = () => {
    this.setState({ radioChosen: 7 });
  };
  myVar = () =>
    setTimeout(
      this.setState({ watchingSignupVideo: false, justOpened: false }),
      10
    );
  menuCloser(e) {
    e.preventDefault();
    this.setState({ menuOpen: false });
  }
  menuOpener(e) {
    e.preventDefault();
    this.setState({ menuOpen: true });
  }
  // plus sign
  createSliderOpener = () => {
    this.setState({
      createSliderOpen: true
    });
  };
  createSliderCloser = () => {
    this.setState({
      createSliderOpen: false
    });
  };
  billSelected = (event) => {
    this.setState({ billSelected: event.packageId });
  };
  updateBills = (results) => {
    this.setState({ bills: [...this.state.bills, ...results.packages] });
  };
  // render
  goSignupConfirmed = () => {
    this.setState({ watchingSignupVideo: true });
  };
  signupConfirmClose = () => {
    this.setState({ watchingSignupVideo: false });
  };

  switchCommunitiesOpener = () => {
    this.setState({
      switchCommunitiesOpen: !this.state.switchCommunitiesOpen
    });
  };
  switchCommunitiesCloser = () => {
    this.setState({
      switchCommunitiesOpen: false
    });
  };
  eventOpener = () => {
    this.setState({ eventsOpen: true });
  };
  eventCloser = () => {
    this.setState({ eventsOpen: false });
  };
  //console.log(this.state.sw[0], this.state.ne[0])
  switchCMapOpener = () => {
    this.setState({ switchCMapOpen: true });
  };
  switchCMapCloser = () => {
    this.setState({ switchCMapOpen: false });
  };
  choosetheedm = (eventEdm) => {
    this.setState({ chosenEdmevent: eventEdm });
    this.eventCloser();
    this.switchCMapCloser();
  };
  doneQueryCity = () => {
    this.setState({ queryingWait: false });
  };
  startQueryCity = () => {
    this.setState({ queryingWait: true });
  };
  changeCity = (center) => {
    this.setState({ center });
  };
  async setKey(key, method) {
    let res = await this.state.sdb[method](key);

    this.setState({
      key
    });
    //this.props.history.replace('/plan')
    //this.props.history.replace(`/plans/${res.id}`)
    return res;
  }
  async handleSave(note, method) {
    let res = await this.state.db[method](note);
    let { notes } = this.state;
    delete note.term;
    delete note.saving;
    delete note.time;
    delete note.planDateOpen;
    delete note.planSettingsOpen;
    delete note.predictions;
    delete note.enteredValue;
    note._id = res.id;
    note._rev = res.rev;

    this.setState({
      notes: { ...notes, [res.id]: note }
    });
    //this.props.history.replace('/plan')
    //this.props.history.replace(`/plans/${res.id}`)
    return res;
  }
  async handleDelete(id) {
    let { notes } = this.state;
    let note = notes[id];

    if (
      notes[id] &&
      window.confirm("Are you sure you want to delete this note?")
    ) {
      await this.state.db.deleteNote(note);

      delete notes[id];

      this.setState({ notes });
    }
  }
  eventTypesOpener = () => {
    this.setState({
      typesOrTiles: true
    });
  };
  eventTypesCloser = () => {
    this.setState({
      typesOrTiles: null
    });
  };
  mapcity = () => {
    this.eventTypesCloser();
    this.eventCloser();
  };
  chooseEvent = (event) => {
    this.setState({ eventChosen: event });
  };
  componentDidUpdate = () => {
    if (this.state.zoomChosen !== this.state.scrollChosen) {
      this.setState({
        zoomChosen: this.state.scrollChosen,
        radioChosen: this.state.scrollChosen
      });
    }
    if (this.state.zoomChosen !== this.state.radioChosen) {
      this.setState({
        zoomChosen: this.state.radioChosen,
        scrollChosen: this.state.radioChosen
      });
    } /*
    if (
      this.props.planner &&
      this.state.edmTrainevents &&
      this.state.events !==
        [...this.props.planner, ...this.state.edmTrainevents]
    ) {
      this.setState({
        events: [...this.props.planner, ...this.state.edmTrainevents]
      });
    }*/
  };
  componentWillUnmount = () => {
    clearTimeout(this.myVar);
    clearTimeout(this.timeoutLoading);
  };
  async componentDidMount() {
    const key = await this.state.sdb.readKey();
    this.setState({ key });
    //}
    this.pinch &&
      this.pinch.current.addEventListener("gestureend", (e) => {
        e.preventDefault();
        console.log("touched");
        if (e.scale < 1) {
          this.setState({ menuOpen: true });
        }
      });
    if (!this.state.watchingSignupVideo && this.state.justOpened) {
      this.setState({ watchingSignupVideo: true });
      this.myVar();
    }
    const notes = await this.state.db.getAllNotes();
    this.setState({ notes, loading: false });
    /*this.chooseCitypoint(
      this.state.center,
      this.state.distance,
      this.state.city,
      this.state.cityapi,
      this.state.state
    );*/
  }
  getAgainTrain = async (id) => {
    const OKDATE = new Date();
    const nextMonth = ((OKDATE.getMonth() + 1) % 12) + 1;
    const today = OKDATE.getDate();
    const thisMonth = OKDATE.getMonth();
    const year =
      nextMonth === 1
        ? new Date(OKDATE.setFullYear(OKDATE.getFullYear() + 1)).getFullYear()
        : OKDATE.getFullYear();
    //return res.send(id, year, nextMonth, today)
    const goodDate = `${year}-${nextMonth}-${today}`;
    const stringDate = JSON.stringify(goodDate);
    await fetch(
      `https://us-central1-thumbprint-1c31n.cloudfunctions.net/edmTrainAgain`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "Application/JSON",
          "Access-Control-Request-Method": "POST"
        },
        body: JSON.stringify({ id }),
        maxAge: 3600
      }
    )
      .then(async (response) => await response.json())
      .then((body) => {
        const bod = body.data;
        this.setState({
          edmTrainevents: bod,
          [this.state.cityapi]: bod,
          using: false
        });
      })
      .catch((err) => console.log(err));
  };
  getEdmTrainpoint = async (cityapi, state) => {
    //console.log(cityapi);
    //console.log(state);
    await fetch(
      `https://us-central1-thumbprint-1c31n.cloudfunctions.net/edmTrain`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "Application/JSON",
          "Access-Control-Request-Method": "POST"
        },
        body: JSON.stringify({ cityapi, state }),
        maxAge: 3600
      }
    )
      .then(async (response) => await response.json())
      .then((body) => {
        //console.log("Success", body.data[0].id);
        const id = body.data[0].id;
        // if nearby city this.getEdmTrainpoint(cityapi, state) repeat loop back
        // otherwise, continue
        this.getAgainTrain(id);
        //this.setState({ edmTrainevents: text })
      })
      .catch((err) => console.log(err));
  };
  chooseCitypoint = async (location, distance, city, cityapi, state) => {
    if (!this.state.loading && !this.state.haltChooseCity) {
      this.setState({ loading: true });
      this.timeoutLoading = setTimeout(this.setState({ loading: false }), 5000);
      console.log(city);
      const center = [JSON.parse(location[0]), JSON.parse(location[1])];
      this.setState({ center, city, cityapi, state });
      if (this.state.using) {
        return null;
      } else {
        //this.chooseCitypoint(location, distance, city, cityapi, state);
        this.setState({ using: true });
        if (this.state.cityapisLoaded.includes(cityapi)) {
          console.log(this.state[`${cityapi}`]);
          return this.setState({
            edmTrainevents: this.state[`${cityapi}`]
          });
        } else {
          //this.getEdmTrainpoint(cityapi, state);
          this.setState({
            ok: false,
            cityapisLoaded: [...this.state.cityapisLoaded, cityapi]
          });
          this.fetchCities(location, distance, city);
          var Lat = location[0];
          var Length = distance * 1.60934;
          var Ratio = 100;
          var WidthPixel = window.innerWidth;
          //console.log(WidthPixel + Ratio + Lat + Length);
          this.calculateZoom(
            WidthPixel,
            Ratio,
            Lat,
            Length,
            location,
            distance,
            city
          );
          console.log(location);
        }
      }
    }
  };
  /*chooseCitypoint = async (location, distance, city, cityapi, state) => {
    if (!this.state.loading && !this.state.haltChooseCity) {
      this.setState({ loading: true });
      this.timeoutLoading = setTimeout(this.setState({ loading: false }), 5000);
      console.log(city);
      const center = [JSON.parse(location[0]), JSON.parse(location[1])];
      this.setState({ center, city, cityapi, state });
      var Lat = location[0];
      var Length = distance * 1.60934;
      var Ratio = 100;
      var WidthPixel = window.innerWidth;
      //console.log(WidthPixel + Ratio + Lat + Length);
      this.calculateZoom(
        WidthPixel,
        Ratio,
        Lat,
        Length,
        location,
        distance,
        city
      );
      console.log(location);
    }
  };*/
  calculateZoom = (
    WidthPixel,
    Ratio,
    Lat,
    Length,
    location,
    distance,
    city
  ) => {
    Length = Length * 1000;
    var k = WidthPixel * 156543.03392 * Math.cos((Lat * Math.PI) / 180);
    //console.log(k);
    var myZoom = Math.round(Math.log((Ratio * k) / (Length * 100)) / Math.LN2);
    myZoom = myZoom - 1;
    //https:// gis.stackexchange.com/questions/7430/what-ratio-scales-do-google-maps-zoom-levels-correspond-to/31551#31551
    if (this.state.scrollChosen !== myZoom && city !== this.state.city) {
      this.setState({ scrollChosen: myZoom });
    }
    return myZoom;
  };
  fetchCities = async (location, distance, city) => {
    await fetch(
      "https://us-central1-thumbprint-1c31n.cloudfunctions.net/chooseCity",
      {
        method: "POST",
        headers: {
          "Content-Type": "Application/JSON",
          "Access-Control-Request-Method": "POST"
        },
        body: JSON.stringify({ location, distance }),
        maxAge: 10
        //"mode": "cors",
      }
    )
      .then(async (response) => await response.json())
      .then((body) => {
        this.setState({ distance, city });
        console.log("Success", body.sendit);
        this.setState({ events: body.sendit });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  tilesOpener = () => {
    this.setState({
      typesOrTilesMap: false
    });
  };
  tilesCloser = () => {
    this.setState({
      typesOrTilesMap: null
    });
  };
  eventTypesOpener = () => {
    this.setState({
      typesOrTilesMap: true
    });
  };
  eventTypesCloser = () => {
    this.setState({
      typesOrTilesMap: null
    });
  };
  etypeChanger = (e) => {
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
          "parties",
          "festivals"
        ]
      });
    } else {
      this.setState({
        etype: targetid
      });
    }
  };
  mapConcentrate = () => {
    this.eventCloser();
    this.switchCMapCloser();
  };
  createStripeVendor = async (authcode) => {
    await fetch(
      "https://us-central1-thumbprint-1c31n.cloudfunctions.net/createStripeVendor",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Request-Method": "POST"
        },
        body: JSON.stringify({ code: authcode }),
        maxAge: 60
        //"mode": "cors",
      }
    )
      .then(async (response) => await response.text())
      .then((body) => {
        console.log(body + 1);
        const stripeId = body;
        fireStore
          .collection("users")
          .doc(this.props.auth.uid)
          .update({ stripeId: body });
        this.state.sdb.deleteKeys();
      })
      .catch((err) => {
        console.log(err);
        this.state.sdb.deleteKeys();
      });
  };
  render() {
    if (this.props.auth && this.props.auth.uid) {
      const scopecode =
        window.location.href &&
        window.location.href.match(/state=(.*)/) &&
        window.location.href.match(/state=(.*)/)[1];
      console.log(scopecode);
      const authcode =
        window.location.href &&
        window.location.href.match(/code=(.*)/) &&
        window.location.href.match(/code=(.*)&/)[1];
      console.log(authcode);
      //if (this.props.user && !this.props.user.data.stripe_user_id) {
      if (this.state.key && Object.keys(this.state.key).includes(scopecode)) {
        console.log("in");
        this.createStripeVendor(authcode);
        this.setState({ key: undefined });
      }
    }
    const PrivateRoute = ({ component: Component, ...rest }, props) => {
      return (
        <Route
          {...rest}
          render={(props) =>
            this.props.auth && this.props.user ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location }
                }}
              />
            )
          }
        />
      );
    };
    const BumpRoute = ({ component: Component, ...rest }, props) => {
      return (
        <Route
          {...rest}
          render={(props) =>
            this.props.auth && this.props.user ? (
              <Redirect to="/" />
            ) : (
              <Component {...props} />
            )
          }
        />
      );
    };
    //console.log(this.props.user);
    var placeholderEventsSearch =
      this.state.city === undefined ? "Events" : `${this.state.city} Events`;
    return (
      <div ref={this.pinch}>
        {this.state.vendorFinishedSignup ? (
          <div onClick={() => this.setState({ vendorFinishedSignup: false })}>
            you can now sell tickets at events you create. congrats!
            <br />
            <Link to="/newevent">open event creator</Link>
            <br />
            close
          </div>
        ) : null}

        <div>
          {this.state.menuOpen ? (
            <Menu
              switchCMapOpener={this.switchCMapOpener}
              menuClose={(e) => this.menuCloser(e)}
              auth={this.props.auth}
              chatopener={() => this.setState({ chatsopen: true })}
            />
          ) : null}
        </div>
        <Route
          render={(location) => (
            <TransitionGroup>
              <CSSTransition
                key={location.key}
                timeout={300}
                classNames={"fade"}
              >
                <Switch>
                  <PrivateRoute
                    exact
                    path="/invites"
                    component={(props) => <Invites {...props} />}
                  />
                  <PrivateRoute
                    exact
                    path="/newevent"
                    component={(props) => (
                      <CreateEvent
                        {...props}
                        menuOpener={this.menuOpener}
                        createSliderOpen={this.props.createSliderOpen}
                        //ref={this.CreateEventThePage}
                        myVariable={this.state.myVariable}
                        user={this.props.user}
                        users={this.props.users}
                        auth={this.props.auth}
                        setKey={(key) => this.setKey(key, "setKey")}
                      />
                    )}
                  />

                  <PrivateRoute
                    exact
                    path="/newvendor"
                    component={(props) => (
                      <div /> /*<NewVendor
                        {...props}
                        menuOpener={this.menuOpener}
                        createSliderOpen={this.props.createSliderOpen}
                        //ref={this.CreateEventThePage}
                        myVariable={this.state.myVariable}
                        user={this.props.user}
                        users={this.props.users}
                        auth={this.props.auth}
                      />*/
                    )}
                  />

                  <Route
                    exact
                    path="/posters/:id"
                    component={(props) => (
                      <PostersStore
                        {...props}
                        menuOpener={this.menuOpener}
                        createSliderOpen={this.props.createSliderOpen}
                        //ref={this.CreateEventThePage}
                        myVariable={this.state.myVariable}
                        user={this.props.user}
                        users={this.props.users}
                        auth={this.props.auth}
                      />
                    )}
                  />
                  <PrivateRoute
                    exact
                    path="/posters"
                    component={(props) => (
                      <Redirect
                        to={{
                          pathname: "/posters/" + this.props.auth.uid,
                          state: props
                        }}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/events/:id"
                    component={(props) => (
                      <Eventopenredux
                        {...props}
                        eventOpener={this.eventOpener}
                        eventChosen={this.state.eventChosen}
                        auth={this.props.auth}
                        resetEvent={() => this.setState({ eventChosen: "" })}
                      />
                    )}
                  />

                  <Route
                    exact
                    path="/events/edmtrain/:id"
                    children={(props) => (
                      <Eventedmopen
                        {...props}
                        eventEdm={this.state.chosenEdmevent}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/login"
                    component={(props) => (
                      <Login
                        {...props}
                        users={this.props.users}
                        auth={this.props.auth}
                        user={this.props.user}
                        loginOpenstate={this.state.loginOpen}
                        loginOpen={() => {
                          this.setState({ loginOpen: !this.state.loginOpen });
                        }}
                        menuOpener={this.menuOpener}
                        eventOpener={this.eventOpener}
                        redirectToReferrer={this.state.redirectToReferrer}
                        goSignupConfirmed={this.goSignupConfirmed}
                        watchingSignupVideo={this.state.watchingSignupVideo}
                        chatcloser={() => this.setState({ chatsopen: false })}
                        chatopener={() => this.setState({ chatsopen: true })}
                        userLoaded={this.props.userLoaded}
                        chatsopen={this.state.chatsopen}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/plan"
                    component={(props) => (
                      <Planner
                        {...props}
                        notes={this.state.notes}
                        Link={this.props.Link}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/plans/:id"
                    component={(props) => (
                      <PlanOpen
                        {...props}
                        note={this.state.notes[props.match.params.id]}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/plans/:id/edit"
                    component={(props) => (
                      <PlanEdit
                        {...props}
                        note={this.state.notes[props.match.params.id]}
                        onSave={(note) => this.handleSave(note, "updateNote")}
                        onDelete={(id) => this.handleDelete(id)}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/new"
                    component={(props) => (
                      <PlanNew
                        {...props}
                        handleSave={(note) =>
                          this.handleSave(note, "createNote")
                        }
                        myVariable={this.state.myVariable}
                      />
                    )}
                  />
                  <Route exact path="/accounts" component={Accounts}>
                    <Accounts menuOpener={this.menuOpener} />
                  </Route>
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )}
        />

        <Chats
          chatsopen={this.state.chatsopen}
          chatscloser={() => this.setState({ chatsopen: false })}
          users={this.props.users}
          auth={this.props.auth}
          user={this.props.user}
          firebase={this.props.firebase}
          achatisopen={() => this.setState({ achatopen: true })}
          achatisopenfalse={() => this.setState({ achatopen: false })}
          history={this.props.history}
        />
        {/*
          <PrivateRoute
            exact
            path="/chats/:id"
            component={props => (
              <Store>
              <Dashboard
              {...props}
              openUsers={this.state.openUsers}/></Store>
            )}
            />*/}
        <div className="showMap">
          <div>
            {/*<div
              className="closemapper"
              onClick={this.props.eventOpener}
            >
              &#10957;
            </div>*/}
            <div
              className="clicklandercity"
              onClick={() => {
                this.switchCMapOpener();
                this.eventCloser();
              }}
            >
              <HeaderizeWeatherCitySkyMap city={this.state.city} />
            </div>
            <form>
              <input
                className="Map_Header"
                placeholder={placeholderEventsSearch}
              />
            </form>
            <img src={search} className="search" alt="error" />
            <img
              src="https://www.dl.dropboxusercontent.com/s/szxg897vw4bwhs3/filter%20%281%29.png?dl=0"
              className="filtermap"
              onClick={this.eventTypesOpener}
              alt="error"
            />
            <img
              src="https://www.dl.dropboxusercontent.com/s/beczavknfv7j6s2/square%20dot%20%282%29.png?dl=0"
              className="square_dotmap"
              onClick={this.tilesOpener}
              alt="error"
            />
          </div>
          <Mapp
            zoomChoose1={this.zoomChoose1}
            zoomChoose2={this.zoomChoose2}
            zoomChoose3={this.zoomChoose3}
            zoomChoose4={this.zoomChoose4}
            //zoomChangedRecentlyFuncTrue={() => this.setState({ zoomChangedRecently: true })}
            //zoomChangedRecentlyFunc={() => this.setState({ zoomChangedRecently: false })}
            //zoomChangedRecently={this.state.zoomChangedRecently}
            description={this.state.description}
            humidity={this.state.humidity}
            city={this.state.city}
            input={<input />}
            search={this.state.search}
            locationLocation
            eventsOpen={this.state.eventsOpen}
            eventCloser={this.eventCloser}
            eventOpener={this.eventOpener}
            mapConcentrate={this.mapConcentrate}
            switchCMapOpener={this.switchCMapOpener}
            switchCMapOpen={this.state.switchCMapOpen}
            events={this.state.events}
            edmTrainevents={this.state.edmTrainevents}
            zoomChosen={this.state.zoomChosen}
            mapChanged={this.mapChanged}
            center={this.state.center}
            chooseEdmevent={this.choosetheedm}
            changeCity={this.changeCity}
            //chooseCitypoint={this.chooseCitypoint}
            myVariable={this.state.myVariable}
            chooseEvent={this.chooseEvent}
            haltMapCityChoose={this.haltChooseCity}
            eventTypesOpener={this.eventTypesOpener}
            tilesOpener={this.tilesOpener}
          />
        </div>
        {this.state.eventsOpen ? (
          <div onClick={this.eventCloser} className="randomheader1" />
        ) : null}

        <div
          onClick={this.eventCloser}
          className={
            this.state.eventsOpen
              ? "showEvents"
              : this.state.switchCMapOpen
              ? "showEventsfixed"
              : "hideEvents"
          }
        >
          <div ref={this.ref} />
          <Events
            eventsOpen={this.state.eventsOpen}
            switchCommunitiesOpener={this.switchCommunitiesOpener}
            switchCommunitiesOpen={this.state.switchCommunitiesOpen}
            switchCMapOpener={this.switchCMapOpener}
            switchCMapOpen={this.state.switchCMapOpen}
            menuOpener={this.menuOpener}
            events={this.state.events}
            edmTrainevents={this.state.edmTrainevents}
            chooseEvent={this.chooseEvent}
            chooseEdmevent={this.choosetheedm}
            city={this.state.city}
            eventOpener={this.eventOpener}
          />
          <div
            className="backtotoday"
            onClick={() =>
              this.ref.current.scrollIntoView({ behavior: "smooth" })
            }
          >
            &#8635; today
          </div>
        </div>

        <div
          style={{
            display: "flex",
            height: this.state.distance && this.state.distance * 1.60934,
            width: this.state.distance && this.state.distance * 1.60934,
            border: "1pxsolid#333",
            borderRadius: "50%"
          }}
        />
        <div className={this.state.switchCMapOpen ? "showSWmap" : "hideSWmap"}>
          <SwitchCMap
            startQueryCity={this.startQueryCity}
            eventsOpen={this.state.eventsOpen}
            chosenCity={this.state.chosenCity}
            chooseCitypoint={(location, distance, city, cityapi, state) =>
              this.chooseCitypoint(location, distance, city, cityapi, state)
            }
            switchCMapOpener={this.switchCMapOpener}
            switchCMapCloser={this.switchCMapCloser}
            switchCMapOpen={this.state.switchCMapOpen}
            scrollingRadius={() =>
              this.setState({ scrollingRadius: true }, () => {
                setTimeout(() => {
                  this.setState({ scrollingRadius: false });
                }, 1000);
              })
            }
            input={<input />}
            onClose={() => {}}
            locationLocation
          />
          <div onClick={this.switchCMapCloser} className="randomheader" />
        </div>
        <CreateDrawer
          show={this.state.createSliderOpen}
          toggle={this.createSliderCloser}
        />
        <MainFooter
          user={this.props.user}
          chatopener={() => this.setState({ chatsopen: true })}
          chatcloser={() => this.setState({ chatsopen: false })}
          chatsopen={this.state.chatsopen}
          loginOpen={this.state.loginOpen}
          toggle={this.createSliderOpener}
          eventOpener={this.eventOpener}
          eventCloser={this.eventCloser}
          eventsOpen={this.state.eventsOpen}
          achatopen={this.state.achatopen}
          //zoomChangedRecentlyFuncTrue={() => this.setState({ zoomChangedRecently: true })}
          //zoomChangedRecentlyFunc={() => this.setState({ zoomChangedRecently: false })}
          //zoomChangedRecently={this.state.zoomChangedRecently}
        />
        <SignupConfirm
          watchingSignupVideo={this.state.watchingSignupVideo}
          signupConfirmClose={this.signupConfirmClose}
          menuOpener={this.menuOpener}
          closeMenu={() => this.setState({ menuOpener: false })}
        />
        {
          //this.state.queryingWait ? <div className="queryWaitLoading">loading</div> : null
        }
        <div>
          <TilesMap
            show={this.state.typesOrTilesMap}
            close={this.tilesCloser}
          />

          <EventTypesMap
            show={this.state.typesOrTilesMap}
            close={this.eventTypesCloser}
            etypeChanger={this.etypeChanger}
          />
        </div>
        <div
          className={
            this.props.user && this.props.user.webhook
              ? "showingwindow"
              : "notshowingwindow"
          }
        >
          {" "}
          Window Popup
        </div>
      </div>
    );
  }
}

export default App;
