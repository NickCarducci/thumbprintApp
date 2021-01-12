import React from "react";

class ImageClickables extends React.Component {

  render() {
    return (
      <div className="imagesuggestionsdiv">
        <img
          className="imagesuggestionsimg"
          src={this.props.image.urls.regular}
          alt="error"
          
        />
      </div>
    );
  }
}

export default ImageClickables