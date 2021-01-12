  
import React from 'react'

class SearchLocationEvent extends React.Component {
  stopSubmit(e) {
    e.preventDefault();
    return false;
  }
  render() {
    return(
      <form onSubmit={this.stopSubmit}>
      <input
        className="searchlocationevent"
        onChange={this.props.updateSearch}
      />
    </form>
    )
  }
}
export default SearchLocationEvent