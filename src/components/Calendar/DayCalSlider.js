import React from "react";
import "./DayCalBackdrop.css";
import calendar from ".././Icons/Images/calendar.png";
import clockbordersun from ".././Icons/Images/clockbordersun.png";
//import clockbordermoon from ".././Icons/Images/clockbordermoon.png";
import clockdial from ".././Icons/Images/clockdial.png";
import arrowleft from ".././Icons/Images/arrowleft.png";
import arrowright from ".././Icons/Images/arrowright.png";
import refresh from ".././Icons/Images/refresh.png";
import * as shape from "d3-shape";
import ART from "react-art";
import "art/modes/svg";

const d3 = {
  shape
};

const { Surface, Group, Shape } = ART;

export const WEEK_DAYS = {
  0: "SUN",
  1: "MON",
  2: "TUE",
  3: "WED",
  4: "THU",
  5: "FRI",
  6: "SAT"
};

export const CALENDAR_MONTHS = {
  Jan: "Jan",
  Feb: "Feb",
  Mar: "Mar",
  Apr: "Apr",
  May: "May",
  Jun: "Jun",
  Jul: "Jul",
  Aug: "Aug",
  Sep: "Sep",
  Oct: "Oct",
  Nov: "Nov",
  Dec: "Dec"
};
/*export const getMonthFirstDay = (month, year) => {
	return +(new Date(`${year}-${zeroPad(month, 2)}-01`).getDay()) + 1;
}*/
export const isDate = date => {
  const isDate = Object.prototype.toString.call(date) === "[object Date]";
  const isValidDate = date && !Number.isNaN(date.valueOf());
  return isDate && isValidDate;
};
export const isSameDay = (date, basedate = new Date()) => {
  if (!(isDate(date) && isDate(basedate))) return false;

  const basedateDate = basedate.getDate();
  const basedateMonth = +basedate.getMonth() + 1;
  const basedateYear = basedate.getFullYear();

  const dateDate = date.getDate();
  const dateMonth = +date.getMonth() + 1;
  const dateYear = date.getFullYear();

  return (
    +basedateDate === +dateDate &&
    +basedateMonth === +dateMonth &&
    +basedateYear === +dateYear
  );
};
export const getMonthDays = (month, year) => {
  const months30 = [4, 6, 9, 11];
  const leapYear = year % 4 === 0;
  return month === 2
    ? leapYear
      ? 29
      : 28
    : months30.includes(month)
    ? 30
    : 31;
};

export const goPreviousDay = (day, month, year) => {
  let newnewMonth = month > 1 ? month - 1 : 12;
  let newnewYear = month > 1 ? year : year - 1;
  const prevMonthDays = getMonthDays(newnewMonth, newnewYear);
  let newDay, newMonth, newYear;

  if (day <= 1) {
    newDay = prevMonthDays;
    newMonth = month > 1 ? month - 1 : 12;
    newYear = month > 1 ? year : year - 1;
  } else {
    newDay = day - 1;
    newMonth = month;
    newYear = year;
  }
  return { day: newDay, month: newMonth, year: newYear };
};

