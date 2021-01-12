import React from "react";

class SearchBar extends React.Component {

  render() {
    return (
      <div  className="plan-form">
        <form onSubmit={event => this.props.onSubmit(event)}>
        <input
          type="text"
          value={this.props.event}
          onChange={event => this.props.onSubmit(event)}
          className="titleofplan"
          name="title"
          id="title"
          placeholder="Title"
          autoFocus={true}
          autoComplete="off"
          onfocus={window.scrollTo(0, 0)}
          onClick={this.focus}
          ref={this.textInput}
          required
          autoCorrect="off"
        />
      </form>
</div>
);
}
}

export default SearchBar;