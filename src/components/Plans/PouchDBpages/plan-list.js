import React from "react";
import { Link, Redirect } from "react-router-dom";
import dayjs from "dayjs";
import imagesl from "../.././Explore/rsz_r5pnzqqw.jpg";

export const WEEK_DAYS = {
  0: "SUNDAY",
  1: "MONDAY",
  2: "TUESDAY",
  3: "WEDNESDAY",
  4: "THURSDAY",
  5: "FRIDAY",
  6: "SATURDAY"
};
/*var datenotime = new Date();
    datenotime.setHours(date.getHours(), date.getMinutes(), 0, 0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    var diffDays = Math.round(
      (datenotime.getTime() - date.getTime()) / 86400000
    );
    var is_negative = diffDays < 0;*/

/*const filteredPlans = notes.filter(notes => {
      return (
        notes.indexOf(this.props.search) !== -1
      );
    }); */
class PlanList extends React.Component {
  render() {
    return (
      <div>
        <div
          className="showplanner"
          onClick={() => this.props.history.push("/")}
        />
        <div className="planlistredux">
          {this.props.notes
            .sort((a, b) => {
              return a.date > b.date ? 1 : -1;
            })
            .map(note => {
              console.log(note.date);
              var eventDate1 = new Date(note.date);
              console.log(eventDate1);
              function renderTime(date) {
                let d = dayjs(date);
                return d.format("h:mm a");
              }
              function renderDate(date) {
                let d = dayjs(date);
                return d.format("MMMM D YYYY");
              }
              var datenotime = new Date();
              datenotime.setHours(
                eventDate1.getHours(),
                eventDate1.getMinutes(),
                0,
                0
              );
              eventDate1.setSeconds(0);
              eventDate1.setMilliseconds(0);
              var diffDays = Math.round(
                (datenotime.getTime() - eventDate1.getTime()) / 86400000
              );
              var is_negative = diffDays < 0;
              return (
                <div className="relativeplans">
                  <Link className="eachplan" to={`/plans/${note._id}`}>
                    <div>
                      <div className="boundtimes">
                        {diffDays === 0
                          ? `${WEEK_DAYS[eventDate1.getDay()]} ${renderDate(
                              eventDate1
                            )}`
                          : diffDays === -1
                          ? `${WEEK_DAYS[eventDate1.getDay()]} ${renderDate(
                              eventDate1
                            )}`
                          : diffDays === 1
                          ? `${WEEK_DAYS[eventDate1.getDay()]} ${renderDate(
                              eventDate1
                            )}`
                          : is_negative
                          ? `${WEEK_DAYS[eventDate1.getDay()]} ${renderDate(
                              eventDate1
                            )}`
                          : `${WEEK_DAYS[eventDate1.getDay()]} ${renderDate(
                              eventDate1
                            )}`}
                        <br />
                        {diffDays === 0
                          ? renderTime(note.date)
                          : renderTime(note.date)}
                        {diffDays === 0
                          ? ` today`
                          : diffDays === -1
                          ? ` tomorrow`
                          : diffDays === 1
                          ? ` yesterday`
                          : is_negative
                          ? ` in ${Math.abs(diffDays)} days`
                          : ` ${diffDays} days ago`}
                      </div>
                      <img
                        //onLoad={this.onImgLoad}
                        /*
                  event.d
                    ? event.d.chosenPhoto
                    : */
                        src={imagesl}
                        alt="error"
                        className="imageplan"
                      />
                    </div>
                    <div className="plantitle">
                      {note.title}
                      {/*<span className="notes-list-date">
                  {renderDate(note.date)}&nbsp;{renderTime(note.date)}
                </span>

                <div className="notes-list-title">
                  <h2>{note.title}</h2>
              </div>*/}
                    </div>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default PlanList;
