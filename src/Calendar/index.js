import React from "react";
import * as shape from "d3-shape";
import ART from "react-art";
import "art/modes/svg";
import DayCal from "./DayCal.js";
import firebase from ".././init-firebase.js";
import {
  getFirestore,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  getDocs,
  getDoc
} from "firebase/firestore";
import { standardCatch } from "../Sudo.js";
import PlanObject from "../Chats1/PlanObject.js";
const d3 = {
  shape
};

const { Surface, Group, Shape } = ART;

class TodaySun extends React.Component {
  constructor(props) {
    super(props);
    this.myInput = React.createRef();
  }
  render() {
    const { datecelestial } = this.props;
    const _datezero = this.props._date.setHours(0, 0, 0, 0);
    const hour = datecelestial.getHours();
    const minute = datecelestial.getMinutes();
    const second = datecelestial.getSeconds();
    const totalseconds = hour * 3600 + minute * 60 + second;
    const totalsecondsoutofday = totalseconds / 86400;
    const totaldegrees = totalsecondsoutofday * 360;
    /*const size = Math.min(
      window.innerHeight * 0.059,
      window.innerWidth * 0.059
    );*/
    //const width = size;
    //const height = size;
    //const x = width / 2;
    //const y = height / 2;
    const outerRadius = 20;
    /* this.props.smallplz && this.props.height < 100
        ? Math.min(window.innerHeight * 0.045, 20)
        : this.props.smallplz
        ? Math.min(window.innerHeight * 0.045, 20) * 0.5
        : Math.min(window.innerHeight * 0.045, 20);*/
    const innerRadius = 20;
    /* this.props.smallplz && this.props.height < 100
        ? Math.min(window.innerHeight * 0.045, 20)
        : this.props.smallplz
        ? Math.min(window.innerHeight * 0.04, 20) * 0.5
        : Math.min(window.innerHeight * 0.04, 20);*/
    const arcGenerato2 = d3.shape
      .arc()
      .outerRadius(outerRadius)
      .innerRadius(innerRadius)
      .startAngle(0)
      .endAngle(
        ((datecelestial.getHours() / 24) * 360 * Math.PI) / 180 +
          ((datecelestial.getMinutes() / 60) * (360 / 24) * Math.PI) / 180
      );
    return (
      <div ref={this.myInput} style={{ position: "absolute" }}>
        {this.props.isToday ? (
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
              src="https://www.dropbox.com/s/tqw39uh4mcywirx/clockbordermoonmenu%20%288%29.png?raw=1"
              style={{
                transform: `rotate(${totaldegrees}deg)`,
                width: "100%"
              }}
              alt="error"
            />
          ) : (
            <img
              src="https://www.dropbox.com/s/fegsthumkz6pufy/clockbordersun.png?raw=1"
              style={{
                transform: `rotate(${totaldegrees}deg)`,
                width: "100%"
              }}
              alt="error"
            />
          )
        ) : null}
        {/*this.myInput.current && (
          <Surface
            style={{
              justifyContent: "center",
              alignItems: "center",
              transform: "rotate(180deg)"
            }}
            width={this.myInput.current.offsetHeight}
            height={this.myInput.current.offsetHeight}
          >
            <Group //x={"100%"} y={"100%"}
              x={this.myInput.current.offsetHeight / 2}
              y={this.myInput.current.offsetHeight / 2}
            >
              {/*new Date(date).getTime() < new Date().getTime() && inMonth && (
                  <Shape
                    key={_date}
                    d={arcGenerato1()}
                    stroke={"rgb(0,0,0)"}
                    fill={"rgba(28,124,132,.4)"}
                  />
                )* /}
              <Shape
                style={{
                  display: "flex",
                  position: "absolute"
                }}
                key={_datezero}
                d={arcGenerato2()}
                stroke={"rgb(28,124,132)"}
                fill={"rgb(28,124,132, .4)"}
              />
            </Group>
          </Surface>
              )*/}
      </div>
    );
  }
}
class TodayPlans extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.myInput = React.createRef();
  }
  render() {
    var _datezero = this.props._date;
    _datezero.setHours(0, 0, 0, 0);
    /*
    const size = Math.min(
      this.state.height * 0.059,
      window.innerWidth * 0.059
    );*/
    const outerRadius = Math.min(this.props.height * 0.45, 20);
    const innerRadius = Math.min(this.props.height * 0.4, 20);
    //console.log(this.props.schedule);
    const params = this.props.pathname.split("/");
    const red = !["", "plan"].includes(params[1]);
    return (
      <Surface
        style={{
          top: "0px",
          position: "absolute",
          transform: "rotate(180deg)"
        }}
        width={this.props.height}
        height={this.props.height}
      >
        <Group //x={"100%"} y={"100%"}
          x={this.props.height / 2}
          y={this.props.height / 2}
        >
          {(this.props.pathname.includes("/sd/") || red
            ? this.props.schedule
            : this.props.thePlans
          ).map((plan, index) => {
            const date = plan.date.seconds
              ? plan.date.seconds * 1000
              : plan.date;
            var plandate = new Date(date);
            var plandate1 = new Date(date);
            plandate.setHours(0, 0, 0, 0);
            var startAngleRad1 =
              ((plandate1.getHours() / 24) * 360 * Math.PI) / 180 +
              ((plandate1.getMinutes() / 60) * (360 / 24) * Math.PI) / 180;
            const range = plan.rangeChosen ? plan.rangeChosen : 1;
            const timespan = ((range / 24) * 360 * Math.PI) / 180;
            const endAngleRad1 = startAngleRad1 + (range ? timespan : 0.25);
            const arcGenerato = d3.shape
              .arc()
              .outerRadius(outerRadius)
              .innerRadius(innerRadius)
              .startAngle(Number(startAngleRad1.toFixed(5)))
              .endAngle(Number(endAngleRad1.toFixed(5)));
            if (_datezero.getTime() === plandate.getTime()) {
              const colors = this.props.pathname.includes("/sd/") //this.props.userCalendar
                ? [212, 49, 212]
                : red
                ? [212, 100, 100]
                : [49, 212, 212];
              return (
                <Shape
                  style={{}}
                  key={index}
                  //ref={plan._id + "note"}
                  d={arcGenerato()}
                  stroke={`rgb(${colors})`}
                  strokeWidth="3"
                  fill={`rgba(${colors}, .6)`}
                />
              );
            } else return null;
          })}
          {/*this.props.assignments.map((plan, index) => {
                var plandate = new Date(plan.date);
                var plandate1 = new Date(plan.date);
                plandate.setHours(0, 0, 0, 0);
                var startAngleRad1 =
                  ((plandate1.getHours() / 24) * 360 * Math.PI) / 180 +
                  ((plandate1.getMinutes() / 60) * (360 / 24) * Math.PI) / 180;
                var endAngleRad1 = startAngleRad1 + 0.3;
                const arcGenerato = d3.shape
                  .arc()
                  .outerRadius(outerRadius)
                  .innerRadius(innerRadius)
                  .startAngle(Number(startAngleRad1.toFixed(5)))
                  .endAngle(Number(endAngleRad1.toFixed(5)));
                if (_datezero.getTime() === plandate.getTime()) {
                  return (
                    <Shape
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        position: "absolute"
                      }}
                      key={index}
                      //ref={plan.id + "planref"}
                      d={arcGenerato()}
                      stroke={"rgb(150, 200, 150)"}
                      strokeWidth="1"
                      fill={"rgba(150, 200, 150, .6)"}
                    />
                  );
                } else return null;
              })}
              {this.props.events.map((plan, index) => {
                var plandate = new Date(plan.date.seconds * 1000);
                var plandate1 = new Date(plan.date.seconds * 1000);
                plandate.setHours(0, 0, 0, 0);
                var startAngleRad1 =
                  ((plandate1.getHours() / 24) * 360 * Math.PI) / 180 +
                  ((plandate1.getMinutes() / 60) * (360 / 24) * Math.PI) / 180;
                var endAngleRad1 = startAngleRad1 + 0.3;
                const arcGenerato = d3.shape
                  .arc()
                  .outerRadius(outerRadius)
                  .innerRadius(innerRadius)
                  .startAngle(Number(startAngleRad1.toFixed(5)))
                  .endAngle(Number(endAngleRad1.toFixed(5)));
                var community =
                  plan.communityId &&
                  this.props.communities.find((h) => h.id === plan.communityId);
                if (
                  !community ||
                  (community.privateToMembers &&
                    !(
                      this.props.auth === undefined ||
                      this.props.auth.uid === community.authorId ||
                      (community.admin &&
                        community.admin.includes(this.props.auth.uid)) ||
                      (community.faculty &&
                        community.faculty.includes(this.props.auth.uid)) ||
                      (community.members &&
                        community.members.includes(this.props.auth.uid))
                    ))
                ) {
                  if (_datezero.getTime() === plandate.getTime()) {
                    return (
                      <Shape
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          position: "absolute"
                        }}
                        key={index}
                        //ref={plan.id + "planref"}
                        d={arcGenerato()}
                        stroke={"rgb(150, 200, 150)"}
                        strokeWidth="1"
                        fill={"rgba(150, 200, 150, .6)"}
                      />
                    );
                  } else return null;
                } else return null;
              })*/}
        </Group>
      </Surface>
    );
  }
}
class CalendarDay extends React.Component {
  constructor(props) {
    super(props);
    var _datezero = this.props._date;
    _datezero.setHours(0, 0, 0, 0);
    let filtered = [];
    var thePlans = this.props.notes.filter((x) => {
      //const isToday = isSameDay(_date, today);
      const plandate = new Date(
        x.date.seconds ? x.date.seconds * 1000 : x.date
      );
      plandate.setHours(0, 0, 0, 0);
      if (plandate.getTime() === _datezero.getTime()) {
        filtered.push(x);
      }
      return filtered;
    });
    this.state = { thePlans };
    this.is = React.createRef();
  }
  componentWillUnmount() {
    clearTimeout(this.resizeTimer);
    window.removeEventListener("resize", this.refresh);
  }
  refresh = () => {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      var boxHeight = this.is.current && this.is.current.offsetHeight;
      this.setState({ boxHeight });
    }, 200);
  };
  componentDidMount = () => {
    this.refresh();
    window.addEventListener("resize", this.refresh);
  };
  getDateISO = (date = new Date()) => {
    return [
      date.getFullYear(),
      this.zeroPad(date.getMonth() + 1, 2),
      this.zeroPad(date.getDate(), 2)
    ].join("-");
  };

  zeroPad = (value, length) => `${value}`.padStart(length, "0");
  componentDidUpdate = (prevProps) => {
    if (this.props.notes !== prevProps.notes) {
      var _datezero = this.props._date;
      _datezero.setHours(0, 0, 0, 0);
      let filtered = [];
      var thePlans = this.props.notes.filter((x) => {
        //const isToday = isSameDay(_date, today);
        const plandate = new Date(
          x.date.seconds ? x.date.seconds * 1000 : x.date
        );
        plandate.setHours(0, 0, 0, 0);
        if (plandate.getTime() === _datezero.getTime()) {
          filtered.push(x);
        }
        return filtered;
      });
      this.setState({ thePlans });
    }
  };
  render() {
    const { isToday, isCurrent, datecelestial } = this.props;
    const { boxHeight } = this.state;
    const yest = this.props._date < datecelestial.getTime();
    var datet = this.props._date.getDate();
    var inMonth =
      this.props.month === this.props._date.getMonth() &&
      this.props.year === this.props._date.getFullYear();
    //console.log(this.state.thePlans);
    return (
      <div
        ref={this.is}
        /*className={
          isCurrent
            ? "HighlightedCalendarDate"
            : isToday
            ? "TodayCalendarDate"
            : inMonth && !yest
            ? "CalendarDateNumber"
            : "PrevPostDateNumber"
        }*/
        style={{
          position: "relative",
          border: isToday || isCurrent ? "1px solid" : "",
          width: "33px",
          height: "33px",
          color: isCurrent
            ? "yellowgreen"
            : isToday
            ? ""
            : inMonth //&& !yest
            ? yest
              ? "tan"
              : "mistyrose"
            : "lightskyblue"
        }}
        onClick={() => this.props.gotoDate(this.props._date)}
      >
        {/*className={
          this.props.smallplz && boxHeight < 100
            ? "square"
            : this.props.smallplz
            ? "squaretop"
            : "square"
        }
       style={
          yest && inMonth && !isCurrent && !isToday
            ? {
                color: "rgb(100,100,130)",
                backgroundColor: "rgba(28,124,132,.4)",
                border: "rgba(28,124,132,.1) 8px solid",
                borderRadius: "100px",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "22px"
              }
            : inMonth
            ? { color: "#888", fontSize: "22px" }
            : { color: "#555", fontSize: "22px" }
        }*/}

        {isToday ? (
          <TodaySun
            height={boxHeight}
            _date={this.props._date}
            date={this.props.date}
            chosen={this.props.chosen}
            month={this.props.month}
            year={this.props.year}
            isToday={isToday}
            datecelestial={datecelestial}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              textAlign: "right",
              width: "100%",
              margin: "7px 0px"
            }}
          >
            {datet}
          </div>
        )}
        {this.state.thePlans.length > 0 && (
          <TodayPlans
            pathname={this.props.pathname}
            userCalendar={this.props.userCalendar}
            communities={this.props.communities}
            members={this.props.members ? this.props.members : []}
            freetime={this.props.freeTime}
            events={this.props.events}
            invitesFromEntityChat={this.props.invitesFromEntityChat}
            height={boxHeight}
            initial={this.props.initial}
            plansShowing={this.props.plansShowing}
            thePlans={this.state.thePlans}
            invites={this.props.invites}
            schedule={this.props.schedule}
            calendar={this.props.calendar}
            assignments={this.props.assignments}
            _date={this.props._date}
          />
        )}
      </div>
    );
  }
}

