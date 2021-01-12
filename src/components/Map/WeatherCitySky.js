import React from "react";
import sky from ".././Icons/Images/sky.png";
//import border from ".././Icons/Images/border.png";
import sky2 from ".././Icons/Images/sky2.png";
import sky3 from ".././Icons/Images/sky3.png";
import stars from ".././Icons/Images/stars.gif";
//import Geocode from "react-geocode";

import ".././Explore/Cities.css";
const google = window.google;

class WeatherCitySky extends React.Component {
  constructor(props) {
    super(props);
    this.service = new google.maps.places.PlacesService();
    this.state = {
      isDataLoaded: false,
      time: new Date().getHours(),
      city: this.props.city,
      //location:this.props.city.location,
      locationlat: "",
      locationlng: "",
      description: "",
      humidity: 0,
      rain1: 0,
      snow1: 0,
      rain3: 0,
      snow3: 0
    };
  } /*
  getWeather = async e => {
    e.preventDefault();
    console.log(this.state.city)
    const cityname = this.state.city;
    //const city = e.target.elements.city.value;
    const api_call = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${API_KEY}&units=metric`
    );
    const data = await api_call.json();
    //console.log(data);
    this.setState({
      description: data.main.description,
      humidity: data.main.humidity,
      city: data.name
    });
  };*/
  // timezone - javascript
/*
  getWeather = async location => {
    //console.log(location)
    this.setState({
      loading: true
    }); /*
      await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${
          location.lat
        }&lon=${location.lng}&appid=${API_KEY}`
      )
        .then(async api_call => {
          let data = await api_call.json();
          console.log(location)
          console.log(this.state.city)
          console.log(this.props.city.description)
          console.log(data);
          if (data.cod === 200) {
            data.weather &&
              this.setState({ description: data.weather["0"].description });
            data.humidity && this.setState({ humidity: data.main.humidity });
            data.clouds && this.setState({ clouds: data.clouds.all });
            data.rain && this.setState({ rain1: Object.values(data.rain )})
            //data.rain && this.setState({ rain3: Object.values(data.rain) });
            data.snow && this.setState({ snow1: Object.values(data.snow )});
            //data.snow && this.setState({ snow3: Object.values(data.snow )});
            this.setState({
              loading: false
            });
          } else {
            this.setState({
              description: "",
              humidity: 0,
              clouds: 0,
              loading: false
            });
          }
          data = [];
        })
        .catch(data => console.log(data.cod));
  };
  locationFromCityDescription = async () => {
    await Geocode.setApiKey("AIzaSyAs9BpsQZFolkkBn4ShDTzb1znu_7JM894");
    await Geocode.fromAddress(JSON.stringify(this.props.city.description))
      .then(
        response => {
          const { lat, lng } = response.results[0].geometry.location;
          //console.log(lat, lng);
          let location = {
            lat: lat,
            lng: lng
          };
          this.getWeather(location); /*.when(this.state.loading === false)
        },
        error => {
          console.error(error);
        }
      )
      .catch(err => console.log(err));
  };*/
  currentTime() {
    this.setState({
      time: new Date().getHours()
    });
  }
  componentDidMount() {
    //console.log(this.state.city)
    //const cityname = ;
    //const city = e.target.elements.city.value;
    //var obj = Object.create(null);

    //console.log(this.props.city.description);
    //console.log(this.state.location);
    //this.locationFromCityDescription();
    /*
    var request = {
  placeId: this.props.city,
  fields: ['name', 'rating', 'formatted_phone_number', 'geometry']
};
    console.log(this.state);
    this.service.getDetails(request, (place, status) => {
      console.log(status)
  if (status === google.maps.places.PlacesServiceStatus.OK) {
     console.log(place)
     let location = place.geometry.location
     this.getWeather(location)
  } else {
    console.log(place)
  }
    })
    
*/
    this.interval = setInterval(() => this.currentTime(), 3600000);
  } /*
  componentDidUpdate(){
    this.state.city !== this.props.city.description ?
    this.setState({city:this.props.city.description})
    : null
  }
*/
  componentWillUnmount() {
    clearInterval(this.interval);
    this.setState({
      isDataLoaded: false
    });
  }
  componentDidUpdate = () => {
    if (this.props.city.description !== this.state.city.description) {
      this.setState({ city: this.props.city });
      //this.locationFromCityDescription();
    }
  };