/*export const gotoNextMonth = (month, year) => {
  const nextMonth = month < 12 ? month + 1 : 1;
  const nextMonthYear = month < 12 ? year : year + 1;
  return { month: nextMonth, year: nextMonthYear };
};*/
export const goNextDay = (day, month, year) => {
  const thisMonthDays = getMonthDays(month, year);
  let newDay, newMonth, newYear;

  if (day >= thisMonthDays) {
    newDay = 1;
    newMonth = month < 12 ? month + 1 : 1;
    newYear = month < 12 ? year : year + 1;
  } else {
    newDay = day + 1;
    newMonth = month;
    newYear = year;
  }
  return { day: newDay, month: newMonth, year: newYear };
};
class CalSlideDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      dateTimeZeroed: new Date(),
      day: new Date().getDate(),
      month: +new Date().getMonth() + 1,
      year: +new Date().getFullYear(),
      note: props.note
    };
  }
  backtotoday = evt => {
    evt && evt.preventDefault();

    this.setState({ day: new Date().getDate() });
    this.setState({ month: new Date().getMonth() + 1 });
    this.setState({ year: new Date().getFullYear() });
  };
  componentDidMount() {
    this.interval = setInterval(
      this.setState({
        datecelestial: new Date()
      }),
      1000
    );
    this.handleLast = evt => {
      evt && evt.preventDefault();
      const { day, month, year } = this.state;
      this.setState(goPreviousDay(day, month, year));

      console.log(this.state.day, this.state.month, this.state.year);
    };
    this.handleNext = evt => {
      evt && evt.preventDefault();
      const { day, month, year } = this.state;
      this.setState(goNextDay(day, month, year));

      console.log(this.state.day, this.state.month, this.state.year);
    };
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  Arc = ({
    size = Math.min(window.innerHeight * 0.6, window.innerWidth * 0.6),
    outerRadius = Math.min(window.innerHeight * 0.15, window.innerWidth * 0.15),
    innerRadius = Math.min(window.innerHeight * 0.14, window.innerWidth * 0.14),
    startAngleRad = 0,
    endAngleRad = ((this.state.datecelestial.getHours() / 24) * 360 * Math.PI) /
      180 +
      ((this.state.datecelestial.getMinutes() / 60) * (360 / 24) * Math.PI) /
        180
  }) => {
    const width = size;
    const height = size;
    console.log(startAngleRad);
    console.log(endAngleRad);
    const arcGenerator = d3.shape
      .arc()
      .outerRadius(outerRadius)
      .innerRadius(innerRadius)
      .startAngle(startAngleRad)
      .endAngle(endAngleRad);

    const x = width / 2;
    const y = height / 2;

    return (
      <Surface width={width} height={height}>
        <Group x={x} y={y}>
          <Shape
            key="arc"
            d={arcGenerator()}
            stroke={"rgb(28,124,132)"}
            fill={"rgb(28,124,132, .4)"}
          />
        </Group>
      </Surface>
    );
  };
  PlanArc = ({
    size = Math.min(window.innerHeight * 0.7, window.innerWidth * 0.7),
    outerRadius = Math.min(window.innerHeight * 0.15, window.innerWidth * 0.15),
    innerRadius = Math.min(window.innerHeight * 0.14, window.innerWidth * 0.14)
  }) => {
    const width = size;
    const height = size;
    const x = width / 2;
    const y = height / 2;

    return (
      <Surface width={width} height={height}>
        <Group x={x} y={y}>
          {this.props.notes
            .sort((a, b) => {
              return a.date > b.date ? 1 : -1;
            })
            .map((plan, index) => {
              const todayalright = new Date(plan.date);
              //console.log(todayalright.getHours());
              //console.log(todayalright.getMinutes());
              const startAngleRad1 =
                ((todayalright.getHours() / 24) * 360 * Math.PI) / 180 +
                ((todayalright.getMinutes() / 60) * (360 / 24) * Math.PI) / 180;
              const endAngleRad1 = startAngleRad1 + 0.3;
              //console.log(startAngleRad1.toFixed(5));
              //console.log(endAngleRad1.toFixed(5));
              const arcGenerato = d3.shape
                .arc()
                .outerRadius(outerRadius + 60)
                .innerRadius(innerRadius + 50)
                .startAngle(Number(startAngleRad1.toFixed(5)))
                .endAngle(Number(endAngleRad1.toFixed(5)));
              //console.log(plan.date.split("T")[0]);
              const browsing = new Date(
                this.state.year,
                this.state.month - 1,
                this.state.day
              );
              const browsingzero = browsing.setHours(0, 0, 0, 0);
              const plandate = new Date(plan.date);
              const plandatezero = plandate.setHours(0, 0, 0, 0);
              if (plandatezero === browsingzero) {
                return (
                  <Shape
                    //key="arc"
                    key={index}
                    d={arcGenerato()}
                    stroke={"rgb(49,171,212)"}
                    strokeWidth="3"
                    fill={"rgb(49,171,212, .6)"}
                    onClick={() =>
                      this.props.history.push(`/plans/${plan._id}`)
                    }
                  />
                );
              }
            })}
        </Group>
      </Surface>
    );
  };
  componentDidUpdate = () => {
    if (this.props.date !== this.state.proppedDate) {
      this.setState({ proppedDate: this.props.date });
    }
  };
  render() {
    const { month, day, datecelestial, year, proppedDate } = this.state;
    const _datecelestial = new Date(datecelestial);
    const hour = _datecelestial.getHours();
    const minute = _datecelestial.getMinutes();
    const second = _datecelestial.getSeconds();
    const monthfromzero = month - 1;
    const totalseconds = hour * 3600 + minute * 60 + second;
    const totalsecondsoutofday = totalseconds / 86400;
    const totaldegrees = totalsecondsoutofday * 360;
    /*const weekday = this.state.date
      .toLocaleString("default", { weekday: "short" })
      .toUpperCase();
    //const day = this.state.date.getDate();/*this.state.date
    /*const month = this.state.date
      .toLocaleString("default", { month: "short" })
      .toUpperCase();*/
    const monthname = Object.keys(CALENDAR_MONTHS)[
      Math.max(0, Math.min(month - 1, 11))
    ].toUpperCase();
    var selectedDate = proppedDate
      ? new Date(proppedDate)
      : new Date(this.state.year, monthfromzero, this.state.day);
    console.log(proppedDate);
    this.state.dateTimeZeroed.setHours(0, 0, 0, 0);
    var diffDays = Math.round(
      (this.state.dateTimeZeroed.getTime() - selectedDate.getTime()) / 86400000
    );
    var is_negative = diffDays < 0;
    //console.log(this.props.notes);
    return (
      <div>
        {this.props.dayCalOpen ? (
          <div className="cal_backdrop" onClick={this.props.dayCalCloser} />
        ) : null}
        <div
          className={
            this.props.dayCalOpen ? "cal_slide-drawer open" : "cal_slide-drawer"
          }
        >
          <div>
            <img
              src={calendar}
              className="calendaricon"
              onClick={this.props.dayCalCloseMonthCalOpener}
              alt="error"
            />
            <div className="monthyear">
              <div className="month">
                <div>&nbsp;&nbsp;&nbsp;{`${monthname}`}</div>
                <div className="year">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`${year}`}
                </div>
              </div>
              <div className="weekdayday">
                <div className="weekday">
                  {WEEK_DAYS[selectedDate.getDay()]}
                </div>
                <div className="day">{`${day}`}</div>
              </div>
              <div>
                <div className="daysuntil">
                  &nbsp;&nbsp;
                  {diffDays === 0
                    ? "Today"
                    : diffDays === -1
                    ? "Tomorrow"
                    : diffDays === 1
                    ? "Yesterday"
                    : is_negative
                    ? `In ${Math.abs(diffDays)} days`
                    : `${diffDays} days ago`}
                </div>
                <div className="plancount">&nbsp;&nbsp;&nbsp;PLANS</div>
              </div>
            </div>
            <img
              src={refresh}
              className="gototoday"
              onClick={this.backtotoday}
              alt="error"
            />
          </div>

          {diffDays === 0 ? (
            <div className="containclock">
              <div className="placeArcOnClock">
                {this.state.datecelestial && <this.Arc />}
              </div>
            </div>
          ) : null}

          <div className="containplans">
            <div className="placePlansOnClock">
              <this.PlanArc selectedDate={selectedDate} />
            </div>
          </div>

          <img src={clockdial} className="clockdial" alt="error" />
          {this.state.dateTimeZeroed.getTime() === selectedDate.getTime() ? (
            hour === 20 ||
            hour === 21 ||
            hour === 22 ||
            hour === 23 ||
            hour === 0 ||
            hour === 1 ||
            hour === 2 ||
            hour === 3 ||
            hour === 4 ? (
              <img
                src="https://www.dl.dropboxusercontent.com/s/tqw39uh4mcywirx/clockbordermoonmenu%20%288%29.png?dl=0"
                className="clockborder"
                style={{
                  transform: `translate(-50%, -50%)rotate(${totaldegrees}deg)`
                }}
                alt="error"
              />
            ) : (
              <img
                src={clockbordersun}
                className="clockborder"
                style={{
                  transform: `translate(-50%, -50%)rotate(${totaldegrees}deg)`
                }}
                alt="error"
              />
            )
          ) : null}
          <img
            src={arrowleft}
            className="arrowleft"
            onClick={this.handleLast}
            alt="error"
          />
          <img
            src={arrowright}
            className="arrowright"
            onClick={this.handleNext}
            alt="error"
          />
          <div className="weeklyskip">
            <div className="weeklyl" onClick={this.handleLast}>
              Prev
              <br />
              Day
            </div>
            <div className="close" onClick={this.props.dayCalCloser}>
              Close
            </div>
            <div className="weeklyr" onClick={this.handleNext}>
              Next
              <br />
              Day
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default CalSlideDrawer;