const localize = new Date().setHours(0, 0, 0, 0);
const getLastMonth = (month, year) => {
    const lastMonth = month - 1 > -1 ? month - 1 : 11;
    const lastMonthYear = month - 1 > -1 ? year : year - 1;

    return { lastMonth, lastMonthYear };
  },
  getNextMonth = (month, year) => {
    const nextMonth = month + 1 < 12 ? month + 1 : 0;
    const nextMonthYear = month + 1 < 12 ? year : year + 1;

    return { nextMonth, nextMonthYear };
  },
  getMonthDays = (
    month = new Date(localize).getMonth(), //func default, localize
    year = new Date(localize).getFullYear() //for Date construction
  ) => {
    const months30 = [3, 5, 8, 10];
    const leapYear = year % 4 === 0;
    return month === 1
      ? leapYear
        ? 29
        : 28
      : months30.includes(month)
      ? 30
      : 31;
  },
  layCalendar = (month, year) => {
    const daysPrior = new Date(year, month, 1, 0, 0, 0, 0).getDay();
    const { lastMonth, lastMonthYear } = getLastMonth(month, year);
    const { nextMonth, nextMonthYear } = getNextMonth(month, year);
    const lastMonthDays = getMonthDays(lastMonth, lastMonthYear);
    const days = getMonthDays(month, year);
    const priorDays = {};
    for (let x = 0; x < daysPrior; x++)
      priorDays[daysPrior - x] = new Date(
        lastMonthYear,
        lastMonth,
        lastMonthDays - x,
        0,
        0,
        0,
        0
      );
    const theseDays = {};
    for (let x = 0; x < days; x++) {
      theseDays[x] = new Date(year, month, x + 1, 0, 0, 0, 0);
    }
    const daysFollowing = 6 - new Date(year, month, days, 0, 0, 0, 0).getDay();
    const nextDays = {};
    for (let x = 0; x < daysFollowing; x++) {
      nextDays[x] = new Date(nextMonthYear, nextMonth, x + 1, 0, 0, 0, 0);
    }

    var calendardays = [
      ...Object.values(priorDays),
      ...Object.values(theseDays),
      ...Object.values(nextDays)
    ];

    var firstDay = new Date(
      lastMonthYear,
      lastMonth,
      lastMonthDays,
      0,
      0,
      0,
      0
    ).setHours(0, 0, 0, 0);

    var lastDay = new Date(year, month, days, 0, 0, 0, 0).setHours(0, 0, 0, 0);

    return {
      firstDay,
      priorDays,
      theseDays,
      nextDays,
      lastDay,
      calendardays
    };
  };
