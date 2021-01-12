import React from "react";
import { Link } from "react-router-dom";
//import timer from "../.././Icons/Images/timer.png";
import DateFnsUtils from "@date-io/date-fns";
import {
  DatePicker,
  TimePicker,
  //DateTimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";

import "./planopen.css";

class EditNotePage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      note: {
        title: "",
        body: "",
        createdAt: null,
        updatedAt: null,
        date: ""
      },
      saving: false,
      drawerOpen3: false
    };
    this.handleDate = this.handleDate.bind(this);
  }
  handleDate = event => {
    const currentNote = { ...this.state };
    currentNote.note.date = event;

    this.setState(currentNote);
  };
  async componentDidMount() {
    this.setState({ note: { ...this.props.note } });
  }

  async handleSave() {
    this.setState({ saving: true });

    const res = await this.props.onSave({ ...this.state.note });
    this.props.history.replace(`/plans/${res.id}`);
  }

  updateValue(e) {
    let { note } = this.state;

    this.setState({ note: { ...note, [e.target.name]: e.target.value } });
  }
  drawerToggleClickHandler = () => {
    this.setState({
      drawerOpen: !this.state.drawerOpen
    });
  };
  backdropClickHandler = () => {
    this.setState({
      drawerOpen: false
    });
  };

  render() {
    const { note } = this.state;
    /*let backdrop;
    if (this.state.drawerOpen) {
      backdrop = <PlanEditBackdrop close={this.backdropClickHandler} />;
    }*/

    return (
      <div className="planeditpage">
        {/*<div>
          <Link to="/planner">
            <img src={back777} className="backopen" alt="error" />
        </Link>
        </div>*/}
        <form
          onSubmit={e => {
            e.preventDefault();
            this.handleSave();
          }}
        >
          <input
            className="Plan_Header"
            type="text"
            name="title"
            value={note.title}
            onChange={e => this.updateValue(e)}
            autoComplete="off"
            required
          />

          <textarea
            className="PlanEdit_Description"
            type="text"
            name="body"
            placeholder="Write details here"
            value={note.body}
            onChange={e => this.updateValue(e)}
            autoComplete="off"
          />
          <input className="save" type="submit" value="Save" />
        </form>
        <Link to={`/plans/${note._id}`}>
          <div className="cancel">Cancel</div>
        </Link>
        
        <div className="dateordelete">
        <div className="datechosen">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              label="Due Date"
              value={note.date}
              onChange={
                this.handleDate(note.date)
              }
              animateYearScrolling
              showTodayButton={true}
            />
            <TimePicker
              label="Time"
              value={note.date}
              onChange={(event) => {
                this.handleDate(event);
              }}
              animateYearScrolling
            />
          </MuiPickersUtilsProvider>
        </div><Link className="note-delete" to="/plan">
          <div className="btn" onClick={e => this.props.onDelete(note._id)}>
            Delete
          </div>
        </Link></div>
        {/*<PlanEditDrawer
          show={this.state.drawerOpen}
          date={this.state.note.date}
          handleDate={this.handleDate}
        />
        {backdrop}*/}
      </div>
    );
  }
}

export default EditNotePage;
