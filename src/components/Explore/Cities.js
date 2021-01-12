import React from "react";
/*import sky from ".././Icons/Images/sky.png";
import city from ".././Icons/Images/city.gif";
import border from ".././Icons/Images/border.png";*/
import WeatherCitySky from "./WeatherCitySky";

import "./Cities.css";

function Cities() {
  return (
    <div>
      <div className="Cities">
        <div>
          <WeatherCitySky /*getWeather={this.getWeather}*//>
          {/*<img src={city} className="citys" alt="error" />
          <img src={sky} className="skys" alt="error" />
  <img src={border} className="borders" alt="error" />*/}
          CityName
        </div>
        <div>CityName</div>
        <div>CityName</div>
        <div>CityName</div>
      </div>
    </div>
  );
}

export default Cities;