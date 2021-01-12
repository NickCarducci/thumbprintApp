import React from "react";
import "./Map.css";
import ".././Icons/Headerstyles.css";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";
import MarkerEdm from "./MarkerEdm";
import mapStyles from "./mapStyles.json";

import "./SearchBox.css";
import ".././Icons/Headerstyles.css";

import MapWrapper from "./MapWrapper";
import * as shape from "d3-shape";
import ART from "react-art";

const d3 = {
  shape
};

const { Surface, Group, Shape } = ART;
const google = window.google;
const todaynow = new Date();

class Mapp extends React.Component {
  constructor(props) {
    super(props);
    this.service = new google.maps.places.AutocompleteService();
    this.placesService = new google.maps.places.PlacesService();
    this.state = {
      center: [34.0522, -118.2437],
      distance: 15,
      zoomChosen: 13,
      city: "Los Angeles",
      cityapi: "Los%20Angeles",
      state: "CA",
      typesOrTilesMap: null,
      zoomerOpen: false,
      switchCMapOpen: false,
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
      search: "",
      location: "",
      //mapheight: "",
      zoomChangedRecently: false,
      mylatesttap: "",
      apiKeyFound: false,
      zoomerControl: false,
      data: []
    };
    this.map = React.createRef();
    this.thing = React.createRef();
    this.thing2 = React.createRef();
    this.eventSearch = React.createRef();
    //this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  zoomerOpener = () => {
    this.setState({
      zoomerOpen: !this.state.zoomerOpen
    });
  };
  onPlacesChanged = e => {
    e.preventDefault();
    //console.log(e.target.value);
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

  doit = () => {
    this.doubleTap();
    this.setState({ mylatesttap: new Date().getTime() });
  };
  switchCMapOpener = () => {
    this.setState({ switchCMapOpen: !this.state.switchCMapOpen });
  };
  switchCMapCloser = () => {
    this.setState({ switchCMapOpen: false });
  };
  doneCitySearch = () => {
    this.eventSearch.focus();
    this.eventSearch.blur();
  };
  radiusToZoom = radius => {
    return;
  };
  openEvent = event => {
    console.log("clicked");
    this.props.history.push("/events/" + event.id);
  };

  //clusters
  /*
  handleMapChange = ({ center, zoom, bounds }) => {
    this.setState({
      mapOptions: {
        center,
        zoom,
        bounds
      }
    });
  };*/
  componentWillUnmount = () => {
    clearTimeout(this.timeforresize);
  };
  componentDidMount = async () => {
    //google.maps.event.addDomListener(window, "resize", function() {
    //this.props && this.props.haltMapCityChoose();
    //});
    /*this.props.chooseCitypoint(
      this.state.center,
      this.state.distance,
      this.state.city,
      this.state.cityapi,
      this.state.state
    );
    this.thing &&
      this.thing.current.addEventListener("gestureend", e => {
        e.preventDefault();
        console.log("touched");
        if (e.scale > 1) {
          this.setState({ zoomChangedRecently: true });
        }
      });*/

    this.searchbox &&
      this.searchbox.current.addEventListener("focus", e => {
        e.preventDefault();
        this.searchbox.current.blur();
      });
    this.setState({
      places: []
    });
  };
  /*
  apiIsLoaded = (map, maps, locations) => {
    if (map) {
      maps.event.addDomListenerOnce(map, "idle", () => {
        maps.event.addDomListener(window, "resize", () => {
          this.setState({ haltMap: true }, () => {
            this.timeforresize = setTimeout(() => {
              this.setState({ haltMap: false });
            }, 5000);
          });
        });
      });
    }
  };
  calculateZoom = () => {
    var Lat = this.state.location[0];
    var Length = this.state.distance * 1.60934;
    var Ratio = 100;
    var WidthPixel = window.innerWidth;
    Length = Length * 1000;
    var k = WidthPixel * 156543.03392 * Math.cos((Lat * Math.PI) / 180);
    //console.log(k);
    var myZoom = Math.round(Math.log((Ratio * k) / (Length * 100)) / Math.LN2);
    myZoom = myZoom - 1;
    //https:// gis.stackexchange.com/questions/7430/what-ratio-scales-do-google-maps-zoom-levels-correspond-to/31551#31551
    if (this.state.scrollChosen !== myZoom) {
      this.setState({ scrollChosen: myZoom });
    }
    return myZoom;
  };
  Arc = ({
    size = this.state.distance * 1.6,
    outerRadius = this.state.distance,
    innerRadius = this.state.distance - 0.0001,
    startAngleRad = 0,
    endAngleRad = 10
  }) => {
    const width = size;
    const height = size;
    const arcGenerator = d3.shape
      .arc()
      .outerRadius(outerRadius)
      .innerRadius(innerRadius)
      .startAngle(startAngleRad)
      .endAngle(endAngleRad);

    const x = width / 2;
    const y = height / 2;

    return (
      <div className="containradius">
        <div className="placeRadiusOnMap">
          <Surface width={width} height={height} stroke={"#55e"} fill={"#55e"}>
            <Group x={x} y={y}>
              <Shape key="arc" d={arcGenerator()} fill="#FFFFFF08" />
            </Group>
          </Surface>
        </div>
      </div>
    );
  };*/
  choosePrediction = async place => {
    const q = place.description; //.replace(", USA", "");
    //console.log(q);
    await fetch(
      `https://nominatim.openstreetmap.org/search?q=${q}&accept-language=en&limit=1&format=json`,
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
      .then(body => {
        //console.log(body);
        const location = [Number(body[0].lat), Number(body[0].lon)];
        //this.props.fetchLocation(location);
        //console.log(location);
        this.props.changeCity(location);
        this.props.chooseCitypoint(location, {
          distance: 15,
          city: place.description,
          cityapi: place.description.replace(" ", "%"),
          state: place.terms[place.terms.length - 1].value
        });
        this.setState({
          center: location,
          zoomerOpen: false,
          places: []
        });
        //this.props.zoomChangedRecently();
      })
      .catch(err => {
        console.log(err);
      });
  };
  render(props) {
    //console.log(this.props.zoom);
    const MAP = {
      defaultZoom: 6,
      defaultCenter: { lat: 34.0522, lng: -118.2437 },
      options: {
        styles: mapStyles,
        maxZoom: 19,
        gestureHandling: "greedy"
        //center: this.props.center
      }
    };
    const { center } = this.props;
    //console.log(this.props.events);
    return (
      <div>
        <div
          ref={this.thing}
          //onKeyDown={this.onKeyPressed}
        >
          <div className="mapheadermap">
            <div>
              {this.state.zoomerOpen ? (
                <div className="fixedsearchmap">
                  <div className="relativesearchmap">
                    <form
                      onSubmit={e => {
                        e.preventDefault();
                        return false;
                      }}
                    >
                      <input
                        type="text"
                        ref={this.searchbox}
                        onChange={this.onPlacesChanged}
                        placeholder="Enter a query"
                        className="forplaceholdersearch"
                        style={{
                          boxSizing: `border-box`,
                          border: `1px solid transparent`,
                          width: `240px`,
                          height: `32px`,
                          padding: `10px 12px`,
                          borderRadius: `3px`,
                          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                          fontSize: `14px`,
                          outline: `none`,
                          textOverflow: `ellipses`
                        }}
                      />
                      <div className="placesresultsholder">
                        {this.state.places &&
                          this.state.places.map(place => {
                            return (
                              <div
                                onClick={() => this.choosePrediction(place)}
                                className="placesresults"
                              >
                                {place.description}
                              </div>
                            );
                          })}
                      </div>
                    </form>
                  </div>
                </div>
              ) : null}
              <div className="mapzoomer">
                <div className="mapzoomerbtn" onClick={this.zoomerOpener}>
                  &#9635; {this.state.search}
                </div>
                {this.state.zoomerOpen ? (
                  <div>
                    <div onClick={this.props.zoomChoose1}>
                      {this.props.zoomChosen === 16 ? (
                        <div className="mapzoom1">&#9673;</div>
                      ) : (
                        <div className="mapzoom1">&#9711;</div>
                      )}
                    </div>
                    <div onClick={this.props.zoomChoose2}>
                      {this.props.zoomChosen === 13 ? (
                        <div className="mapzoom2">&#9673;</div>
                      ) : (
                        <div className="mapzoom2">&#9711;</div>
                      )}
                    </div>
                    <div onClick={this.props.zoomChoose3}>
                      {this.props.zoomChosen === 10 ? (
                        <div className="mapzoom3">&#9673;</div>
                      ) : (
                        <div className="mapzoom3">&#9711;</div>
                      )}
                    </div>
                    <div onClick={this.props.zoomChoose4}>
                      {this.props.zoomChosen === 7 ? (
                        <div className="mapzoom4">&#9673;</div>
                      ) : (
                        <div className="mapzoom4">&#9711;</div>
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            {/*<this.Arc />*/}
            <div className="mapoutline">
              <MapWrapper>
                <GoogleMapReact
                  onClick={this.props.mapConcentrate}
                  zoom={this.props.zoomChosen}
                  //onGoogleApiLoaded={({ map, maps }) =>
                  //this.apiIsLoaded(map, maps)
                  //}
                  //onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                  ref={this.map}
                  defaultZoom={13}
                  defaultCenter={[34.0522, -118.2437]}
                  options={MAP.options}
                  onChange={() => {
                    return null;
                  }}
                  center={center}
                  yesIWantToUseGoogleMapApiInternals
                  bootstrapURLKeys={{
                    key: "AIzaSyAs9BpsQZFolkkBn4ShDTzb1znu_7JM894"
                  }}
                  /*onGoogleApiLoaded={({ map, maps }) => {
                        this.setGoogleMapRef(map, maps);
                      }}*/
                  //onChildClick=
                >
                  {this.props.edmTrainevents &&
                    this.props.edmTrainevents
                      .concat()
                      .reverse()
                      .map(eventEdm => {
                        //console.log(eventEdm);
                        if (
                          new Date(eventEdm.date).getTime() + 25200000 >
                          new Date().getTime()
                        ) {
                          let location = [
                            eventEdm.venue.latitude,
                            eventEdm.venue.longitude
                          ];
                          /*var latlng = new google.maps.LatLng(
                          location[0],
                          location[1]
                        );*/
                          const eventid = eventEdm.id;
                          //const done = []
                          //done.push(eventid)
                          //if(this.state.displaying.includes(eventid)) {return null}
                          //else{
                          return (
                            <MarkerEdm
                              key={eventid}
                              ref={"this." + eventid}
                              lat={location[0]}
                              lng={location[1]}
                              name="My Marker"
                              eventEdm={eventEdm}
                              chooseEdmevent={this.props.chooseEdmevent}
                            />
                          );
                        } else {
                          return null;
                        }
                      })}
                  {this.props.events.length > 0 &&
                    this.props.events.map(x => {
                      console.log(x.data.date);
                      if (x.data.date._seconds * 1000 > new Date().getTime()) {
                        console.log("ok");
                        let location = [
                          x.data.location.latitude,
                          x.data.location.longitude
                        ];
                        var latlng = new google.maps.LatLng(
                          location[0],
                          location[1]
                        );
                        return (
                          <Marker
                            //id={x.id}
                            key={x.id}
                            ref={"this." + x.id}
                            lat={location[0]}
                            lng={location[1]}
                            name="My Marker"
                            event={x}
                            chooseEvent={this.props.chooseEvent}
                          />
                        );
                      } else {
                        console.log("none");
                      }
                    })}
                </GoogleMapReact>
              </MapWrapper>
            </div>
            {this.state.zoomerOpen ? (
              <div className="zoomerbackground" onClick={this.zoomerOpener} />
            ) : null}
          </div>
          {/*this.state.zoomChangedRecently ? (
            <div onClick={() => this.doit()} className="zoomoutquick1">
              Double-tap to zoom out
            </div>
          ) : null}*/}
        </div>
      </div>
    );
  }
}
export default Mapp;

/*this.props.events.doc(data.id).delete()
                  this.props.edmTrainevents &&
                      this.props.edmTrainevents
                        .concat()
                        .reverse()
                        .map(eventEdm => {
                          //console.log(eventEdm);
                          if (
                            new Date(eventEdm.date).getTime() + 25200000 >
                            new Date().getTime()
                          ) {
                            let location = [
                              eventEdm.venue.latitude,
                              eventEdm.venue.longitude
                            ];
                            /*var latlng = new google.maps.LatLng(
                              location[0],
                              location[1]
                            );
                            const eventid = eventEdm.id;
                            //const done = []
                            //done.push(eventid)
                            //if(this.state.displaying.includes(eventid)) {return null}
                            //else{
                            return (
                              <MarkerEdm
                                key={eventid}
                                ref={"this." + eventid}
                                lat={location[0]}
                                lng={location[1]}
                                name="My Marker"
                                eventEdm={eventEdm}
                                chooseEdmevent={this.props.chooseEdmevent}
                              />
                            );
                          } else {return null}
                        })*/
