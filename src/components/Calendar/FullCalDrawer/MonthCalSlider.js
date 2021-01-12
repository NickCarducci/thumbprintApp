import React from "react";
import "./CalendarStyle.css";
import PropTypes from "prop-types";
import back777 from "../.././Icons/Images/back777.png";
import clockbordersun from "../.././Icons/Images/clockbordersun.png";
//import clockbordermoon from "../.././Icons/Images/clockbordermoon.png";
import clockborderempty from "../.././Icons/Images/clockborderempty.png";
import refresh from "../.././Icons/Images/refresh.png";
import * as shape from "d3-shape";
import ART from "react-art";
import "art/modes/svg";

const d3 = {
  shape
};

const { Surface, Group, Shape } = ART;

export const THIS_YEAR = +new Date().getFullYear();
export const THIS_MONTH = +new Date().getMonth() + 1;

export const WEEK_DAYS = {
  Sunday: "Sun",
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat"
};

export const CALENDAR_MONTHS = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sep",
  October: "Oct",
  November: "Nov",
  December: "Dec"
};

export const CALENDAR_WEEKS = 6;

export const zeroPad = (value, length) => `${value}`.padStart(length, "0");

export const isDate = date => {
  const isDate = Object.prototype.toString.call(date) === "[object Date]";
  const isValidDate = date && !Number.isNaN(date.valueOf());
  return isDate && isValidDate;
};

export const getDateISO = (date = new Date()) => {
  if (!isDate(date)) return null;

  return [
    date.getFullYear(),
    zeroPad(+date.getMonth() + 1, 2),
    zeroPad(+date.getDate(), 2)
  ].join("-");
};

