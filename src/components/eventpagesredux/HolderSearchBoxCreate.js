import React from "react";
import SearchBoxCreate from "./SearchBoxCreate";

class HolderSearchBoxCreate extends React.Component {
  render() {
    return (
      <SearchBoxCreate
        placeHolder="Change Location"
        input={<input />}
        search={this.props.search}
        onClose={() => {}}
        locationLocation
      />
    );
  }
}

export default HolderSearchBoxCreate;
