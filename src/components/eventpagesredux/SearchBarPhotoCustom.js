import React from "react";

class SearchBarPhotoCustom extends React.Component {
  stallSubmit() {
    return false;
  }
  render() {
    return (
      <div className="plan-form-custom">
        <form onSubmit={event => this.props.onSubmitCustomTriggered(event)}>
          <input
            type="text"
            value={this.props.event}
            onChange={event => this.props.onSubmitCustomTriggered(event)}
            className="titleofplan-custom"
            name="unsplash"
            placeholder="Unsplash keywords"
            autoFocus={true}
            autoComplete="off"
            //onfocus={window.scrollTo(0, 0)}
            onClick={this.focus}
            ref={this.textInput}
            autoCorrect="off"
          />
        </form>
      </div>
    );
  }
}

export default SearchBarPhotoCustom;