export const getMonthDays = (month = THIS_MONTH, year = THIS_YEAR) => {
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

export const getMonthFirstDay = (month = THIS_MONTH, year = THIS_YEAR) => {
  return +new Date(`${year}-${zeroPad(month, 2)}-01`).getDay() + 1;
};

export const isSameMonth = (date, basedate = new Date()) => {
  if (!(isDate(date) && isDate(basedate))) return false;

  const basedateMonth = +basedate.getMonth() + 1;
  const basedateYear = basedate.getFullYear();

  const dateMonth = +date.getMonth() + 1;
  const dateYear = date.getFullYear();

  return +basedateMonth === +dateMonth && +basedateYear === +dateYear;
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

export const getPreviousMonth = (month, year) => {
  const prevMonth = month > 1 ? month - 1 : 12;
  const prevMonthYear = month > 1 ? year : year - 1;

  return { month: prevMonth, year: prevMonthYear };
};

export const getNextMonth = (month, year) => {
  const nextMonth = month < 12 ? month + 1 : 1;
  const nextMonthYear = month < 12 ? year : year + 1;

  return { month: nextMonth, year: nextMonthYear };
};

export const calendar = (month = THIS_MONTH, year = THIS_YEAR) => {
  const monthDays = getMonthDays(month, year);
  const monthFirstDay = getMonthFirstDay(month, year);

  const daysFromPrevMonth = monthFirstDay - 1;
  const daysFromNextMonth =
    CALENDAR_WEEKS * 7 - (daysFromPrevMonth + monthDays);

  const { month: prevMonth, year: prevMonthYear } = getPreviousMonth(
    month,
    year
  );
  const { month: nextMonth, year: nextMonthYear } = getNextMonth(month, year);

  const prevMonthDays = getMonthDays(prevMonth, prevMonthYear);

  const prevMonthDates = [...new Array(daysFromPrevMonth)].map((n, index) => {
    const day = index + 1 + (prevMonthDays - daysFromPrevMonth);
    return [prevMonthYear, zeroPad(prevMonth, 2), zeroPad(day, 2)];
  });

  const thisMonthDates = [...new Array(monthDays)].map((n, index) => {
    const day = index + 1;
    return [year, zeroPad(month, 2), zeroPad(day, 2)];
  });

  const nextMonthDates = [...new Array(daysFromNextMonth)].map((n, index) => {
    const day = index + 1;
    return [nextMonthYear, zeroPad(nextMonth, 2), zeroPad(day, 2)];
  });

  return [...prevMonthDates, ...thisMonthDates, ...nextMonthDates];
};

class FullCalSlideDrawer extends React.Component {
  state = {
    datecelestial: null, //new Date(),
    //calendarOpen: false,
    ...this.resolveStateFromProp(),
    today: new Date()
    //isMonthRunning: false
  };

  handleChange = evt => evt.preventDefault();

  handleDateChange = date => {
    const { onDateChanged } = this.props;
    const { date: currentDate } = this.state;
    const newDate = date ? getDateISO(date) : null;

    currentDate !== newDate &&
      this.setState({ date: newDate }, () => {
        typeof onDateChanged === "function" && onDateChanged(this.state.date);
      });
  };
  resolveStateFromDate(date) {
    const isDateObject = isDate(date);
    const _date = isDateObject ? date : new Date();

    return {
      current: isDateObject ? date : null,
      month: +_date.getMonth() + 1,
      year: _date.getFullYear()
    };
  }

  resolveStateFromProp() {
    return this.resolveStateFromDate(this.props.date);
  }

  getCalendarDates = () => {
    const { current, month, year } = this.state;
    const calendarMonth = month || +current.getMonth() + 1;
    const calendarYear = year || current.getFullYear();

    return calendar(calendarMonth, calendarYear);
  };

  gotoDate = date => evt => {
    evt && evt.preventDefault();
    const { current } = this.state;
    const { onDateChanged } = this.props;

    !(current && isSameDay(date, current)) &&
      this.setState(this.resolveStateFromDate(date), () => {
        typeof onDateChanged === "function" && onDateChanged(date);
      });
  };
  // last month - Called in shift = false ? ternary
  gotoPreviousMonth = () => {
    const { month, year } = this.state;
    this.setState(getPreviousMonth(month, year));
  };
  // next month - Called in shift = false ? ternary
  gotoNextMonth = () => {
    const { month, year } = this.state;
    this.setState(getNextMonth(month, year));
  };
  // last month - Called in shift = true ? ternary
  gotoPreviousYear = () => {
    const { year } = this.state;
    this.setState({ year: year - 1 });
  };
  // next year - Called in shift = true ? ternary
  gotoNextYear = () => {
    const { year } = this.state;
    this.setState({ year: year + 1 });
  };
  // handle pressure - from onMouseUp={this.clearPressureTimer}
  handlePressure = fn => {
    if (typeof fn === "function") {
      fn();
      /*
      this.pressureTimeout = setTimeout(() => {
        this.pressureTimer = setInterval(fn, 100);
      }, 1);*/
    }
  };
  // Called in ComponentWillUnmount()
  /*clearPressureTimer = () => {
    this.pressureTimer && clearInterval(this.pressureTimer);
    this.pressureTimeout && clearTimeout(this.pressureTimeout);
  };*/
  // Called in ComponentWillUnmount()
  clearDayTimeout = () => {
    this.dayTimeout && clearTimeout(this.dayTimeout);
  };
  //last month - from onClick={this.handlePrevious}
  handlePrevious = evt => {
    evt && evt.preventDefault();
    const fn = evt.shiftKey ? this.gotoPreviousYear : this.gotoPreviousMonth;
    this.handlePressure(fn);
  };
  //next month - from onClick={this.handleNext}
  handleNext = evt => {
    evt && evt.preventDefault();
    const fn = evt.shiftKey ? this.gotoNextYear : this.gotoNextMonth;
    this.handlePressure(fn);
  };
  //Month & Year Header return
  renderMonthAndYear = () => {
    const { month, year } = this.state;
    const monthname = Object.keys(CALENDAR_MONTHS)[
      Math.max(0, Math.min(month - 1, 11))
    ];

    return (
      <div className="CalendarHeader">
        <div className="CalendarMonth">
          {monthname} {year}
        </div>
      </div>
    );
  };
  //weekdays to be mapped in return
  renderDayLabel = (day, index) => {
    const daylabel = WEEK_DAYS[day].toUpperCase();
    return (
      <div className="CalendarWeekday" key={daylabel} index={index}>
        {daylabel}
      </div>
    );
  };
  componentDidMount() {
    const now = new Date();
    const tomorrow = new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000;
    const ms = tomorrow - now;

    this.dayTimeout = setTimeout(() => {
      this.setState({ today: new Date() }, this.clearDayTimeout);
    }, ms);
    this.interval = setInterval(
      () =>
        this.setState({
          datecelestial: new Date()
        }),
      1000
    );
  }

  componentDidUpdate(prevProps) {
    const { date, onDateChanged } = this.props;
    const { date: prevDate } = prevProps;
    const dateMatch = date === prevDate || isSameDay(date, prevDate);
    !dateMatch &&
      this.setState(this.resolveStateFromDate(date), () => {
        typeof onDateChanged === "function" && onDateChanged(date);
      });
  }

  componentWillUnmount() {
    //this.clearPressureTimer();
    this.clearDayTimeout();
    clearInterval(this.interval);
  } /*
  PlanArc = ({
    size = Math.min(window.innerHeight * 0.7, window.innerWidth * 0.7),
    outerRadius = Math.min(window.innerHeight * 0.15, window.innerWidth * 0.15),
    innerRadius = Math.min(window.innerHeight * 0.14, window.innerWidth * 0.14),
    date
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
              const { today } = this.state;
              const _date = new Date(date.join("-"));
              const isToday = isSameDay(_date, today);
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
              if (isToday) {
                console.log("yup");
                return (
                  <Shape
                    //key="arc"
                    key={index}
                    d={arcGenerato()}
                    stroke={"rgb(49,171,212)"}
                    strokeWidth="3"
                    fill={"rgb(49,171,212, .6)"}
                    /*onClick={() =>
                      this.props.history.push(`/plans/${plan._id}`)
                    }
                  />
                );
              }
            })}
        </Group>
      </Surface>
    );
  };*/
  //daynumbers to be mapped in return
  renderCalendarDate = (date, index) => {
    const { current, month, year, today, datecelestial } = this.state;
    const _date = new Date(date.join("-"));
    const _datecelestial = new Date(datecelestial);
    const hour = _datecelestial.getHours();
    const minute = _datecelestial.getMinutes();
    const second = _datecelestial.getSeconds();
    const totalseconds = hour * 3600 + minute * 60 + second;
    const totalsecondsoutofday = totalseconds / 86400;
    const totaldegrees = totalsecondsoutofday * 360;

    const isToday = isSameDay(_date, today);
    const isCurrent = current && isSameDay(_date, current);
    const inMonth = isSameMonth(_date, new Date([year, month, 1].join("-")));

    const onClick = this.gotoDate(_date);
    /*
    isCurrent
      ? () => {
          console.log("clicked");
          this.gotoDate(_date);
          //this.props.monthCalCloser();
          //this.props.chooseDay(_date);
        }
      : () => {
          console.log("clickedfirst");
    this.gotoDate(_date);
          
          //this.chooseDay(_date);
        };*/

    const props = { index, onClick, title: _date.toDateString() };

    return (
      <div
        className={
          isCurrent
            ? "HighlightedCalendarDate"
            : isToday
            ? "TodayCalendarDate"
            : inMonth
            ? "CalendarDateNumber"
            : "PrevPostDateNumber"
        }
        key={getDateISO(_date)}
        {...props}
      >
        <img src={clockborderempty} className="clockdialcal" alt="error" />
        {isToday ? (
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
              className="clockbordercal"
              style={{
                transform: `rotate(${totaldegrees}deg)`
              }}
              alt="error"
            />
          ) : (
            <img
              src={clockbordersun}
              className="clockbordercal"
              style={{
                transform: `rotate(${totaldegrees}deg)`
              }}
              alt="error"
            />
          )
        ) : null}

        <div className="containplanscal">
          <div className="placePlansOnCal">
            {/*<this.PlanArc date={date} />*/}
          </div>
        </div>
        {_date.getDate()}
      </div>
    );
  };

  render(_date) {
    return (
      <div>
        {this.props.monthCalOpen ? (
          <div
            className="fullcal_backdrop"
            onClick={this.props.monthCalCloser}
          />
        ) : null}
        <div
          className={
            this.props.monthCalOpen
              ? "fullcal_slide-drawer open"
              : "fullcal_slide-drawer"
          }
        >
          <div>
            <div className="CalendarContainer">
              <img
                src={back777}
                className="back"
                onClick={this.props.monthCalOpener}
                alt="error"
              />
              <img
                src={refresh}
                className="gototoday"
                onClick={this.gotoDate(_date)}
                alt="error"
              />
              {this.renderMonthAndYear()}

              <div className="CalendarGrid">
                {Object.keys(WEEK_DAYS).map(this.renderDayLabel)}
                {
                  //weekdays
                }
                {this.getCalendarDates().map(this.renderCalendarDate)}
                {
                  //days
                }
              </div>
            </div>
          </div>
          <div className="monthlyskip">
            <div
              className="monthlyl"
              onClick={this.handlePrevious}
              //onMouseUp={this.clearPressureTimer}
            >
              Last
              <br />
              Month
            </div>
            <div className="closecal" onClick={this.props.monthCalCloser}>
              Close
            </div>
            <div
              className="monthlyr"
              onClick={this.handleNext}
              //onMouseUp={this.clearPressureTimer}
            >
              Next
              <br />
              Month
            </div>
          </div>
        </div>
      </div>
    );
  }
}

FullCalSlideDrawer.propTypes = {
  date: PropTypes.instanceOf(Date),
  onDateChanged: PropTypes.func
};

export default FullCalSlideDrawer;
