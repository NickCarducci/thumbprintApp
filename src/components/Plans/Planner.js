import React from "react";
import PlannerHeader from "./PlannerHeader";
import DayCalSlider from ".././Calendar/DayCalSlider";
import MonthCalSlider from ".././Calendar/FullCalDrawer/MonthCalSlider";
import PlanList from "./PouchDBpages/plan-list";

import "./planredux.css";

import ".././Calendar/DayCalBackdrop.css";

class Planner extends React.Component {
  constructor(props) {
    super(props);
    let notes = Object.values(props.notes);
    notes.sort((a, b) => new Date(b.date) - new Date(a.date));
    this.state = {
      notes,
      dayCalOpen: false,
      monthCalOpen: false,
      search: ""
    };
  }

  dayCalCloseMonthCalOpener = () => {
    this.setState({
      monthCalOpen: true
    });
    this.setState({
      dayCalOpen: false
    });
  };
  monthCalOpener = () => {
    this.setState({
      monthCalOpen: false
    });
    this.setState({
      dayCalOpen: true
    });
  };
  monthCalCloser = () => {
    this.setState({
      monthCalOpen: false
    });
    this.setState({
      monthCalOpen: false
    });
  };
  dayCalOpener = () => {
    this.setState({
      dayCalOpen: true
    });
  };
  dayCalCloser = () => {
    this.setState({
      dayCalOpen: false
    });
    this.setState({
      monthCalOpen: false
    });
  };
  updateSearch = event => {
    this.setState({ search: event.target.value.substr(0, 20) });
  };
  /*chooseDay = date => {
    const _date = new Date(date.join("-"));
    this.setState({ date: _date });
  };*/
  render() {
    let { notes } = this.state;
    //console.log(notes);
    return (
      <div>
        {this.state.monthCalOpen === false ? (
          <DayCalSlider
            dayCalOpen={this.state.dayCalOpen}
            dayCalCloseMonthCalOpener={this.dayCalCloseMonthCalOpener}
            dayCalCloser={this.dayCalCloser}
            notes={notes}
            history={this.props.history}
            //date={this.state.date}
            //monthCalCloser={this.monthCalCloser}
          />
        ) : null}
        <MonthCalSlider
          monthCalOpen={this.state.monthCalOpen}
          monthCalOpener={this.monthCalOpener}
          monthCalCloser={this.monthCalCloser}
          notes={notes}
          history={this.props.history}
          chooseDay={this.chooseDay}
        />
        <PlannerHeader
          dayCalOpener={this.dayCalOpener}
          search={this.state.search}
          updateSearch={this.updateSearch}
        />
        <PlanList
          notes={notes}
          search={this.state.search}
          history={this.props.history}
        />
      </div>
    );
  }
}

export default Planner;