const isSameDay = (date, dte) => {
  const basedateDate = dte.getDate();
  const basedateMonth = dte.getMonth();
  const basedateYear = dte.getFullYear();

  const dateDate = date.getDate();
  const dateMonth = date.getMonth();
  const dateYear = date.getFullYear();

  return (
    basedateDate === dateDate &&
    basedateMonth === dateMonth &&
    basedateYear === dateYear
  );
};

class Calendar extends React.Component {
  state = {};
  componentDidMount = () => {
    const { month, year } = this.props;
    var f = layCalendar(month, year);
    this.props.setCalendarSidebar(f.calendardays);
    f && this.setState(f);
  };
  componentDidUpdate = (prevProps) => {
    if (
      this.props.month !== prevProps.month ||
      this.props.year !== prevProps.year
    ) {
      var f = layCalendar(this.props.month, this.props.year);
      //f.lastMonth = this.props.year;
      //f.lastYear = this.props.year;
      f && this.setState(f);
    }
  };
  render() {
    const { calendardays } = this.state,
      weekdayStyle = {
        borderTop: "1px solid"
      };
    //console.log(this.props.schedule);
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
          fontSize: "26px"
        }}
      >
        <div style={weekdayStyle}>Sun</div>
        <div style={weekdayStyle}>Mon</div>
        <div style={weekdayStyle}>Tue</div>
        <div style={weekdayStyle}>Wed</div>
        <div style={weekdayStyle}>Thu</div>
        <div style={weekdayStyle}>Fri</div>
        <div style={weekdayStyle}>Sat</div>
        {calendardays &&
          calendardays.map((_date, index) => {
            var weekday = _date.getDay();
            var isToday = isSameDay(_date, this.props.datecelestial);
            var isCurrent = isSameDay(_date, this.props.chosen);
            return (
              <div key={index}>
                <CalendarDay
                  pathname={this.props.pathname}
                  userCalendar={this.props.userCalendar}
                  communities={this.props.communities}
                  members={this.props.members}
                  freetime={this.props.freeTime}
                  invitesFromEntityChat={this.props.invitesFromEntityChat}
                  events={this.props.events}
                  weekday={weekday}
                  initial={this.props.initial}
                  plansShowing={this.props.plansShowing}
                  invites={this.props.invites}
                  schedule={this.props.schedule}
                  calendar={this.props.calendar}
                  assignments={this.props.assignments}
                  isToday={isToday}
                  isCurrent={isCurrent}
                  _date={_date}
                  notes={this.props.notes}
                  chosen={this.props.chosen}
                  month={this.props.month}
                  year={this.props.year}
                  gotoDate={this.props.gotoDate}
                  datecelestial={this.props.datecelestial}
                />
              </div>
            );
          })}
      </div>
    );
  }
}

