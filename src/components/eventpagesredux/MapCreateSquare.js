import React from "react";
//import { compose } from "recompose";
import GoogleMapReact from "google-map-react";
import MapWrapper from "../Map/MapWrapper";
import mapStyles from "../Map/mapStyles.json";

/*const MAP = {
  defaultZoom: 6,
  defaultCenter: [{ lat: 34.0522, lng: -118.2437 }],
  options: {
    styles: mapStyles,
    maxZoom: 19
  }
};*/
///* global google */
//const google = window.google;
class MapCreateSquare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKeyFound: false,
      scrolling: false,
      //locations: [{ lat: 34.0522, lng: -118.2437 }],
      mapOptions: {
        center: [{ lat: 34.0522, lng: -118.2437 }],
        zoom: 6
      },
      clusters: [],
      listed: [],
      oldPlanner: {},
      markerCluster: "",
      markers: [],
      latLng: { lat: 34.0522, lng: -118.2437 },
      location: [34.0522, -118.2437]
    };
    this.thing = React.createRef();
  }

  componentDidMount = () => {
    this.getMapsApi();
  };
  getMapsApi = async () => {
    await fetch(
      "https://us-central1-thumbprint-1c31n.cloudfunctions.net/getMapsApi",
      {
        method: "GET",
        headers: {
          "Content-Type": "Application/JSON",
          "Access-Control-Request-Method": "GET"
        },
        maxAge: 3600
      }
    )
      .then(async response => await response.json())
      .then(json => {
        this.myVariable = json.apiKey;
      })
      .then(() => {
        this.setState({ apiKeyFound: true });
        console.log("ok");
      })
      .catch(err => {
        console.log(err);
      });
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
  render(props) {
    //console.log(this.props.location)
    const MAP = {
      defaultZoom: 6,
      defaultCenter: { lat: 34.0522, lng: -118.2437 },
      options: {
        styles: mapStyles,
        maxZoom: 19,
        center: this.props.location
      }
    };
    return (
      <div className="mapoutlinesquare">
        <MapWrapper>
          <GoogleMapReact
            defaultZoom={6}
            defaultCenter={[34.0522, -118.2437]}
            options={MAP.options}
            zoom={this.state.zoomChosen}
            onChange={this.handleMapChange}
            yesIWantToUseGoogleMapApiInternals
            bootstrapURLKeys={{ key: this.myVariable }}
            onGoogleApiLoaded={() => {
              console.log("loaded");
            }}
          />
        </MapWrapper>
      </div>
    );
  }
}

export default MapCreateSquare;

/*
  //clusters
  handleMapChange = ({ center, zoom, bounds }) => {
    this.setState(
      {
        mapOptions: {
          center,
          zoom,
          bounds
        }
      },
      () => {
        if (this.state.markers) {
          this.createClusters(this.props);
        }
        //this.props.planner && this.makeListToState();
      }
    );
  };
  
  setGoogleMapRef(map, maps) {
    this.googleMapRef = map;
    this.googleRef = maps; //
    var markerCluster = {};
    var markers = this.props.planner &&
      this.props.planner.map(
        event => {
          console.log("adding");
          var eventloc = event.location;
          var eventlocproper = new this.googleRef.LatLng(
            eventloc[0],
            eventloc[1]
          );
          let locations = [];
          locations.push(eventlocproper);
          console.log("locations" + locations);
          let markers = [];
          locations.map(location => {
            const marker = new this.googleRef.Marker({ position: location });
            markers.push(marker);

            console.log("markers" + markers);
            return markers;
          });
          return markers
        })
}*/

/*
import React from 'react'
import { compose, withProps, withState, withHandlers, lifecycle } from "recompose"
import { withGoogleMap, GoogleMap, DirectionsRenderer, Marker } from "react-google-maps"
import { connect } from "react-redux";

/* global google 


const MapCreateSquare = compose(
  withProps({
    containerElement: <div style={{ height: `250px` }} />,
    mapElement: <div style={{ height: `250px` }} />,
  }),
  withState('zoom', 'onZoomChange', 12),
  lifecycle({
    componentDidMount() {
      this.setState({
        targetLat: 20.5937,
        targetLng: 78.9629,
      })
    },
    componentWillReceiveProps(nextProps) {
      if (this.props.location) {
        this.setState({
          targetLat: this.props.location.lat,
          targetLng: nextProps.location.lng,
          center : new google.maps.LatLng(this.props.location.lat, this.props.location.lng)
        })
      }
    },
    shouldComponentUpdate(nextProps, nextState) {
      return this.state !== nextState
    },
  }),
  withGoogleMap
) ((props) => 
  <GoogleMap
    defaultZoom={8}
    center={new google.maps.LatLng(props.targetLat, props.targetLng)}
zoom={props.zoom}
 
  >
      <Marker position={{ lat: props.targetLat, lng: props.targetLng }} />
    
  </GoogleMap>
);

export default MapCreateSquare

/*
export default connect(mapStateToProps, null)(MapCreateSquare)
const mapStateToProps = (state) => {
  return {
    directions: state.directions,
    location: state.location
  }
}
     //let center = new google.maps.LatLng(nextProps.location.locationLocation.lat, nextProps.location.locationLocation.lng);

      if(this.props.zoomChosen === 1){
        this.setState({
          zoom: 20
        })
      }
      if (nextProps.location.locationLocation) {
        this.setState({
          targetLat: nextProps.location.locationLocation.lat,
          targetLng: nextProps.location.locationLocation.lng,
          center : new google.maps.LatLng(nextProps.location.locationLocation.lat, nextProps.location.locationLocation.lng)
        })
      }
      if (nextProps.location.eventLocation) {
        this.setState({
          targetLat: nextProps.location.eventLocation.lat,
          targetLng: nextProps.location.eventLocation.lng,
          center : new google.maps.LatLng(nextProps.location.eventLocation.lat, nextProps.location.eventLocation.lng)
        })
      }

  withHandlers(() => {
    const refs = {
      map: undefined,
    }

    return {

     onMarkersUpdate: ()=> () => {
     if(refs.map){
      const mapBounds = new google.maps.LatLngBounds();
      //just add markers position into mapBounds
       markers.forEach((marker)=>{
        mapBounds.extend(marker.position)
      });

       this.refs.map.fitBounds(mapBbounds);
       }
     },
      onZoomChanged: ({ onZoomChange, onMapBoundsChange }) => () => {
        onZoomChange(refs.map.getZoom())
        onMapBoundsChange(refs.map.getBounds());

      },
      onDragEnd: ({ onMapBoundsChange }) => () => {
        onMapBoundsChange(refs.map.getBounds());
      },
      onMarkerClustererClick: () => (markerClusterer) => {
        const clickedMarkers = markerClusterer.getMarkers()
        console.log(`Current clicked markers length: ${clickedMarkers.length}`)
        console.log(clickedMarkers)
      }
    }
  })
  */
//this.panTo(center);
/* 
      const DirectionsService = new google.maps.DirectionsService();
      if (nextProps.directions.destination) {
        DirectionsService.route({
          origin: new google.maps.LatLng(nextProps.directions.pickup.lat, nextProps.directions.pickup.lng),
          destination: new google.maps.LatLng(nextProps.directions.destination.lat, nextProps.directions.destination.lng),
          travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result,
            });
          } else {
            console.error(`error fetching directions ${result}`);
          }
        })
      } else {
        this.setState({
          targetLat: nextProps.directions.pickup.lat,
          targetLng: nextProps.directions.pickup.lng
        })
      }*/
