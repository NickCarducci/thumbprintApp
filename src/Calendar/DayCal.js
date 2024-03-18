import React from "react";
import { Link } from "react-router-dom";
import * as shape from "d3-shape";
import ART from "react-art";
import "art/modes/svg";
import "./DayCal.css";
const d3 = {
  shape
};

const { Surface, Group, Shape } = ART;

class PlanArcs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedplan: "" };
  }
  percentToColor(weight) {
    var color2 = [49, 171, 212];
    var color1 = [143, 136, 0];
    var w1 = weight;
    var w2 = 1 - w1;
    var timecolor = [
      Math.round(color1[0] * w1 + color2[0] * w2),
      Math.round(color1[1] * w1 + color2[1] * w2),
      Math.round(color1[2] * w1 + color2[2] * w2)
    ];
    return `rgb(${timecolor})`;
  }
  render() {
    const size = Math.min(this.props.height, this.props.width);
    //const size = Math.min(this.props.height * 0.7, this.props.width * 0.7);
    const outerRadius = this.props.height * 0.15;
    const innerRadius = this.props.height * 0.14;
    const width = size;
    const height = size;
    const x = width / 2;
    const y = height / 2;

    //free space below until return
    var le1 = [];
    var le = [];
    var count;
    for (count = 0; count < 24; count++)
      le1.push({
        //rangeChosen:86400000,
        hour: count
      });
    const f = this.props.chosen ? this.props.chosen : this.props.datecelestial;
    var lee = [];
    var counte;
    for (counte = 0; counte < 24; counte++) {
      if (counte > new Date().getHours()) {
        lee.push({
          //rangeChosen:86400000,
          hour: counte
        });
      }
    }
    if (new Date(f).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)) {
      le = lee;
    } else if (
      new Date(f).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0)
    ) {
      le = le1;
    } else {
      le = [];
    }
    var theseplans = [];
    this.props.notes
      .sort((a, b) => {
        return a.date > b.date ? 1 : -1;
      })
      .map((plan, index) => {
        const browsing = new Date(f);
        const browsingzero = browsing.setHours(0, 0, 0, 0);
        const plandate = new Date(plan.date);
        const plandatezero = plandate.setHours(0, 0, 0, 0);
        if (plandatezero === browsingzero) {
          return theseplans.push(plan);
        } else return null;
      });

    var theseschedule = [];
    this.props.schedule
      .sort((a, b) => {
        return a.date > b.date ? 1 : -1;
      })
      .map((invite, index) => {
        const f = this.props.chosen
          ? this.props.chosen
          : this.props.datecelestial;

        const browsing = new Date(f);
        const browsingzero = browsing.setHours(0, 0, 0, 0);
        const plandate = new Date(invite.date);
        const plandatezero = plandate.setHours(0, 0, 0, 0);
        if (plandatezero === browsingzero) {
          return theseschedule.push(invite);
        } else return null;
      });

    var theseinvites = [];
    this.props.invites
      .sort((a, b) => {
        return a.date > b.date ? 1 : -1;
      })
      .map((invite, index) => {
        const f = this.props.chosen
          ? this.props.chosen
          : this.props.datecelestial;

        const browsing = new Date(f);
        const browsingzero = browsing.setHours(0, 0, 0, 0);
        const plandate = new Date(invite.date);
        const plandatezero = plandate.setHours(0, 0, 0, 0);
        if (plandatezero === browsingzero) {
          return theseinvites.push(invite);
        } else return null;
      });

    var theseevents = [];
    this.props.initial === "event" &&
      this.props.events
        .sort((a, b) => {
          return a.date > b.date ? 1 : -1;
        })
        .map((event, index) => {
          const f = this.props.chosen
            ? this.props.chosen
            : this.props.datecelestial;

          const browsing = new Date(f);
          const browsingzero = browsing.setHours(0, 0, 0, 0);
          const plandate = new Date(event.date);
          const plandatezero = plandate.setHours(0, 0, 0, 0);
          if (plandatezero === browsingzero) {
            return theseevents.push(event);
          } else return null;
        });
    //console.log("notess", this.props.notes);
    return (
      <Surface
        style={{
          transform: "rotate(180deg)"
        }}
        width={width}
        height={height}
      >
        <Group x={x} y={y}>
          {this.props.notes
            .sort((a, b) => {
              return a.date > b.date ? 1 : -1;
            })
            .map((plan, index) => {
              const todayalright = new Date(plan.date);
              if (
                new Date(plan.date).setHours(0, 0, 0, 0) ===
                  new Date(
                    this.props.chosen
                      ? this.props.chosen
                      : this.props.datecelestial
                  ).setHours(0, 0, 0, 0) &&
                (this.props.plansShowing || this.props.initial !== "invite")
              ) {
                const startAngleRad1 =
                  ((todayalright.getHours() / 24) * 360 * Math.PI) / 180 +
                  ((todayalright.getMinutes() / 60) * (360 / 24) * Math.PI) /
                    180;
                const timespan =
                  ((plan.rangeChosen / 24) * 360 * Math.PI) / 180;
                const endAngleRad1 =
                  startAngleRad1 + (plan.rangeChosen ? timespan : 0.25);

                const arcGenerato = d3.shape
                  .arc()
                  .outerRadius(outerRadius + 60)
                  .innerRadius(innerRadius + 50)
                  .startAngle(Number(startAngleRad1.toFixed(5)))
                  .endAngle(Number(endAngleRad1.toFixed(5)));
                return (
                  <Shape
                    //key="arc"
                    key={index}
                    d={arcGenerato()}
                    stroke={"rgb(49,171,212)"}
                    strokeWidth="3"
                    fill={"rgb(49,171,212, .6)"}
                    onClick={() => {
                      this.props.navigate(`/plan/${plan._id}`);
                    }}
                  />
                );
              } else return null;
            })}
          {this.props.invites //or events in entity chat
            .sort((a, b) => {
              return a.date > b.date ? 1 : -1;
            })
            .map((plan, index) => {
              const todayalright = new Date(plan.date);

              const startAngleRad1 =
                ((todayalright.getHours() / 24) * 360 * Math.PI) / 180 +
                ((todayalright.getMinutes() / 60) * (360 / 24) * Math.PI) / 180;
              const endAngleRad1 = startAngleRad1 + 0.3;

              const arcGenerato = d3.shape
                .arc()
                .outerRadius(outerRadius + 60)
                .innerRadius(innerRadius + 50)
                .startAngle(Number(startAngleRad1.toFixed(5)))
                .endAngle(Number(endAngleRad1.toFixed(5)));

              const f = this.props.chosen
                ? this.props.chosen
                : this.props.datecelestial;
              const browsing = new Date(f);
              const browsingzero = browsing.setHours(0, 0, 0, 0);
              const plandate = new Date(plan.date);
              const plandatezero = plandate.setHours(0, 0, 0, 0);
              if (plandatezero === browsingzero) {
                return (
                  <Shape
                    //key="arc"
                    key={index}
                    d={arcGenerato()}
                    stroke={"rgb(169,129,220)"}
                    strokeWidth="1"
                    fill={"rgba(169,129,220, .6)"}
                    onClick={() => {
                      if (plan.id && String(plan.id).length < 10) {
                        this.props.history.push(
                          `/events/edmtrain/${plan._id ? plan._id : plan.id}`
                        );
                      } else if (this.props.eventInitial) {
                        this.props.history.push(
                          `/event/${plan._id ? plan._id : plan.id}`
                        );
                      } else {
                        this.props.history.push(`/plan/${plan._id}`);
                      }
                    }}
                  />
                );
              } else return null;
            })}

          {
            //free space
            /*this.props.notes
            .sort((a, b) => {
              return a.date > b.date ? 1 : -1;
            })*/
            le.map((slot, index) => {
              //new
              const todayalright = new Date(
                new Date(this.props.chosen).setHours(slot.hour, 0, 0, 0)
              );
              const startAngleRad1 =
                ((todayalright.getHours() / 24) * 360 * Math.PI) / 180 +
                ((todayalright.getMinutes() / 60) * (360 / 24) * Math.PI) / 180;
              const timespan = ((slot.rangeChosen / 24) * 360 * Math.PI) / 180;
              const endAngleRad1 =
                startAngleRad1 + (slot.rangeChosen ? timespan : 0.25);

              const arcGenerato = d3.shape
                .arc()
                .outerRadius(outerRadius + 60)
                .innerRadius(innerRadius + 50)
                .startAngle(Number(startAngleRad1.toFixed(5)))
                .endAngle(Number(endAngleRad1.toFixed(5)));

              const f = this.props.chosen
                ? this.props.chosen
                : this.props.datecelestial;

              const browsing = new Date(f);
              const browsingzero = browsing.setHours(0, 0, 0, 0);
              //new
              const plandate = new Date(
                new Date(this.props.chosen).setHours(slot.hour, 0, 0, 0)
              );
              const plandatezero = plandate.setHours(0, 0, 0, 0);
              var thisplan = theseplans.find((x) => {
                var planDate = new Date(x.date);
                var rangeChosen = x.rangeChosen ? x.rangeChosen : 0.3 * 86400;

                return (
                  planDate.getHours() - 1 < slot.hour &&
                  new Date(planDate.getTime() + rangeChosen).getHours() + 2 >
                    slot.hour
                );
              });
              var thisschedule = theseschedule.find((x) => {
                var scheduleDate = new Date(x.date);
                var rangeChosen = x.rangeChosen ? x.rangeChosen : 0.3 * 86400;
                return (
                  scheduleDate.getHours() - 1 < slot.hour &&
                  new Date(scheduleDate.getTime() + rangeChosen).getHours() +
                    2 >
                    slot.hour
                );
              });
              var thisinvite = theseinvites.find((x) => {
                var inviteDate = new Date(x.date);
                var rangeChosen = x.rangeChosen ? x.rangeChosen : 0.3 * 86400;
                return (
                  inviteDate.getHours() - 1 < slot.hour &&
                  new Date(inviteDate.getTime() + rangeChosen).getHours() + 2 >
                    slot.hour
                );
              });
              var thisevent = theseevents.find((x) => {
                var eventDate = new Date(x.date);
                var rangeChosen = x.rangeChosen ? x.rangeChosen : 0.3 * 86400;
                return (
                  eventDate.getHours() - 1 < slot.hour &&
                  new Date(eventDate.getTime() + rangeChosen).getHours() + 2 >
                    slot.hour
                );
              });
              if (
                plandatezero === browsingzero &&
                !thisplan &&
                !thisinvite &&
                !thisevent &&
                !thisschedule
              ) {
                var today = new Date().getTime() / 1000;

                var eventDate = new Date(todayalright).getTime() / 1000;

                var chopped = (eventDate - today) / 86400;
                var colorTime = chopped.toString().substr(0, 3);
                return (
                  <Shape
                    //key="arc"
                    key={index}
                    d={arcGenerato()}
                    stroke={this.percentToColor(colorTime / 30)}
                    strokeWidth="3"
                    fill={"rgb(49,171,212, .01)"}
                    onClick={() => {
                      this.props.navigate(
                        `/new/${todayalright.getFullYear()}-${
                          todayalright.getMonth() + 1
                        }-${todayalright.getDate()}/${todayalright.getHours()}:${todayalright.getMinutes()}`
                      );
                    }}
                  />
                );
              } else {
                return null;
              }
            })
          }
          {this.props.schedule //invites in entity chat
            .sort((a, b) => {
              return a.date > b.date ? 1 : -1;
            })
            .map((plan, index) => {
              const todayalright = new Date(plan.date);

              const startAngleRad1 =
                ((todayalright.getHours() / 24) * 360 * Math.PI) / 180 +
                ((todayalright.getMinutes() / 60) * (360 / 24) * Math.PI) / 180;
              const endAngleRad1 = startAngleRad1 + 0.3;

              const arcGenerato = d3.shape
                .arc()
                .outerRadius(outerRadius + 60)
                .innerRadius(innerRadius + 50)
                .startAngle(Number(startAngleRad1.toFixed(5)))
                .endAngle(Number(endAngleRad1.toFixed(5)));

              const f = this.props.chosen
                ? this.props.chosen
                : this.props.datecelestial;

              const browsing = new Date(f);
              const browsingzero = browsing.setHours(0, 0, 0, 0);
              const plandate = new Date(plan.date);
              const plandatezero = plandate.setHours(0, 0, 0, 0);
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
                if (plandatezero === browsingzero) {
                  return (
                    <Shape
                      //key="arc"
                      key={index}
                      d={arcGenerato()}
                      stroke={"rgb(169,129,220)"}
                      strokeWidth="1"
                      fill={"rgba(169,129,220, .6)"}
                      onClick={() => {
                        if (plan.id && String(plan.id).length < 10) {
                          this.props.history.push(
                            `/events/edmtrain/${plan._id ? plan._id : plan.id}`
                          );
                        } else if (this.props.eventInitial) {
                          this.props.history.push(
                            `/event/${plan._id ? plan._id : plan.id}`
                          );
                        } else {
                          this.props.history.push(`/plan/${plan._id}`);
                        }
                      }}
                    />
                  );
                } else return null;
              } else return null;
            })}
        </Group>
      </Surface>
    );
  }
}

