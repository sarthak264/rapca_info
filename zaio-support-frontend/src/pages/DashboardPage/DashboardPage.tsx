import { Button, Spinner } from "react-bootstrap";
import "./DashboardPage.css";
import { DashboardSidebar } from "../../components/DashboardSidebar/DashboardSidebar";
import { DashboardNavbar } from "../../components/DashboardNavbar/DashboardNavbar";
import { useContext, useEffect, useState } from "react";
import { ActiveMeetingI, MeetingService } from "../../services/meeting.service";
import { useHistory } from "react-router";
import { RouteDefinitions } from "../../utils/RouteDefinitions";
import { AgoraClientContext } from "../../context/ClientAgoraContext";
import { toast, ToastContainer } from "react-toastify";
import { io } from "socket.io-client";
import { customSocket } from "../../utils/socket";
const socket = io(
  process.env.REACT_APP_SOCKET_BACKEND_URL ||
    "https://zaio-support-backend.herokuapp.com"
);

interface Props {}

export const DashboardPage = (props: Props) => {
  const [meetings, setMeetings] = useState<ActiveMeetingI[]>([]);
  const [update, setUpdate] = useState(true);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    customSocket.on("updateActiveMeetings", (message) => {
      console.log(message);
      setUpdate(true);
    });
  }, []);
  useEffect(() => {
    if (update) {
      const toastObj = toast("Loading...", {
        autoClose: 1000,
      });
      setLoading(true);
      MeetingService.getActiveMeetings()
        .then((res) => {
          console.log(res);
          setMeetings(res.data.meetings);
        })
        .catch((rej) => {
          console.error(rej);
          toast.update(toastObj, {
            render: "Something went wrong",
            autoClose: 4000,
          });
        })
        .finally(() => {
          setUpdate(false);
          setLoading(false);
        });
    }
  }, [update]);
  console.log({ meetings });
  return (
    <div>
      <ToastContainer />
      <DashboardNavbar />
      <div className="d-flex mt-5">
        <DashboardSidebar />
        <div className="w-100">
          <div className="dashboard-header">Welcome</div>
          <div className="dashboard-main">
            <div className="dashboard-subheader d-flex justify-content-between">
              <div>
                Incoming Requests
                {loading ? (
                  <Spinner animation="border" className="ms-3" />
                ) : (
                  `[${meetings.length}]`
                )}
              </div>
              <button
                className="btn btn-success ms-auto"
                onClick={() => setUpdate(true)}
              >
                <i className="bi bi-arrow-clockwise"></i>
              </button>
            </div>
            {meetings.map((meet) => (
              <IncomingRequest
                key={meet._id}
                userName={meet.meeting.user.username || ""}
                id={meet.meeting._id}
                meetingTopic={meet.meeting.meetingTopic}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const IncomingRequest = ({
  id,
  meetingTopic,
  userName,
}: {
  id: string;
  meetingTopic: string | undefined;
  userName: string;
}) => {
  const history = useHistory();
  const { setAgoraClientToken } = useContext(AgoraClientContext);
  return (
    <div className="dashboard-incoming">
      <div>
        <h5>{userName}</h5>
        <p>
          <span className="dashboard-course">Course: </span>
          {meetingTopic || "-"}
        </p>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <Button
          variant="success"
          className="me-1"
          onClick={() =>
            MeetingService.startMeeting(id)
              .then((res) => {
                console.log({ res });
                setAgoraClientToken(res.data.token);
                socket.emit("startMeeting", {
                  meetingId: res.data.meeting.meetingId,
                });
                history.push(
                  RouteDefinitions.ROUTE_VIDEO_CALL +
                    `?meetingName=${res.data.meeting.meetingName}&&meetingId=${res.data.meeting.meetingId}&uid=${res.data.meeting.uid}`
                );
              })
              .catch((err) => console.error(err))
          }
        >
          &#10003;
        </Button>
        <Button variant="danger">&#x2717; </Button>
      </div>
    </div>
  );
};
