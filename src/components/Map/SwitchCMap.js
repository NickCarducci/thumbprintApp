import React from "react";
import WeatherCitySky from ".././Map/WeatherCitySky";
import Slider from "react-input-slider";
import powered from "../Icons/Images/powered_by_google_on_white.png";

import ".././Icons/Headerstyles.css";
import "./CitiesMap.css";

const google = window.google;

class SwitchCMap extends React.Component {
  constructor(props) {
    super(props);
    this.service = new google.maps.places.AutocompleteService();
    this.state = {
      hasResults: false,
      predictions: [],
      done: "",
      y: 15,
      lasty: 17,
      scrollingRadius: false,
      cityQuery: ""
    };
    this.clickNYCmap.bind(this);
    this.clickLAmap.bind(this);
    this.clickCityGifmap.bind(this);
    this.onChange = this.onChange.bind(this);
    this.textInput = React.createRef();
    //this.submitCitySearch = debounce(2000, this.submitCitySearch);
  }

  clickLAmap = () => {
    const location = [34.0522, -118.2437];
    const distance = 15;
    const city = "Los Angeles";
    const cityapi = "Los%20Angeles";
    const state = "CA";
    this.props.switchCMapCloser();
    this.props.chooseCitypoint(location, distance, city, cityapi, state);
    //this.props.fetchLocation(location);
  };
  clickNYCmap = () => {
    const location = [40.71427, -74.00597];
    const distance = 15;
    const city = "New York City";
    const cityapi = "New%20York%20City";
    const state = "NY";
    this.props.switchCMapCloser();

    this.props.chooseCitypoint(location, distance, city, cityapi, state);
    //this.props.fetchLocation(location);
  };