  render() {
    //console.log("state.city" + this.state.city);
    //console.log("props.city.description"+this.props.city.description.replace(", USA", ""));
    return (
      <div className="citybundlemap">
        <div>
          {this.state.time === 4 || this.state.time === 5 ? (
            <img src={sky3} className="sky" alt="error" />
          ) : this.state.time === 6 ||
            this.state.time === 7 ||
            this.state.time === 8 ||
            this.state.time === 9 ||
            this.state.time === 10 ||
            this.state.time === 11 ||
            this.state.time === 12 ||
            this.state.time === 13 ||
            this.state.time === 14 ||
            this.state.time === 15 ||
            this.state.time === 16 ||
            this.state.time === 17 ||
            this.state.time === 18 ||
            this.state.time === 19 ? (
            <img src={sky} className="sky" alt="error" />
          ) : (
            <img src={sky2} className="sky" alt="error" />
          )}
          {this.state.time === 4 ||
          this.state.time === 5 ||
          this.state.time === 6 ||
          this.state.time === 7 ||
          this.state.time === 8 ||
          this.state.time === 9 ||
          this.state.time === 10 ||
          this.state.time === 11 ||
          this.state.time === 12 ||
          this.state.time === 13 ||
          this.state.time === 14 ||
          this.state.time === 15 ||
          this.state.time === 16 ||
          this.state.time === 17 ||
          this.state.time === 18 ||
          this.state.time === 19 ? null : (
            <img src={stars} className="stars" alt="error" />
          )}
          {this.state.clouds > 50 || this.state.clouds === 50 ? (
            <img
              src="https://www.dl.dropboxusercontent.com/s/xu76g31mxovfc4p/ezgif.com-gif-maker%20%2816%29.gif?dl=0"
              className="city"
              alt="error"
            />
          ) : this.state.clouds < 50 && this.state.clouds > 10 ? (
            <img
              src="https://www.dl.dropboxusercontent.com/s/bxl9b9m2hvikfsu/ezgif.com-gif-maker%20%2817%29.gif?dl=0"
              className="city"
              alt="error"
            />
          ) : null}
          {(this.state.rain1 > 0 && this.state.rain1 < 0.5) ||
          (this.state.rain3 > 0 && this.state.rain3 < 0.5) ? (
            <img
              src="https://www.dl.dropboxusercontent.com/s/8mey5b8p5mlos29/Rain%28Light%29.gif?dl=0"
              className="city"
              alt="error"
            />
          ) : this.state.rain1 > 0.5 ||
            this.state.rain1 === 0.5 ||
            (this.state.rain3 > 0.5 || this.state.rain3 === 0.5) ? (
            <img
              src="https://www.dl.dropboxusercontent.com/s/novwfujik3ini17/ezgif.com-gif-maker%20%2818%29.gif?dl=0"
              className="city"
              alt="error"
            />
          ) : null}
          {(this.state.snow1 > 0 && this.state.snow1 < 0.5) ||
          (this.state.snow3 > 0 && this.state.snow3 < 0.5) ? (
            <img
              src="https://www.dl.dropboxusercontent.com/s/h5d5oty0646dmtt/Snow%28Light%29.gif?dl=0"
              className="city"
              alt="error"
            />
          ) : this.state.snow1 > 0.5 ||
            this.state.snow1 === 0.5 ||
            (this.state.snow3 > 0.5 || this.state.snow3 === 0.5) ? (
            <img
              src="https://www.dl.dropboxusercontent.com/s/lox9e6bfhxvb0vo/ezgif.com-gif-maker%20%2819%29.gif?dl=0"
              className="city"
              alt="error"
            />
          ) : null}
          {this.props.city === "BALTIMORE" ? (
            <img
              src="https://drive.google.com/open?id=0B2xwokez_l7RbG41UXVPem9kOHM"
              className="city"
              alt="error"
            />
          ) : (
            <img
              src="https://www.dl.dropboxusercontent.com/s/yz6bh9f1wqbk4k6/Plain%28Feather%29%20%283%29.gif?dl=0"
              className="city"
              alt="error"
            />
          )}

          {this.state.time === 4 ||
          this.state.time === 5 ||
          this.state.time === 6 ||
          this.state.time === 7 ||
          this.state.time === 8 ||
          this.state.time === 9 ||
          this.state.time === 10 ||
          this.state.time === 11 ||
          this.state.time === 12 ||
          this.state.time === 13 ||
          this.state.time === 14 ||
          this.state.time === 15 ||
          this.state.time === 16 ||
          this.state.time === 17 ||
          this.state.time === 18 ||
          this.state.time === 19 ? null : (
            <img src={stars} className="stars" alt="error" />
          )}
        </div>
      </div>
    );
  }
}

export default WeatherCitySky;