import React from "react";
import { compose, withProps, lifecycle, withHandlers } from "recompose";
import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";
import { connect } from 'react-redux'

import { changeLocation } from '../../store/actions/actions'

import './SearchBox.css'


const SearchBoxCreate = compose(
  withProps({
    containerElement: <div style={{ height: `400px` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        places: [],
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          let location = {
            lat: places[0].geometry.location.lat(),
            lng: places[0].geometry.location.lng()
          }
          this.props.locationLocation && this.props.fetchLocation(location, "LOCATION")

          this.setState({
            places,
          });
        },
      })
    },
  }),
)(props => (
  <div data-standalone-searchbox="">
    <StandaloneSearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        className="forplaceholdersearch"
        placeholder={props.placeHolder}
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
          textOverflow: `ellipses`,
        }}
      />
    </StandaloneSearchBox>
    {/*<div className="closesearchmap" >&times;</div>*/}
  </div>
))
const mapDispatchToProps = (dispatch) => {
  return {
    fetchLocation: (location) => {dispatch(changeLocation(location)) 
    }
  }
}

export default connect(null, mapDispatchToProps)(SearchBoxCreate);