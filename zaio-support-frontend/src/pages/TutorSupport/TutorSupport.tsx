import React, { useContext, useEffect, useState } from "react";
import "./TutorSupport.css";
import { Accept } from "../../assets/accept";
import { Connect } from "../../assets/connect";
import { Search } from "../../assets/search";
import { MeetingService } from "../../services/meeting.service";
import { useHistory } from "react-router";
import { RouteDefinitions } from "../../utils/RouteDefinitions";
import { AgoraClientContext } from "../../context/ClientAgoraContext";
import { toast, ToastContainer } from "react-toastify";
import { customSocket } from "../../utils/socket";

export const TutorSupport = () => {
  const [active, setActive] = useState(0);
  const history = useHistory();
  const [meetingData, setMeetingData] = useState<any>(null);
  const { setAgoraClientToken } = useContext(AgoraClientContext);
  useEffect(() => {
    const toastObj = toast("Loading...", {
      autoClose: 1000,
    });
    const query = new URLSearchParams(history.location.search);
    const meetingTopic = query.get("meetingTopic");

    MeetingService.createMeeting(meetingTopic || "")
      .then((res) => {
        setActive(1);
        setAgoraClientToken(res.data.token);
        setMeetingData(res.data);
        customSocket.emit("createMeeting", {
          meetingId: res.data.meeting.meetingId,
        });
        customSocket.on("tutorJoined", (message) => {
          console.log({ message, res });
          setTimeout(() => {
            setActive(2);
            history.push(
              RouteDefinitions.ROUTE_VIDEO_CALL +
                `?meetingName=${res.data.meeting.meetingName}&meetingId=${res.data.meeting.meetingId}&uid=${res.data.meeting.uid}&type=user`
            );
          }, 2000);
        });
        // setTimeout(() => {
        //   history.push(
        //     RouteDefinitions.ROUTE_VIDEO_CALL +
        //       `?meetingName=${res.data.meeting.meetingName}&meetingId=${res.data.meeting.meetingId}&uid=${res.data.meeting.uid}&type=user`
        //   );
        // }, 2000);
      })
      .catch((rej) => {
        console.error(rej);
        toast.update(toastObj, {
          render: "Something went wrong",
          autoClose: 4000,
        });
      });
  }, []);
  return (
    <div className="h-100 w-100">
      <ToastContainer />
      <div className="m-auto mt-5 ts-heading">
        Welcome to Zaio Tutor Support
      </div>
      <div className="ts-loaders mx-auto">
        <Loader
          Icon={Search}
          title="Finding an available tutor"
          active={active === 0}
        />
        <Loader
          Icon={Accept}
          title="Waiting for tutor to accept"
          active={active === 1}
        />
        <Loader
          Icon={Connect}
          title="Connecting you to tutor"
          active={active === 2}
        />
      </div>
      <button className="btn btn-outline-dark m-auto d-block mt-5">
        Cancel
      </button>
    </div>
  );
};

const Loader = ({
  Icon,
  title,
  active,
}: {
  Icon: any;
  title: string;
  active?: boolean;
}) => {
  return (
    <div
      className="ts-loader"
      style={{ color: active ? "#0D1E3A" : "#CDCECF" }}
    >
      <div className={active ? "ts-loader-icon-wrapper" : ""}>
        <div
          className={`ts-loader-icon ${
            active ? "ts-loader-icon-active" : "ts-loader-icon-non"
          }`}
        >
          <Icon fill={active ? "#6e31f9" : "#CDCECF"} />
        </div>
      </div>
      {title}
    </div>
  );
};