var priorDates = [];
var dO = new Date();
const ind = [dO.getFullYear(), dO.getMonth(), dO.getDate(), 0, 0, 0, 0];
var before = new Date(...ind); //fulcrum
for (let loop = 100; loop > 0; loop--) {
  var last = new Date(before);
  const month = last.getMonth();
  const year = last.getFullYear();
  const yesterdayMonth = month - 1 > -1 ? month - 1 : 11;
  const yesterdayYear = month - 1 > -1 ? year : year - 1;

  before = new Date(yesterdayYear, yesterdayMonth, 1, 0, 0, 0, 0).setHours(
    0,
    0,
    0,
    0
  );
  priorDates.push(before);
}
const getPriorDates = () => priorDates;
var after = new Date(...ind); //fulcrum2
var forwardDates = [];
for (let loop = 100; loop > 0; loop--) {
  var next = new Date(after);
  const month = next.getMonth();
  const year = next.getFullYear();
  const nextMonth = month + 1 < 12 ? month + 1 : 0;
  const nextMonthYear = month + 1 < 12 ? year : year + 1;

  after = new Date(nextMonthYear, nextMonth, 1, 0, 0, 0, 0).setHours(
    0,
    0,
    0,
    0
  );
  forwardDates.push(after);
}
const getForwardDates = () => forwardDates;

const hydrateDates = (calendarWithDates) => {
  const checkDate = (a) =>
    a.date && a.date.seconds
      ? a.date.seconds * 1000
      : isNaN(a.date)
      ? new Date(a.date).getTime()
      : a.date;
  priorDates.map((x) =>
    calendarWithDates.push({
      date: x
    })
  );
  forwardDates.map((x) =>
    calendarWithDates.push({
      date: x
    })
  );

  return calendarWithDates.sort(
    (a, b) => new Date(checkDate(a)) - new Date(checkDate(b))
  );
};

const returnNotesWithDates = (
  notesInput,
  priorDates,
  forwardDates,
  today,
  first
) => {
  let noteList = [];
  let noteTitles = [];
  let notes = Object.values({ ...notesInput });
  notes.map((x) => {
    noteTitles.push(x.message);
    return noteList.push(String(x._id));
  });

  let notesWithDates = Object.values({ ...notes });
  priorDates.map((x) =>
    notesWithDates.push({
      date: x
    })
  );
  if (1 !== today.getDate()) {
    notesWithDates.push({
      date: today
    });
  }

  notesWithDates.push({
    date: first
  });
  forwardDates.map((x) =>
    notesWithDates.push({
      date: x
    })
  );
  notesWithDates.sort((a, b) => new Date(a.date) - new Date(b.date));
  return { notesWithDates, noteList, noteTitles };
};
const CALENDAR_MONTHS = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec"
};