class DayCalAccessories extends React.Component {
  render() {
    const { diffDays, change } = this.props;
    return (
      <div>
        <div
          style={{
            display: diffDays < 1 ? "none" : "none",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
            backgroundColor: "rgba(28,124,132,.4)",
            //border: "rgba(28,124,132,.1) 8px solid",
            borderRadius: "50%",
            width: change,
            height: change
          }}
        />
        <div>
          <PlanArcs
            initial={this.props.initial}
            communities={this.props.communities}
            height={this.props.height}
            width={this.props.width}
            notes={this.props.notes}
            invites={this.props.invites}
            schedule={this.props.schedule}
            chosen={this.props.chosen}
            datecelestial={this.props.datecelestial}
            plansShowing={this.props.plansShowing}
            inviteInitial={this.props.inviteInitial}
            //
            events={this.props.events}
            eventsInitial={this.props.eventsInitial}
            edmInitial={this.props.edmInitial}
            //freeSpace={true}
            calendarInitial={this.props.calendarInitial}
            navigate={this.props.navigate}
          />
        </div>
      </div>
    );
  }
}

class CalSlideDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedplan: "" };
    this.day = React.createRef();
  }
  percentToColor(weight) {
    var color2 = [49, 171, 212];
    var color1 = [143, 136, 0];
    var w1 = weight;
    var w2 = 1 - w1;
    var timecolor = [
      Math.round(color1[0] * w1 + color2[0] * w2),
      Math.round(color1[1] * w1 + color2[1] * w2),
      Math.round(color1[2] * w1 + color2[2] * w2)
    ];
    return `rgb(${timecolor})`;
  }
  componentWillUnmount() {
    clearTimeout(this.timeout);
    window.removeEventListener("resize", this.onresize);
  }
  onresize = () => {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      var width = this.day.current && this.day.current.offsetWidth;

      this.setState({ width });
    }, 20);
  };
  componentDidMount = () => {
    this.onresize();
    window.addEventListener("resize", this.onresize);
  };
  render() {
    const WEEK_DAYS = {
      0: "SUN",
      1: "MON",
      2: "TUE",
      3: "WED",
      4: "THU",
      5: "FRI",
      6: "SAT"
    };
    const today = new Date(this.props.datecelestial);
    const year = this.props.chosen.getFullYear();
    const month = this.props.chosen.getMonth();
    const day = this.props.chosen.getDate();
    const hour = today.getHours();
    const minute = today.getMinutes();
    const second = today.getSeconds();
    const totalseconds = hour * 3600 + minute * 60 + second;
    const totalsecondsoutofday = totalseconds / 86400;
    const totaldegrees = totalsecondsoutofday * 360;
    const monthname = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ][month].toUpperCase();

    var diffDays = Math.round(
      (this.props.datecelestial - this.props.chosen) / 86400000
    );
    var is_negative = diffDays < 0;
    var change = this.state.width;
    var compare = this.props.chosen
      ? this.props.chosen
      : new Date(this.props.datecelestial).setHours(0, 0, 0, 0);
    var filteredPlans = this.props.notes.filter(
      (plan) => compare === new Date(plan.date).setHours(0, 0, 0, 0)
    );
    var filteredInvites = this.props.invites.filter(
      (plan) => compare === new Date(plan.date).setHours(0, 0, 0, 0)
    );
    var filteredSchedule = this.props.schedule.filter(
      (plan) => compare === new Date(plan.date).setHours(0, 0, 0, 0)
    );
    var le = [];
    var count;
    for (count = 0; count < 24; count++)
      le.push({
        hour: count
      });
    var night = [20, 21, 22, 23, 0, 1, 2, 3, 4];

    const startAngleRad = 0,
      endAngleRad =
        ((new Date(this.props.datecelestial).getHours() / 24) * 360 * Math.PI) /
        (180 +
          ((new Date(this.props.datecelestial).getMinutes() / 60) *
            (360 / 24) *
            Math.PI) /
            180);
    const arcGenerator = d3.shape
      .arc()
      .outerRadius(this.state.width * 0.33)
      .innerRadius(this.state.width * 0.3)
      .startAngle(startAngleRad)
      .endAngle(endAngleRad);
    const clockborder = {
      //border: "1px solid",
      position: "absolute",
      maxHeight: "70vh",
      maxWidth: "90%",
      top: "50%",
      left: "50%",
      borderRadius: "50%",
      transform: "translate(-50%, -50%)"
    };
    return (
      <div
        ref={this.day}
        style={{
          overflow: "hidden",
          userSelect: "none",
          position: "relative"
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            backgroundColor: "rgba(0, 0, 0, 0.699)",
            marginBottom: `8%`,
            width: "100%",
            height: "90%",
            minHeight: "380px",
            color: "white",
            boxShadow: "1px 0px 7px rgba(0, 0, 0, 0.5)",
            transition: "transform 0.3s ease-in",
            zIndex: "4"
          }}
        >
          <div>
            <div className="monthyear">
              <div style={{ paddingTop: "10px" }}>
                <div>&nbsp;&nbsp;&nbsp;{`${monthname}`}</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`${year}`}</div>
              </div>
              <div className="weekdayday">
                <div className="weekday">
                  {WEEK_DAYS[this.props.chosen.getDay()]}
                </div>
                <div className="day">{`${day}`}</div>
              </div>
              <div onClick={this.props.switchPlansShowing}>
                <div className="daysuntil">
                  &nbsp;&nbsp;
                  {diffDays === 1
                    ? "Today"
                    : diffDays === 0
                    ? "Tomorrow"
                    : diffDays === 2
                    ? "Yesterday"
                    : is_negative
                    ? `In ${Math.abs(diffDays)} days`
                    : `${diffDays} days ago`}
                </div>
                <div
                  style={{
                    display: this.state.width < 600 ? "none" : "block",
                    transform: "rotate(90px)"
                  }}
                  onClick={this.props.dayCalOpener}
                >
                  {"^"}
                </div>
                <div
                  className="plancount"
                  style={{
                    display:
                      filteredSchedule.length === 0 &&
                      filteredInvites.length === 0 &&
                      filteredPlans.length === 0
                        ? "none"
                        : "block",
                    color:
                      this.props.plansShowing || !this.props.inviteInitial
                        ? "rgb(60,120,160)"
                        : "rgb(120,120,140)"
                  }}
                >
                  &nbsp;&nbsp;&nbsp;
                  {this.props.sdInitial
                    ? filteredSchedule.length
                    : this.props.inviteInitial
                    ? filteredInvites.length
                    : filteredPlans.length}{" "}
                  {this.props.sdInitial
                    ? `INVITE${filteredSchedule.length === 1 ? "" : "S"}`
                    : this.props.inviteInitial
                    ? `INVITE${filteredInvites.length === 1 ? "" : "S"}`
                    : `PLAN${filteredPlans.length === 1 ? "" : "S"}`}
                  {
                    //this.props.inviteInitial && " : "
                  }
                  <br />
                  &nbsp;&nbsp;&nbsp;
                  {this.props.inviteInitial && filteredPlans.length}{" "}
                  {this.props.inviteInitial
                    ? `PLAN${filteredPlans.length === 1 ? "" : "S"} ${
                        this.props.plansShowing ? "" : "HIDDEN"
                      }`
                    : null}
                </div>
              </div>
            </div>
            <span
              className="gototoday"
              onClick={this.props.backtotoday}
              aria-label="refresh"
              role="img"
              style={{ display: "none" }}
            >
              ↻
            </span>
          </div>
          {false && diffDays === 1
            ? this.props.datecelestial && (
                <Surface
                  style={{
                    //zIndex: "999",
                    position: "absolute",
                    transform: "rotate(180deg)"
                  }}
                  width={this.state.width}
                  height={this.state.width}
                >
                  <Group x={this.state.width / 2} y={this.state.width / 2 - 60}>
                    <Shape
                      key="arc"
                      d={arcGenerator()}
                      stroke={"rgb(28,124,132)"}
                      fill={"rgb(28,124,132, .4)"}
                    />
                  </Group>
                </Surface>
              )
            : null}

          {/*<img src={clockdial} className="clockdial" alt="error" />*/}
          {!this.props.isSameDay(
            new Date(this.props.datecelestial),
            this.props.chosen
          ) ? null : night.includes(hour) ? (
            <img
              src="https://www.dropbox.com/s/tqw39uh4mcywirx/clockbordermoonmenu%20%288%29.png?raw=1"
              style={{
                ...clockborder,
                transform: `translate(-50%, -50%) rotate(${totaldegrees}deg)`
              }}
              alt="error"
            />
          ) : (
            <img
              src="https://www.dropbox.com/s/fegsthumkz6pufy/clockbordersun.png?raw=1"
              style={{
                ...clockborder,
                transform: `translate(-50%, -50%) rotate(${totaldegrees}deg)`
              }}
              alt="error"
            />
          )}
          {le.map((x, i) =>
            night.includes(i) ? (
              <img
                key={i}
                src="https://www.dropbox.com/s/tqw39uh4mcywirx/clockbordermoonmenu%20%288%29.png?raw=1"
                style={{
                  ...clockborder,
                  transform: `translate(-50%, -50%) rotate(${
                    360 * (x.hour / 24)
                  }deg)`,
                  opacity: ".1"
                }}
                alt="error"
              />
            ) : (
              <img
                key={i}
                src="https://www.dropbox.com/s/fegsthumkz6pufy/clockbordersun.png?raw=1"
                style={{
                  ...clockborder,
                  transform: `translate(-50%, -50%) rotate(${
                    360 * (x.hour / 24)
                  }deg)`,
                  opacity: ".1"
                }}
                alt="error"
              />
            )
          )}
          <DayCalAccessories
            initial={this.props.initial}
            communities={this.props.communities}
            height={this.state.width}
            width={this.state.width}
            notes={this.props.notes}
            invites={this.props.invites}
            events={this.props.events}
            schedule={this.props.schedule}
            chosen={this.props.chosen}
            datecelestial={this.props.datecelestial}
            plansShowing={this.props.plansShowing}
            change={change}
            navigate={this.props.navigate}
          />
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between"
            }}
          >
            <div
              onClick={() => this.props.handlePreviousDay(this.props.chosen)}
            >
              Prev
              <br />
              Day
            </div>
            <div onClick={this.props.dayCalCloser}>Inspect</div>
            <div onClick={() => this.props.handleNextDay(this.props.chosen)}>
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
