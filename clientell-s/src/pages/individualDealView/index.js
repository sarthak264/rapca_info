import React, { useEffect, useState } from "react";
import Video from "../../assets/svg/video.svg";
import Attach from "../../assets/svg/attach.svg";

import "./index.less";
import GoogleAPIService from "../../services/googleAPI.service";
import { HorizontalTimeline } from "../../components/horizontalTimeline";
import { OpportunitiesAPI } from "../../services/opportunitiesAPI.service";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
export const IndividualDealView = () => {
  const { id } = useParams();
  const [active, setActive] = useState(0);
  const [calendarEventDates, setCalendarEventDates] = useState([]);
  const [calendarSentMailDates, setCalendarSentMailDates] = useState([]);
  const [calendarRecMailDates, setCalendarRecMailDates] = useState([]);
  const [selectedBP, setSelectedBP] = useState({ name: null, index: null });
  const [dealDetails, setDealDetails] = useState(null);
  const [rangeForAllOption, setRangeForAllOption] = useState(null);
  const history = useHistory();
  const isUserLoggedIn = useSelector((state) => state.auth);
  axios.interceptors.request.use(function (config) {
    const token = isUserLoggedIn.token;
    config.headers.Authorization = `Token ${token}`;

    return config;
  });
  useEffect(() => {
    OpportunitiesAPI.getOpprtunityById(id).then((res) => {
      setDealDetails(res.data.deal);
    });
  }, []);
  useEffect(() => {
    const query = new URLSearchParams(history.location.search);
    const accountId = query.get("account_Id");
    const date_to = new Date();
    let date_from = new Date();

    date_from.setDate(date_to.getDate() - active);
    GoogleAPIService.getMeetingDates({
      date_from: active ? date_from.toISOString().split("T")[0] : null,
      date_to: active ? date_to.toISOString().split("T")[0] : null,
      sort: "asc",
      accountId,
    }).then((res1) => {
      setCalendarEventDates(res1.data.dates);
      GoogleAPIService.getMailDates({
        date_from: active ? date_from.toISOString().split("T")[0] : null,
        date_to: active ? date_to.toISOString().split("T")[0] : null,
        sort: "asc",
        has_mail_sent: true,
        accountId,
      }).then((res2) => {
        setCalendarSentMailDates(res2.data.dates);
        GoogleAPIService.getMailDates({
          date_from: active ? date_from.toISOString().split("T")[0] : null,
          date_to: active ? date_to.toISOString().split("T")[0] : null,
          sort: "asc",
          has_mail_sent: false,
          accountId,
        }).then((res3) => {
          setCalendarRecMailDates(res3.data.dates);
          if (active === 0) {
            const dateI1 = new Date(res1.data.dates[0]);
            const dateI2 = new Date(res2.data.dates[0]);
            const dateI3 = new Date(res3.data.dates[0]);
            let lowestDate = dateI1;
            if (lowestDate > dateI2) {
              lowestDate = dateI2;
            }
            if (lowestDate > dateI3) {
              lowestDate = dateI3;
            }

            const dateF1 = new Date(res1.data.dates.at(-1));
            const dateF2 = new Date(res2.data.dates.at(-1));
            const dateF3 = new Date(res3.data.dates.at(-1));
            let highestDate = dateF1;
            if (highestDate < dateF2) {
              highestDate = dateF2;
            }
            if (highestDate < dateF3) {
              highestDate = dateF3;
            }
            setRangeForAllOption({
              start: lowestDate,
              end: highestDate,
            });
          }
        });
      });
    });
  }, [active]);
  const filterDates = [
    {
      title: "7 days",
      value: 7,
    },
    {
      title: "2 weeks",
      value: 14,
    },
    {
      title: "1 month",
      value: 30,
    },
    {
      title: "2 month",
      value: 60,
    },
    {
      title: "6 months",
      value: 360,
    },
    {
      title: "All",
      value: 0,
    },
  ];
  const chartRows = [
    {
      icon: Video,
      title: "Meetings",
      data: calendarEventDates,
      name: "meetings",
      color: "#F2994A",
    },
    {
      icon: Attach,
      title: "Mails Sent",
      data: calendarSentMailDates,
      name: "mailsent",
      color: "#F5483F",
    },
    {
      icon: Attach,
      title: "Mails Received",
      data: calendarRecMailDates,
      name: "mailrec",
      color: "#56CCF2",
    },
  ];
  return (
    <div
      className="individualdealview"
      onClick={(e) => {
        setSelectedBP({ index: null, name: null });
        e.stopPropagation();
      }}
    >
      <div className="dealvieworgnotes">
        <p className="pageheader">Deal View</p>
        <div className="headerbuttondiv">
          <button className="orgstructbutton">Org. Structure</button>
          &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
          <button className="primary-button">Notes</button>
        </div>
      </div>
      <div className="pagebody">
        <div className="toolnamerow">
          <div className="dot"></div>
          <p className="toolname">{dealDetails?.account_name}</p>
        </div>
        <div className="highlight">
          <h4>
            Contacts linked to this opportunity : (
            {dealDetails && dealDetails.deal_contacts.length} Contacts){" "}
          </h4>
          <p>
            {dealDetails &&
              dealDetails.deal_contacts.map((el) => el.email).join(", ")}
          </p>
        </div>
        <div className="details">
          {dealDetails &&
            Object.keys(dealDetails).map((key) => {
              let value = dealDetails[key];
              if (key === "deal_contacts") {
                return null;
              }
              if (key === "deal_close_date" || key === "deal_created_date") {
                value = value.split("T")[0];
              }
              return (
                <div className="item">
                  <p className="title">
                    {key
                      .split("_")
                      .map((t) => t.charAt(0).toUpperCase() + t.slice(1))
                      .join(" ")}
                  </p>
                  <p className="value">{value}</p>
                </div>
              );
            })}
        </div>
        <div className="moredetails">
          <div className="item">
            <p className="title">
              Next Meeting
              {" :"}
            </p>
            <p className="value">4 Days</p>
          </div>

          <div className="item">
            <p className="title">
              Last Prospect Engagement
              {" :"}
            </p>
            <p className="value">3 days ago</p>
          </div>
        </div>
        <div className="chart-options">
          {filterDates.map((fltrData) => (
            <button
              onClick={(e) => setActive(fltrData.value)}
              className={active === fltrData.value && "chart-options-active"}
            >
              {fltrData.title}
            </button>
          ))}
          {/* <button
            onClick={(e) => setActive("all")}
            className={active === "all" && "chart-options-active"}
          >
            All
          </button> */}
        </div>
        {active === 0 && !rangeForAllOption ? null : (
          <div className="prospect-eng">
            <p className="title">Prospect Engagement</p>
            {chartRows.map((rowT) => (
              <div className="prospect-eng-row">
                <div className="prespect-eng-title">
                  <div
                    className="prospect-eng-row-icon"
                    style={{ backgroundColor: rowT.color }}
                  >
                    <img src={rowT.icon} alt="Video" />
                  </div>
                  {rowT.title}
                </div>
                <HorizontalTimeline
                  rangeForAllOption={
                    active === 0 && rangeForAllOption
                      ? {
                          start: rangeForAllOption.start,
                          end: rangeForAllOption.end,
                        }
                      : null
                  }
                  timeDays={active}
                  selectedBP={selectedBP}
                  data={rowT.data}
                  setSelectedBP={setSelectedBP}
                  name={rowT.name}
                  dotColor={rowT.color}
                />
              </div>
            ))}
            <div className="prospect-eng-row">
              <div className="prespect-eng-title">
                <div
                  className="prospect-eng-row-icon"
                  style={{ backgroundColor: "purple" }}
                >
                  <img src={Attach} alt="Video" />
                </div>
                Stage
              </div>
              <div
                style={{
                  width: "100%",
                  height: 20,
                  color: "#a0a0a0",
                  backgroundColor: "#f1f1f1",
                  textAlign: "center",
                  padding: 5,
                }}
              >
                No Stage Assigned
              </div>
            </div>
          </div>
        )}
        <button className="primary-button">INSIGHTS</button>
        <div className="insights">
          <DealViewTag
              primaryText={"Buying Intent"}
              secondaryText={": High Score 87"}
              description={""}
              primaryColor={"#1EC86A"}
              secondaryColor={"#EBFFF4"}
          />
            <DealViewTag
                primaryText={"High Conversion"}
                secondaryText={"rate in similar profiles"}
                description={""}
                primaryColor={"#1EC86A"}
                secondaryColor={"#EBFFF4"}
            />
            <DealViewTag
                primaryText={"Sentiment analysis"}
                secondaryText={"score communication: 84"}
                description={""}
                primaryColor={"#1EC86A"}
                secondaryColor={"#EBFFF4"}
            />
            <DealViewTag
                primaryText={"Customer Profiles"}
                secondaryText={"that negatively impact calculated fit score: 18"}
                description={""}
                primaryColor={"#F5483F"}
                secondaryColor={"#FFF1EB"}
            />
            <DealViewTag
                primaryText={"Sentiment analysis"}
                secondaryText={"score based on feedbacks : 23"}
                description={""}
                primaryColor={"#F5483F"}
                secondaryColor={"#FFF1EB"}
            />
            <DealViewTag
                primaryText={"Current Quarter"}
                secondaryText={"opportunity prediction : 37"}
                description={""}
                primaryColor={"#F5483F"}
                secondaryColor={"#FFF1EB"}
            />
        </div>
        <button className="primary-button">NUDGES</button>
        <div className="insights">
            <DealViewTag
                primaryText={""}
                description={"Customer Profiles that negetively impact calculated fit score : 18"}
                primaryColor={"#bebebe"}
                secondaryColor={"#f8f8f8"}
                textColor={"#000000"}

            />
            <DealViewTag
                primaryText={""}
                description={"Contract not send"}
                primaryColor={"#bebebe"}
                secondaryColor={"#f8f8f8"}
                textColor={"#000000"}

            />
            <DealViewTag
                primaryText={""}
                description={"Mails not responded"}
                primaryColor={"#bebebe"}
                secondaryColor={"#f8f8f8"}
                textColor={"#000000"}

            />
        </div>
        <button className="primary-button">CLIENTS INSIGHTS</button>
        <div className="row">
          <div className="clients-insights">
              <DealViewTag
                  primaryText={"Raised Funding"}
                  secondaryText={": 2021 total amount raised"}
                  primaryColor={"#bebebe"}
                  secondaryColor={"#f8f8f8"}
                  textColor={"#000000"}
              />
              <DealViewTag
                  primaryText={"Company downsized by 50%"}
                  secondaryText={"recently"}
                  primaryColor={"#bebebe"}
                  secondaryColor={"#f8f8f8"}
                  textColor={"#000000"}
              />
              <DealViewTag
                  primaryText={"Company revenue"}
                  secondaryText={"this quarter $157.5M"}
                  primaryColor={"#bebebe"}
                  secondaryColor={"#f8f8f8"}
                  textColor={"#000000"}
              />
          </div>
          <div style={{ maxWidth: "40%" }}>
            <div className="subheading">Clients News</div>
            <NewsWidget
              imgUrl={
                "https://pentagram-production.imgix.net/618d5092-a542-4dae-bd27-a3afb4bcc12d/mb_slack_01.jpg?crop=edges&fit=crop&h=630&rect=0%2C74%2C3000%2C1872&w=1200"
              }
              title="Slack's latest feature sparks company apology just after one day"
              desc={
                "The company said that it may take upto 24 hrs for the fix to reach the users as it is a DNS-Related issue."
              }
            />
            <NewsWidget
              imgUrl={
                "https://pentagram-production.imgix.net/618d5092-a542-4dae-bd27-a3afb4bcc12d/mb_slack_01.jpg?crop=edges&fit=crop&h=630&rect=0%2C74%2C3000%2C1872&w=1200"
              }
              title="Slack's latest feature sparks company apology just after one day"
              desc={
                "The company said that it may take upto 24 hrs for the fix to reach the users as it is a DNS-Related issue."
              }
            />
            <NewsWidget
              imgUrl={
                "https://pentagram-production.imgix.net/618d5092-a542-4dae-bd27-a3afb4bcc12d/mb_slack_01.jpg?crop=edges&fit=crop&h=630&rect=0%2C74%2C3000%2C1872&w=1200"
              }
              title="Slack's latest feature sparks company apology just after one day"
              desc={
                "The company said that it may take upto 24 hrs for the fix to reach the users as it is a DNS-Related issue."
              }
            />
          </div>
        </div>
        <button className="primary-button">INDUSTRY INSIGHTS</button>

        <div className="row">
            <div className="clients-insights">
                <DealViewTag
                    secondaryText={"Microsoft Testing Teams 2.0 With New Messaging Feature on Windows 11"}
                    primaryColor={"#bebebe"}
                    secondaryColor={"#f8f8f8"}
                    textColor={"#000000"}

                />
                <DealViewTag
                    secondaryText={"Your internal communication is the cornerstone of your organization."}
                    primaryColor={"#bebebe"}
                    secondaryColor={"#f8f8f8"}
                    textColor={"#000000"}

                />
                <DealViewTag
                    secondaryText={"Microsoft Teams to Get 'Top Hits' Feature to Improve Search Functions"}
                    primaryColor={"#bebebe"}
                    secondaryColor={"#f8f8f8"}
                    textColor={"#000000"}

                />
                <DealViewTag
                    secondaryText={"The demand for cloud communication platforms is at an all-time high. "}
                    primaryColor={"#bebebe"}
                    secondaryColor={"#f8f8f8"}
                    textColor={"#000000"}

                />

                <DealViewTag
                    secondaryText={"G Meet & Chat now comes Preinstalled on Chromebooks for Wider Adoption"}
                    primaryColor={"#bebebe"}
                    secondaryColor={"#f8f8f8"}
                    textColor={"#000000"}

                />

                <DealViewTag
                    secondaryText={"Communication Platform Market Size to Outstrip $22,408.5Mn by 2028"}
                    primaryColor={"#bebebe"}
                    secondaryColor={"#f8f8f8"}
                    textColor={"#000000"}

                />
            </div>
            <div style={{maxWidth: "40%"}}>
                <div className="subheading">Industry News</div>
                <NewsWidget
                    imgUrl={
                        "https://pentagram-production.imgix.net/618d5092-a542-4dae-bd27-a3afb4bcc12d/mb_slack_01.jpg?crop=edges&fit=crop&h=630&rect=0%2C74%2C3000%2C1872&w=1200"
                    }
                    title="Slack's latest feature sparks company apology just after one day"
              desc={
                "The company said that it may take upto 24 hrs for the fix to reach the users as it is a DNS-Related issue."
              }
            />
            <NewsWidget
              imgUrl={
                "https://pentagram-production.imgix.net/618d5092-a542-4dae-bd27-a3afb4bcc12d/mb_slack_01.jpg?crop=edges&fit=crop&h=630&rect=0%2C74%2C3000%2C1872&w=1200"
              }
              title="Slack's latest feature sparks company apology just after one day"
              desc={
                "The company said that it may take upto 24 hrs for the fix to reach the users as it is a DNS-Related issue."
              }
            />
            <NewsWidget
              imgUrl={
                "https://pentagram-production.imgix.net/618d5092-a542-4dae-bd27-a3afb4bcc12d/mb_slack_01.jpg?crop=edges&fit=crop&h=630&rect=0%2C74%2C3000%2C1872&w=1200"
              }
              title="Slack's latest feature sparks company apology just after one day"
              desc={
                "The company said that it may take upto 24 hrs for the fix to reach the users as it is a DNS-Related issue."
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const DealViewTag = ({
  primaryText,
  secondaryText,
  description,
  primaryColor,
  secondaryColor,
                         textColor
}) => {
  return (
    <div
      className="dealviewtag"
      style={{
          backgroundColor: secondaryColor,
          borderColor: primaryColor,
          color: textColor ? textColor : primaryColor,
      }}
    >
      <div className="row1">
        <p className="primary-text">{primaryText}</p>
        <p className="secondary-text">
            {secondaryText && ` ${secondaryText}`}
        </p>
      </div>
      <p>{description}</p>
    </div>
  );
};

const NewsWidget = ({ imgUrl, title, desc }) => {
  return (
    <div className="news-widget">
      <img src={imgUrl} width={70} height={50} alt="News providerlogo" />
      <div>
        <h4>{title}</h4>
        <p>{desc}</p>
      </div>
    </div>
  );
};