const WEEK_DAYS = {
  0: "sunday",
  1: "monday",
  2: "tuesday",
  3: "wednesday",
  4: "thursday",
  5: "friday",
  6: "saturday"
};
class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.scroll = React.createRef();
  }
  render() {
    const {
      notes,
      todayTime,
      month,
      year,
      diffMonths,
      calendardays,
      lastDay,
      firstDay
    } = this.props;
    var themeColor1 = "rgb(226, 226, 266)";
    var themeColor2 = "rgb(126, 126, 166)";
    var themeColor3 = "rgb(186, 186, 226)";

    return (
      <div
        style={{
          display: "flex",
          position: "fixed",
          top: "56px",
          width: "33px",
          height: "calc(100% - 56px)",
          flexDirection: "column",
          fontSize: "12px",
          paddingTop: "1.23263px",
          borderBottom: "5px black solid",
          background: `linear-gradient(black,${themeColor3})`,
          overflowX: "hidden"
        }}
      >
        <div
          style={{
            display: "flex",
            position: "relative",
            width: "32px",
            height: "min-content",
            flexDirection: "column",
            fontSize: "12px",
            paddingTop: "1.23263px",
            borderBottom: "5px black solid"
          }}
        >
          <span
            style={{
              display: "flex",
              position: "relative",
              width: "19px",
              fontSize: "12px",
              padding: "6.5px"
            }}
            onClick={this.props.refresh}
            aria-label="refresh"
            role="img"
          >
            c
          </span>
          <div
            style={{
              color: "rgb(200,200,200)",
              fontSize: "12px"
            }}
          >
            {CALENDAR_MONTHS[month]}
          </div>
          <div
            style={{
              color: "rgb(200,200,200)",
              fontSize: "12px"
            }}
          >
            {year}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            position: "relative",
            transform: "translateX(11px)",
            width: "20px",
            fontSize: "15px",
            justifySelf: "center",
            paddingTop: "4px",
            right: "2px",
            color: `rgb(170,170,170)`,
            justifyContent: "flex-end"
          }}
        >
          {diffMonths}
        </div>
        <div
          onClick={() => {
            this.scroll.current.scrollIntoView("false");
            this.props.gotoPreviousMonth();
          }}
          style={{
            display: "flex",
            position: "relative",
            backgroundColor: "black",
            width: "29px",
            height: "29px",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            border: `2.5px grey solid`
          }}
        >
          <div
            style={{
              transform: "translate(-5%,10%)"
            }}
          >
            ^
          </div>
        </div>
        <div
          style={{
            display: "flex",
            position: "relative",
            height: "calc(100% - 129px - 28px)",
            width: "50px",
            left: "0px",
            flexDirection: "column",
            textDecoration: "none",
            overflowY: "auto",
            overflowX: "hidden"
          }}
        >
          <div
            ref={this.scroll}
            style={{
              display: "flex",
              position: "absolute",
              top: "0px",
              width: "30px",
              paddingBottom: "5px",
              border: "1px solid black",
              left: "0px",
              height: "min-content",
              flexDirection: "column",
              textDecoration: "none",
              background: `linear-gradient(${themeColor1},${themeColor2})`
            }}
          >
            {calendardays.map((_date) => {
              var eventDate = _date.getTime();
              var isFirstDay = firstDay === eventDate;
              var isLastDay = lastDay === eventDate;
              var noteCount = notes.filter((x) => {
                var noteDate = x.date.seconds ? x.date.seconds * 1000 : x.date;
                return (
                  noteDate - eventDate < 86400000 &&
                  noteDate - eventDate > 0 &&
                  x.title
                );
              });
              var isToday =
                todayTime - eventDate < 86400000 && todayTime - eventDate > 0;
              var unbullet = isFirstDay || isLastDay;
              return (
                <div
                  key={_date}
                  onClick={() => {
                    this.setState({ dateChosen: eventDate });
                    const noted = notes.find(
                      (x) =>
                        x.date - eventDate > 0 && x.date - eventDate < 86400000
                    );
                    if (noted) {
                      var note = noted.constructor === Array ? noted[0] : noted;
                      var ref = note._id ? note._id : noted.id;
                      this[ref].current.scrollIntoView("smooth");
                    }
                  }}
                >
                  <div
                    style={{
                      display: unbullet ? "flex" : "none",
                      position: "relative",
                      color: "black",
                      fontSize: "12px",
                      alignSelf: "center",
                      paddingLeft: "2px"
                    }}
                  >
                    {CALENDAR_MONTHS[_date.getMonth()].toUpperCase()}
                    <br />
                    {_date.getDate()}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      color: isToday ? "blue" : "black",
                      fontSize: "15px"
                    }}
                  >
                    &#x2022;
                    {noteCount.length > 0 ? noteCount.length : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div
          onClick={() => {
            this.scroll.current.scrollIntoView("smooth");
            this.props.gotoNextMonth();
          }}
          style={{
            display: "flex",
            position: "relative",
            backgroundColor: "black",
            width: "29px",
            height: "29px",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            transform: "rotate(180deg)",
            border: `2.5px grey solid`
          }}
        >
          <div
            style={{
              transform: "translate(-5%,10%)"
            }}
          >
            ^
          </div>
        </div>
      </div>
    );
  }
}
const firestore = getFirestore(firebase);
class Monthly extends React.Component {
  constructor(props) {
    super(props);
    var today = new Date(dO.setHours(0, 0, 0, 0));
    var first = new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0, 0);
    // return { notesWithDates, noteList, noteTitles };