  clickCityGifmap = async prediction => {
    //console.log(prediction)
    this.props.startQueryCity();
    this.setState({ queryingWait: true });
    const q = prediction.description; //.replace(", USA", ""); // + " and" + str.substr(lIndex + 1); //console.log(city);
    var city = prediction.structured_formatting.main_text;
    var state = prediction.structured_formatting.secondary_text.replace(
      /,(.*)/,
      ""
    );
    //const cityapi = city.replace(/ /, "+");

    //console.log(city);
    //console.log(state);
    /*const city = prediction.structured_formatting.secondary_text.replace(
      /(?=(.*),)/,
      ""
    );*/
    const cityapi = city.replace(/ /, "%20");
    console.log(cityapi);
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
        const location = [body[0].lat, body[0].lon];
        const distance = this.state.y;
        console.log(distance);
        this.props.switchCMapCloser();
        this.props.chooseCitypoint(location, distance, city, cityapi, state);
        //this.props.fetchLocation(location);
      })
      .catch(err => console.log(err));
  };
  submitCitySearch = () => {
    //this.typingTimer = setTimeout(() => {
    this.setState({ new: this.state.done });
    const { types = ["(cities)"] } = this.props;
    this.service.getPlacePredictions(
      { input: this.state.done, types },
      (predictions, status) => {
        if (status === "OK" && predictions && predictions.length > 0) {
          console.log(predictions);
        } else {
          //console.log(predictions);
        }
        this.setState({
          predictions,
          loading: false
        });
      }
    );
    //}, 2000);
  };
  onChange(e) {
    e.persist();
    const same = e.target.value;
    clearTimeout(this.closer);
    this.closer = setTimeout(this.setState({ typing: false }), 2000);
    !this.state.typing && this.submitCitySearch(same);
  } /*
  evntHandler = debounce(e => {
    this.submitCitySearch(e);
    this.setState({loading:false})
  }, 2000);*/
  componentDidMount() {
    /*
    this.textInput.current.addEventListener("keyup", () => {
      console.log("up")
      console.log(this.textInput.current.value)
    });
    this.textInput.current.addEventListener("keydown", e => {
      console.log("=down")
      e.preventDefault();
      this.setState({ typing: true });
      clearTimeout(typingTimer);
    });
    if (this.state.cityQuery) {
      this.placesServiceMap = new google.maps.places.PlacesService(
        this.state.cityQuery
      );
      this.placesServiceMap.getDetails(
        { placeId: this.state.cityQuery },
        (e, status) => {
          if (status === "OK") {
            this.refs.input.value = e.formatted_address;
          }
        }
      );
    }*/
  }
  stopSubmit(e) {
    e.preventDefault();
    return false;
  }
  render(props) {
    //console.log(this.state.predictions);
    const { predictions } = this.state;
    return (
      <div //className={this.props.switchCMapOpen ? "dodisplay" : "dontdisplay"}
      >
        <div className="mcslide-drawermap">
          <div>
            <div>
              {/*<img
          src={back}
          className="backSWback"
          alt="error"
          onClick={this.props.switchCMapCloser}
        />*/}
              <form
                onSubmit={e => {
                  e.preventDefault();
                  this.submitCitySearch();
                }}
              >
                <input
                  className="Switch_CMap_Header"
                  ref={this.textInput}
                  name="city"
                  placeholder="Try somewhere else"
                  autoComplete="off"
                  autoCorrect="off"
                  //value={this.state.done}
                  /*onChange={e => {
                    e.persist();
                    this.setState({loading:true})
                    this.evntHandler(e);
                  }}*/
                  onChange={e => {
                    this.setState({ done: e.target.value });
                  }}
                  // onKeyPress="return event.keyCode != 13;"
                />
              </form>
              {/*<img src={search} className="searchSWsearch" alt="error" />*/}
            </div>

            {this.state.done === "" ? (
              this.state.loading ? (
                <div className="loadingcitiesresults">loading</div>
              ) : (
                <div className="featuredcitysetmap">
                  <div onClick={this.clickLAmap}>
                    <img
                      src="https://www.dl.dropboxusercontent.com/s/k9y59qfis6fvhyd/FeaturedCities_La.png?dl=0"
                      className="featuredcitymap"
                      alt="error"
                      onClick={this.props.switchCMapCloser}
                    />
                  </div>

                  <div onClick={this.clickNYCmap}>
                    <img
                      src="https://www.dl.dropboxusercontent.com/s/b80v5c2bfaxe6t8/FeaturedCities_Nyc.png?dl=0"
                      className="featuredcitymap"
                      alt="error"
                      onClick={this.props.switchCMapCloser}
                    />
                  </div>
                </div>
              )
            ) : this.state.loading ? (
              <div className="loadingcitiesresults">loading</div>
            ) : (
              <div>
                <div className="Citiesmap">
                  {predictions &&
                  predictions.length > 0 &&
                  this.state.done === this.state.new ? (
                    predictions.map(prediction => (
                      <div onClick={() => this.clickCityGifmap(prediction)}>
                        <WeatherCitySky city={prediction} className="onecity" />
                        {prediction.description}
                      </div>
                    ))
                  ) : (
                    <div className="topoffenter">
                      &nbsp;&nbsp;&nbsp;&nbsp;Press enter to search for cities
                    </div>
                  )}
                </div>

                <img className="pwrGoogle" src={powered} alt="error" />
              </div>
            )}
            <div className="radiusExpectedToolbar">
              <div className="radiusnumber">
                {this.state.y}
                <br />
                mi
              </div>
              <Slider
                axis="y"
                y={this.state.y}
                onChange={({ y }) => {
                  this.setState(state => ({ /*...state, */ y }));
                  this.props.scrollingRadius();
                  this.setState({ scrollingRadius: true }, () => {
                    setTimeout(() => {
                      this.setState({ scrollingRadius: false });
                    }, 1000);
                  });
                }}
              />
            </div>
            {/*this.state.search ? (
              <div className="yrnotagline">
                Weather forecast from Yr delivered by the Norwegian
                Meteorological Institute and NRK www.yr.no
              </div>
            ) : null}
          </div>
          {this.state.search ? (
            <div className="yrnotagline">
              Weather forecast from Yr delivered by the Norwegian Meteorological
              Institute and NRK www.yr.no
            </div>
          ) : null*/}
            {/*this.state.queryingWait ? (
            <div className="queryWaitLoading">loading</div>
          ) : null*/}
          </div>
        </div>
      </div>
    );
  }
}

export default SwitchCMap;
