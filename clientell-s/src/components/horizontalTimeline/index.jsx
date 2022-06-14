import React, { useEffect, useState } from "react";
import GoogleAPIService from "../../services/googleAPI.service";
import "./index.less";
import ReactLoading from "react-loading";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

export const HorizontalTimeline = ({
  data,
  setSelectedBP,
  selectedBP,
  name,
  timeDays,
  dotColor,
  rangeForAllOption,
}) => {
  const [events, setEvents] = useState(null);
  const [more, setMore] = useState(false);
  const [fetchMore, setFetchMore] = useState(false);
  const [page, setPage] = useState(1);
  const [showEmail, setShowEmail] = useState(null);
  const history = useHistory();
  const query = new URLSearchParams(history.location.search);
  const accountId = "TEST1" || query.get("account_Id");

  const fetchMoreData = () => {
    setFetchMore((prev) => !prev);
  };
  useEffect(() => {
    setShowEmail(false);
  }, [events]);

  useEffect(() => {
    setMore(false);
    setEvents(null);
    if (selectedBP.name === name) {
      if (name === "meetings") {
        GoogleAPIService.getMeetingData({
          date: data[selectedBP.index],
          sort: "asc",
          page: 1,
          accountId,
        }).then((res) => {
          setEvents(res.data);
        });
      } else if (name === "mailsent" || name === "mailrec") {
        GoogleAPIService.getMailData({
          date: data[selectedBP.index],
          sort: "asc",
          page: 1,
          accountId,
        }).then((res) => {
          setEvents(res.data);
        });
      }
    }
  }, [selectedBP]);
  useEffect(() => {
    if (events && events.has_next_page) {
      GoogleAPIService.getMeetingData({
        date: data[selectedBP.index],
        sort: "asc",
        page: page + 1,
        accountId,
      }).then((res) => {
        setEvents((prev) => ({
          ...res.data,
          calendar_events: [
            ...prev.calendar_events,
            ...res.data.calendar_events,
          ],
        }));
        setPage((prev) => prev + 1);
      });
    }
  }, [fetchMore]);

  let date_start = new Date();

  date_start.setDate(date_start.getDate() - Math.ceil(timeDays / 10) * 10 + 1);
  // eslint-disable-next-line no-extend-native
  Date.prototype.addDays = function (days) {
    let dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
  };

  function getDates(startDate, stopDate) {
    let dateArray = new Array();
    let currentDate = startDate;
    while (currentDate <= stopDate) {
      dateArray.push(currentDate);
      currentDate = currentDate.addDays(1);
    }
    return dateArray;
  }

  let dateArray = (function () {
    let date1 = rangeForAllOption ? rangeForAllOption.start : new Date();
    let date2 = rangeForAllOption ? rangeForAllOption.end : new Date();
    let todaysDate = new Date();
    if (date2 < todaysDate) {
      date2 = todaysDate;
    }
    const tempDataArr =
      timeDays === 0 && rangeForAllOption
        ? getDates(date1, date2)
        : getDates(date_start, todaysDate);

    if (timeDays) {
      return tempDataArr;
    } else if (!timeDays && tempDataArr.length < 10) {
      return tempDataArr;
    } else {
      console.log({ tempDataArr });
      const Difference_In_Days = Math.ceil(tempDataArr.length / 10) * 10;

      date1.setDate(
        date1.getDate() - (Difference_In_Days - tempDataArr.length)
      );

      return getDates(date1, date2);
    }
  })();
  console.log({ dateArray });
  // if (events && showEmail !== null) {
  //   console.log(events.mails[showEmail]);
  // }

  if (name === "meetings") {
    let dateI = null;
    if (events && events.calendar_events[0]) {
      dateI = new Date(events.calendar_events[0].event_start);
    }
    let dateF =
      events &&
      events.calendar_events[0] &&
      new Date(events.calendar_events[0].event_end);

    if (dateF < dateI) {
      dateF.setDate(dateF.getDate() + 1);
    }

    let diff = dateF - dateI;
    let msecT = diff;
    let hhT = Math.floor(msecT / 1000 / 60 / 60);
    msecT -= hhT * 1000 * 60 * 60;
    let mmT = Math.floor(msecT / 1000 / 60);

    return (
      <div className="horizontal-timeline">
        {dateArray.map((el, globalIdx) => {
          const idx = data.indexOf(el.toISOString().split("T")[0]);
          return (
            <div
              className="breakpoint"
              style={{
                borderColor: timeDays
                  ? globalIdx % (dateArray.length / 10) === 0
                    ? "#a0a0a0"
                    : "transparent"
                  : dateArray.length > 10
                  ? globalIdx % (dateArray.length / 10) === 0
                    ? "#a0a0a0"
                    : "transparent"
                  : "#a0a0a0",
              }}
            >
              {timeDays ? (
                globalIdx % (dateArray.length / 10) === 0 ? (
                  <p>{el.toISOString().split("T")[0]}</p>
                ) : null
              ) : dateArray.length > 10 ? (
                globalIdx % (dateArray.length / 10) === 0 ? (
                  <p>{el.toISOString().split("T")[0]}</p>
                ) : null
              ) : (
                <p>{el.toISOString().split("T")[0]}</p>
              )}

              {idx > -1 && (
                <div
                  className="bp-dot"
                  style={{ background: dotColor }}
                  onClick={(e) => {
                    setSelectedBP({ name, index: idx });
                    e.stopPropagation();
                  }}
                >
                  {selectedBP.name === name && selectedBP.index === idx && (
                    <>
                      {" "}
                      <div>
                        <div
                          className="bp-details"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {events ? (
                            events.total > 0 ? (
                              <>
                                <div>
                                  <p className="title">
                                    {events.calendar_events[0].summary}
                                  </p>
                                  <p className="name">
                                    {events.calendar_events[0].organizer}
                                  </p>
                                  <p className="date">
                                    {dateI &&
                                      `${dateI.toDateString()} ${dateI.toLocaleTimeString()}`}
                                  </p>
                                  <p className="time">
                                    {hhT} {hhT > 1 ? "Hrs" : "Hr"} {mmT} Mins
                                  </p>
                                </div>
                                {events.total > 1 ? (
                                  <p
                                    onClick={() => setMore(true)}
                                    className="more"
                                  >
                                    {events.total - 1} more &darr;
                                  </p>
                                ) : null}
                              </>
                            ) : (
                              <p>No Eventes`</p>
                            )
                          ) : (
                            <ReactLoading
                              type="bars"
                              color="linear-gradient(180deg, #CAC3FF 0%, #A195F3 100%)"
                            />
                          )}
                        </div>
                      </div>
                    </>
                  )}
                  {selectedBP.name === name &&
                    selectedBP.index === idx &&
                    more && (
                      <>
                        {" "}
                        <div style={{ top: 240 }}>
                          <div
                            className="bp-details"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {events.total > 1 ? (
                              <>
                                {events.calendar_events.map((evt, idx) => {
                                  if (idx) {
                                    const dateT = new Date(evt.event_start);
                                    const dateTF = new Date(evt.event_end);
                                    if (dateTF < dateT) {
                                      dateTF.setDate(dateTF.getDate() + 1);
                                    }

                                    let diffT = dateTF - dateT;
                                    let msec = diffT;
                                    let hh = Math.floor(msec / 1000 / 60 / 60);
                                    msec -= hh * 1000 * 60 * 60;
                                    let mm = Math.floor(msec / 1000 / 60);

                                    return (
                                      <div>
                                        <p className="title">{evt.summary}</p>
                                        <p className="name">{evt.organizer}</p>
                                        <p className="date">
                                          {dateT &&
                                            `${dateT.toDateString()} ${dateT.toLocaleTimeString()}`}
                                        </p>
                                        <p className="time">
                                          {hh} {hh > 1 ? "Hrs" : "Hr"} {mm} Mins
                                        </p>
                                        <hr
                                          style={{
                                            borderTop: "dashed 0.5px #a0a0a0",
                                            margin: "20px 0",
                                          }}
                                        />
                                      </div>
                                    );
                                  } else return null;
                                })}
                                {events.remaining ? (
                                  <p onClick={fetchMoreData} className="more">
                                    {events.remaining} more &darr;
                                  </p>
                                ) : null}{" "}
                              </>
                            ) : (
                              <ReactLoading
                                type="bars"
                                color="linear-gradient(180deg, #CAC3FF 0%, #A195F3 100%)"
                              />
                            )}
                          </div>
                        </div>
                      </>
                    )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  } else if (name === "mailsent" || name === "mailrec") {
    let dateI = new Date();
    if (events && events.mails[0]) {
      dateI = new Date(events.mails[0].date);
    }
    return (
      <div className="horizontal-timeline">
        {events && showEmail !== null && events.mails[showEmail] && (
          <div
            className="email-template"
            onClick={(e) => {
              setShowEmail(null);
              e.stopPropagation();
            }}
          >
            <div className="email" onClick={(e) => e.stopPropagation()}>
              <div className="email-header">
                <h3>Email </h3>
                <FontAwesomeIcon
                  onClick={(e) => {
                    setShowEmail(null);
                    e.stopPropagation();
                  }}
                  icon={faTimesCircle}
                  style={{
                    color: "#a0a0a0",
                    cursor: "pointer",
                  }}
                />
              </div>
              <h4>{events.mails[showEmail].subject}</h4>
              <p>
                From:<span>{events.mails[showEmail].from.join(",")}</span>
              </p>
              <p>
                To:<span>{events.mails[showEmail].to.join(",")}</span>
              </p>
              <div
                className="email-content"
                dangerouslySetInnerHTML={{
                  __html: events.mails[showEmail].html_msg,
                }}
              />
            </div>
          </div>
        )}
        {dateArray.map((el, globalIdx) => {
          const idx = data.indexOf(el.toISOString().split("T")[0]);
          return (
            <div
              className="breakpoint"
              style={{
                borderColor: timeDays
                  ? globalIdx % (dateArray.length / 10) === 0
                    ? "#a0a0a0"
                    : "transparent"
                  : dateArray.length > 10
                  ? globalIdx % (dateArray.length / 10) === 0
                    ? "#a0a0a0"
                    : "transparent"
                  : "#a0a0a0",
              }}
            >
              {timeDays ? (
                globalIdx % (dateArray.length / 10) === 0 ? (
                  <p>{el.toISOString().split("T")[0]}</p>
                ) : null
              ) : dateArray.length > 10 ? (
                globalIdx % (dateArray.length / 10) === 0 ? (
                  <p>{el.toISOString().split("T")[0]}</p>
                ) : null
              ) : (
                <p>{el.toISOString().split("T")[0]}</p>
              )}

              {idx > -1 && (
                <div
                  className="bp-dot"
                  style={{ background: dotColor }}
                  onClick={(e) => {
                    setSelectedBP({ name, index: idx });
                    e.stopPropagation();
                  }}
                >
                  {selectedBP.name === name && selectedBP.index === idx && (
                    <>
                      {" "}
                      <div>
                        <div
                          className="bp-details"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {events ? (
                            events.total > 0 ? (
                              <>
                                <div
                                  onClick={(e) => {
                                    setShowEmail(0);
                                    e.stopPropagation();
                                  }}
                                >
                                  <p className="title">
                                    {events.mails[0].from}
                                  </p>
                                  <p className="name">
                                    {events.mails[0].subject}
                                  </p>
                                  <p className="date">
                                    {dateI &&
                                      `${dateI.toDateString()} ${dateI.toLocaleTimeString()}`}
                                  </p>
                                </div>
                                {events.total > 1 ? (
                                  <p
                                    onClick={() => setMore(true)}
                                    className="more"
                                  >
                                    {events.total - 1} more &darr;
                                  </p>
                                ) : null}
                              </>
                            ) : (
                              <p>No Eventes`</p>
                            )
                          ) : (
                            <ReactLoading
                              type="bars"
                              color="linear-gradient(180deg, #CAC3FF 0%, #A195F3 100%)"
                            />
                          )}
                        </div>
                      </div>
                    </>
                  )}
                  {selectedBP.index === idx && more && (
                    <>
                      {" "}
                      <div style={{ top: 200 }}>
                        <div
                          className="bp-details"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {events.total > 1 ? (
                            <>
                              {events.mails.map((evt, idx) => {
                                if (idx) {
                                  const dateT = new Date(evt.date);

                                  return (
                                    <div
                                      onClick={(e) => {
                                        setShowEmail(idx);
                                        e.stopPropagation();
                                      }}
                                    >
                                      <p className="title">{evt.from}</p>
                                      <p className="name">{evt.subject}</p>
                                      <p className="date">
                                        {dateT &&
                                          `${dateT.toDateString()} ${dateT.toLocaleTimeString()}`}
                                      </p>
                                      <hr
                                        style={{
                                          borderTop: "dashed 0.5px #a0a0a0",
                                          margin: "20px 0",
                                        }}
                                      />
                                    </div>
                                  );
                                } else return null;
                              })}
                              {events.remaining ? (
                                <p onClick={fetchMoreData} className="more">
                                  {events.remaining} more &darr;
                                </p>
                              ) : null}{" "}
                            </>
                          ) : (
                            <ReactLoading
                              type="bars"
                              color="linear-gradient(180deg, #CAC3FF 0%, #A195F3 100%)"
                            />
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
  return null;
};