    const { noteList, noteTitles, notesWithDates } = returnNotesWithDates(
      [],
      priorDates,
      forwardDates,
      today,
      first
    );
    let filtered = [];
    var thePlans = props.notes.map((x) => {
      //const isToday = isSameDay(_date, today);
      x.date = new Date(x.date.seconds ? x.date.seconds * 1000 : x.date);
      return x;
    });
    this.state = {
      thePlans,
      schedule: [],
      notes: [],
      today,
      first,
      noteList,
      noteTitles,
      notesWithDates,
      calendardaysagain: [],
      chosen: new Date(props.queriedDate),
      month: new Date(props.queriedDate).getMonth(),
      year: new Date(props.queriedDate).getFullYear(),
      invites: []
    };
  }
  componentDidMount = () => {
    this.updateNotes();
  };
  updateNotes = () => {
    const initial = null;
    const { today, first } = this.state;
    const { noteList, noteTitles, notesWithDates } = returnNotesWithDates(
      this.props.notes,
      priorDates,
      forwardDates,
      today,
      first
    );
    var thePlans = this.props.notes.map((x) => {
      //const isToday = isSameDay(_date, today);
      x.date = new Date(x.date.seconds ? x.date.seconds * 1000 : x.date);
      return x;
    });
    this.setState(
      {
        thePlans,
        noteList,
        noteTitles,
        notesWithDates,
        plansWithInvites: notesWithDates,
        plansOpen: notesWithDates
      },
      () => {
        const { notesWithDates } = this.state;
        if (this.props.pathname.split("/sd/")[1]) {
          //console.log("notes with");
          this.handleSchedule(notesWithDates);
        } else {
          const params = this.props.pathname.split("/");
          //console.log(params.length);
          if (!["", "plan"].includes(params[1])) {
            this.handleBook(this.props.pathname.split("/")[1], notesWithDates); //personal
          }
        }
      }
    );
  };

  componentDidUpdate = (prevProps) => {
    if (
      this.props.notes !== prevProps.notes ||
      this.props.pathname !== prevProps.pathname
    ) {
      this.updateNotes();
    }
    const {
      calByRecipient,
      notesWithDates,
      month,
      year,
      lastMonth,
      lastYear
    } = this.state;
    if (month !== lastMonth || year !== lastYear) {
      if (notesWithDates && calByRecipient !== this.state.lastCalendar) {
        this.setState({ lastCalendar: calByRecipient }, () => {
          let calendarFlat = Object.values(calByRecipient).map((x) => x);
          this.setState({
            calendar: hydrateDates(calendarFlat),
            plansWithCalendar: [...notesWithDates, ...calendarFlat]
          });
        });
      }
    }
  };
  handleCal = (notesWithDates) => {
    var threadId =
      this.props.entityType +
      this.props.entityId +
      this.props.recipients.sort();
    onSnapshot(
      query(collection(firestore, "chats"), where("threadId", "==", threadId)),
      (querySnapshot) => {
        let invites = [];
        let p = 0;
        if (querySnapshot.empty) {
          console.log("empty");
        } else
          querySnapshot.docs.forEach((doc) => {
            if (doc.exists()) {
              var foo = doc.data();
              foo.id = doc.id;
              foo.date = foo.date ? foo.date.seconds * 1000 : null;
              if (foo.date) {
                invites.push(foo);
                if (p === querySnapshot.docs.length) {
                  var invitesWithDates = [...invites];

                  var plansWithInvites = [...notesWithDates, ...invites];

                  this.setState({
                    plansAlone: hydrateDates(invitesWithDates),
                    invites,
                    plansWithInvites
                  });
                }
              }
            }
          });
      },
      (e) => console.log(e.message)
    );

    const { calendar, plansWithCalendar } = this.hydrateCalendar(
      this.props.recipients
    );
    this.setState({
      calendar,
      plansWithCalendar
    });
  };
  handleBook = async (profileId, notesWithDates) => {
    //var profileId = //this.props.match.params.id;
    var profile = await getDocs(
      query(collection(firestore, "users"), where("username", "==", profileId))
    ).then(
      (querySnapshot) =>
        querySnapshot.docs
          .map((doc) => doc.exists() && { ...doc.data(), id: doc.id })
          .filter((x) => x)[0]
    );
    this.setState({ profile }, () => {
      let schedule = [];
      var p = 0;
      onSnapshot(
        query(
          collection(firestore, "chats"),
          where("entityId", "==", null),
          where("entityType", "==", "user"),
          where("date", ">", new Date(new Date().getTime() - 86400000))
        ),
        (querySnapshot) => {
          if (querySnapshot.empty) {
            console.log("empty book");
          } else
            querySnapshot.docs.forEach((doc) => {
              p++;
              if (doc.exists()) {
                var foo = doc.data();
                foo.id = doc.id;
                schedule.push(foo);
              }
            });

          if (querySnapshot.docs.length === p) {
            var scheduleWithDates = [...schedule];
            //console.log(schedule);
            this.setState({
              schedule, //: hydrateDates(scheduleWithDates),
              plansWithSchedule: [...notesWithDates, ...schedule]
            });
          }
        },
        (e) => console.log(e)
      );
    });
  };
  handleSchedule = async (notesWithDates) => {
    const params = this.props.pathname.split("/"),
      entityCollection = params[2],
      id = params[3];
    getDoc(
      doc(
        firestore,
        ["job", "event", "housing"].includes(entityCollection)
          ? "event"
          : ["class"].includes(entityCollection)
          ? "forum"
          : "entity",
        id
      )
    )
      .then((doc) => {
        if (doc.exists()) {
          var entity = doc.data();
          entity.id = doc.id;

          let p = 0;
          let schedule = [];
          var members = entity.members ? entity.members : [];
          var admin = entity.admin ? entity.admin : [];
          entity.recipients = [...members, ...admin, entity.authorId];
          const e = this.hydrateCalendar(entity.recipients);
          //console.log(entity);
          this.setState(
            {
              calendar: e.calendar,
              plansWithCalendar: e.plansWithCalendar,
              recipients: entity.recipients,
              entity: entity,
              entityCollection,
              entityId: id
            },
            () => {
              onSnapshot(
                query(
                  collection(firestore, "chats"),
                  where("entityId", "==", id),
                  where("entityType", "==", entityCollection),
                  where("date", ">", new Date(new Date().getTime() - 86400000))
                ),
                (querySnapshot) => {
                  if (querySnapshot.empty) {
                    console.log("empty schedule");
                  } else
                    querySnapshot.docs.forEach((doc) => {
                      p++;
                      if (doc.exists()) {
                        var foo = doc.data();
                        foo.id = doc.id;
                        schedule.push(foo);
                      }
                    });

                  if (querySnapshot.docs.length === p) {
                    var scheduleWithDates = [...schedule];
                    this.setState({
                      schedule, //: hydrateDates(scheduleWithDates),
                      plansWithSchedule: [...notesWithDates, ...schedule]
                    });
                  }
                },
                (e) => console.log(e)
              );
            }
          );
        }
      })
      .catch(standardCatch);
  };
  hydrateCalendar = async (recipients) => {
    const { notesWithDates } = this.state;
    return Promise.all(
      recipients.map((authorId) =>
        getDocs(
          query(
            collection(firestore, "calendar"),
            where("authorId", "==", authorId)
          )
        )
          //.where("recipients", "array-contains", auth.uid)
          //.where("date", ">=", new Date())
          .then((querySnapshot) => {
            let calByRecipient = [];
            let p = 0;
            querySnapshot.docs.forEach((doc) => {
              p++;
              if (doc.exists) {
                var foo = doc.data();
                foo.id = doc.id;
                foo.date = foo.date ? foo.date.seconds * 1000 : null;

                if (foo.date) {
                  calByRecipient.push(foo);
                }
              }
            });
            if (!querySnapshot.empty && p === querySnapshot.docs.length) {
              return hydrateDates(calByRecipient);
            }
          })
      )
    ).then((cal) => {
      var newCal = [];
      cal.map((x) => newCal.concat(x));
      const calendar = cal.filter((x) => x);
      return {
        calendar: hydrateDates(calendar),
        plansWithCalendar: [...notesWithDates, ...calendar]
      };
    });
  };
  render() {
    const { chosen, month, year } = this.state,
      gotoDate = (date) =>
        this.setState({
          monthCalOpen: "day",
          chosen: new Date(date),
          month: new Date(date).getMonth(),
          year: new Date(date).getFullYear()
        }),
      localize = new Date().setHours(0, 0, 0, 0),
      getMonthDays = (
        month = new Date(localize).getMonth(), //func default, localize
        year = new Date(localize).getFullYear() //for Date construction
      ) => {
        const months30 = [3, 5, 8, 10];
        const leapYear = year % 4 === 0;
        return month === 1
          ? leapYear
            ? 29
            : 28
          : months30.includes(month)
          ? 30
          : 31;
      },
      gotoPreviousMonth = (month, year) => {
        var lastMonth = month - 1 > -1 ? month - 1 : 11;
        var lastMonthYear = month - 1 > -1 ? year : year - 1;
        return {
          month: lastMonth,
          year: lastMonthYear,
          e: [
            new Date(lastMonthYear, lastMonth, 1, 0, 0, 0, 0).getTime(),
            new Date(
              lastMonthYear,
              lastMonth,
              getMonthDays(lastMonth, lastMonthYear),
              0,
              0,
              0,
              0
            ).getTime()
          ]
        };
      },
      gotoNextMonth = (month, year) => {
        var nextMonth = month + 1 < 12 ? month + 1 : 0;
        var nextMonthYear = month + 1 < 12 ? year : year + 1;

        return {
          month: nextMonth,
          year: nextMonthYear,
          e: [
            new Date(nextMonthYear, nextMonth, 1, 0, 0, 0, 0).getTime(),
            new Date(
              nextMonthYear,
              nextMonth,
              getMonthDays(nextMonth, nextMonthYear),
              0,
              0,
              0,
              0
            ).getTime()
          ]
        };
      };
    var datecelestial = new Date(),
      isCurrent = isSameDay(new Date(datecelestial), chosen),
      space = " ";
    //console.log("notes", this.props.notes);
    const handlePreviousDay = (chosen) => {
      const today = chosen.getDate();
      const thismonth = chosen.getMonth();
      const thisyear = chosen.getFullYear();
      let yesterday, yesterdayMonth, yesterdayYear;

      if (today > 1) {
        yesterday = today - 1;
        yesterdayMonth = thismonth;
        yesterdayYear = thisyear;
      } else {
        yesterdayMonth = thismonth - 1 > -1 ? thismonth - 1 : 11;
        yesterdayYear = thismonth - 1 > -1 ? thisyear : thisyear - 1;
        yesterday = getMonthDays(yesterdayMonth, yesterdayYear);
      }

      this.setState({
        chosen: new Date(yesterdayYear, yesterdayMonth, yesterday),
        year: yesterdayYear,
        month: yesterdayMonth
      });
    };
    const handleNextDay = (chosen) => {
      const today = chosen.getDate();
      const thismonth = chosen.getMonth();
      const thisyear = chosen.getFullYear();
      let tomorrow, tomorrowMonth, tomorrowYear;

      if (today < getMonthDays(thismonth, thisyear)) {
        tomorrow = today + 1;
        tomorrowMonth = thismonth;
        tomorrowYear = thisyear;
      } else {
        tomorrow = 1;
        tomorrowMonth = thismonth + 1 < 12 ? thismonth + 1 : 0;
        tomorrowYear = thismonth + 1 < 12 ? thisyear : thisyear + 1;
      }
      this.setState({
        chosen: new Date(tomorrowYear, tomorrowMonth, tomorrow, 0, 0, 0, 0),
        year: tomorrowYear,
        month: tomorrowMonth
      });
    };
    //console.log(this.state.showThisPlan);
    var todayTime = new Date().getTime();
    var num = Number(Math.round((chosen - todayTime) / 2453300000)); //2592000000
    var diffMonths = num > 0 ? num : num + 1;
    const { user } = this.props;
    var saveSurely =
      (this.state.hoverViewCloud && this.state.viewSet === "cloud") ||
      (this.state.hoverViewSave && this.state.viewSet === "device");
    const queryDate = () => {
      this.setState(
        {
          alltime: false
        },
        () => {
          var answer = window.confirm(
            `query ${
              this.props.community
                ? this.props.community.message
                : this.props.city
            } for events ${new Date(
              this.props.queriedDate
            ).toLocaleDateString()} - ${new Date(
              this.props.queriedDate + this.props.range
            ).toLocaleDateString()}?`
          );
          if (answer) {
            if (this.props.community) {
              this.chooseCommunity(this.props.community);
            } else {
              this.chooseCitypoint(...this.state.previousCityQuery);
            }
          }
        }
      );
    };
    const eventsInitial = false;
    return (
      //invites, assignments
      <div
        style={{
          //overflow: "hidden",
          color: "white",
          backgroundColor: "black" // "radial-gradient(white black)"
        }}
      >
        <div ref={this.props.getNotes} onClick={() => this.getNotes()} />
        <div
          style={{
            //marginLeft: "33px",
            width: "calc(100%)"
          }}
        >
          {this.state.profile && this.state.profile.username}
          {!this.state.hideCalendar && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <div
                //className="monthlyl"
                onClick={() => {
                  const e = gotoPreviousMonth(month, year);
                  this.setState(
                    { month: e.month, year: e.year },
                    () => this.props.initial === "event" && queryDate(e.e)
                  );
                }}
                style={{ userSelect: "none" }}
                //onMouseUp={this.clearPressureTimer}
              >
                Last
                <br />
                Month
              </div>
              <div>
                <div
                  style={{
                    color:
                      new Date(this.state.year, this.state.month).getTime() >
                      datecelestial.getTime()
                        ? "lightskyblue"
                        : new Date(
                            this.state.year,
                            this.state.month
                          ).getTime() <
                          datecelestial.getTime() - 2680000000
                        ? "lightgrey"
                        : ""
                  }}
                >
                  {
                    Object.keys({
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
                    })[this.state.month]
                  }
                  {space}
                  {this.state.year}
                </div>
                <div
                  style={{
                    backgroundColor: "black",
                    color: isCurrent ? "white" : "rgb(100,200,250)"
                  }}
                >
                  <span
                    onClick={() => gotoDate(datecelestial)}
                    aria-label="refresh"
                    role="img"
                  >
                    ↻
                  </span>
                  {space}
                  {new Date(this.state.chosen).toLocaleDateString()}
                </div>
              </div>
              <div
                //className="monthlyr"
                onClick={() => {
                  const e = gotoNextMonth(month, year);
                  this.setState(
                    { month: e.month, year: e.year },
                    () => this.props.initial === "event" && queryDate(e.e)
                  );
                }}
                style={{ userSelect: "none" }}
                //onMouseUp={this.clearPressureTimer}
              >
                Next
                <br />
                Month
              </div>
            </div>
          )}
          {!this.state.hideCalendar && (
            <Calendar
              setCalendarSidebar={(e) =>
                this.setState({
                  calendardaysagain: e
                })
              }
              pathname={this.props.pathname}
              userCalendar={this.state.userCalendar}
              ref={{ current: {} }}
              hydrateUser={this.props.hydrateUser}
              user={this.props.user}
              auth={this.props.auth}
              notes={this.state.thePlans}
              invites={[]}
              datecelestial={datecelestial}
              queriedDate={this.props.queriedDate}
              chosen={chosen}
              month={month}
              year={year}
              schedule={this.state.schedule}
              events={[]}
              initial={"plan"}
              //CalendarDay
              location={this.props.location}
              gotoDate={gotoDate}
              communities={this.props.communities}
              members={this.props.members}
              freetime={this.props.freeTime}
              invitesFromEntityChat={this.props.invitesFromEntityChat}
              plansShowing={true}
              calendar={this.state.calendar ? this.state.calendar : []}
              assignments={this.props.assignments}
            />
          )}
          {!this.state.hideCalendar && (
            <DayCal
              chosen={this.state.chosen}
              datecelestial={datecelestial}
              notes={this.state.thePlans}
              invites={this.state.invites}
              schedule={[]}
              events={[]}
              initial={"plan"}
              isSameDay={isSameDay}
              handlePreviousDay={handlePreviousDay}
              handleNextDay={handleNextDay}
              backtotoday={() => gotoDate(datecelestial)}
              navigate={this.props.navigate}
            />
          )}
          <div
            style={{
              flexDirection: "column",
              display: "flex",
              position: "relative"
            }}
          >
            {this.state.thePlans.map((x, index) => {
              var id = x._id ? x._id : x.id;
              var eventDate = x.date.seconds
                ? x.date.seconds * 1000
                : isNaN(x.date)
                ? new Date(x.date).getTime()
                : x.date;
              var isEvent = x.name || x.message;
              /*var notANumber = isNaN(x.date);

              var showInvites =
                this.state.fromFilter &&
                this.state.membersSelected.includes(x.authorId) &&
                !notANumber &&
                !this.state.freeTime;
              var showPlansOk =
                showPlans ||
                (!notANumber && !this.state.fromFilter && !this.state.freeTime);
              var importedFromApi = eventsInitial && x.name;

              var showCard =
                (isEvent && showPlansOk) ||
                (this.state.plansShowing && notANumber) ||
                showInvites ||
                importedFromApi;
*/
              var today =
                (!isEvent || x.time) && Math.abs(eventDate - todayTime) < 10;
              if (!today) {
                return (
                  <div key={index} ref={this[id]}>
                    <PlanObject
                      notes={this.state.thePlans}
                      auth={this.props.auth}
                      edmInitial={x.name}
                      eventsInitial={eventsInitial}
                      chooseInvite={this.props.chooseInvite}
                      onDelete={this.props.handleDelete}
                      handleSave={this.props.handleSave}
                      noteList={this.state.noteList}
                      noteTitles={[]}
                      note={x}
                      users={this.props.users}
                      height={this.props.height}
                      opened={this.state.opened}
                      open={(x) => this.setState({ opened: x })}
                    />
                  </div>
                );
              } else {
                return (
                  <div
                    key={index}
                    ref={this.todayRef}
                    style={{
                      color: "rgb(146, 266, 176)",
                      display: "flex",
                      position: "relative",
                      width: "100%",
                      justifyContent: "flex-start",
                      paddingLeft: "30px",
                      alignItems: "center",
                      height: "36px",
                      backgroundColor: "rgb(20,20,20)",
                      fontSize: "16px"
                    }}
                  >
                    <div
                      style={{
                        textDecoration: "underline",
                        fontSize: "16px"
                      }}
                    >
                      {CALENDAR_MONTHS[dateObj.getMonth()]}&nbsp;
                      {dateObj.getDate()},&nbsp;
                      {dateObj.getFullYear()}
                    </div>
                    <div
                      style={{
                        textDecoration: "none",
                        fontSize: "16px"
                      }}
                    >
                      &nbsp;&bull;&nbsp;today&nbsp;&bull;&nbsp;
                      {WEEK_DAYS[dateObj.getDay()]}
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
        {false && !this.props.chatsopen && (
          <Sidebar
            refresh={() => {
              this.setState({ hideCalendar: !this.state.hideCalendar });
            }}
            notes={this.state.thePlans}
            todayTime={todayTime}
            month={this.state.month}
            year={this.state.year}
            diffMonths={diffMonths}
            calendardays={this.state.calendardaysagain}
            lastDay={this.state.lastDay}
            firstDay={this.state.firstDay}
            gotoNextMonth={() => {
              const e = gotoNextMonth(month, year);
              this.setState(
                { month: e.month, year: e.year },
                () => eventsInitial && queryDate(e.e)
              );
            }}
            gotoPreviousMonth={() => {
              const e = gotoPreviousMonth(month, year);
              this.setState(
                { month: e.month, year: e.year },
                () => eventsInitial && queryDate(e.e)
              );
            }}
          />
        )}
      </div>
    );
  }
}
export default Monthly;
/*export default React.forwardRef((props, ref) => (
  <Monthly {...props} {...ref.current} />
));*/
