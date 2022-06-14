import React, { useContext, useEffect, useState } from "react";
import { DashboardSidebar } from "../../components/DashboardSidebar/DashboardSidebar";
import { DashboardNavbar } from "../../components/DashboardNavbar/DashboardNavbar";
import { TutorService } from "../../services/tutor.service";
import { UserContext } from "../../context/UserContext";
import { Spinner } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";

interface Props {}

export const HistoryPage = (props: Props) => {
  const { user } = useContext(UserContext);
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const toastObj = toast("Loading...", {
      autoClose: 1000,
    });
    if (user) {
      setLoading(true);
      TutorService.getTutorById(user.userId)
        .then((res) => setMeetings(res.data.tutor.meetings))
        .catch((err) => {
          console.log(err);
          toast.update(toastObj, {
            render: "Something went wrong",
            autoClose: 4000,
          });
        })
        .finally(() => setLoading(false));
    }
  }, []);
  return (
    <div>
      <ToastContainer />
      <DashboardNavbar />
      <div className="d-flex mt-5">
        <DashboardSidebar />
        <div className="w-100">
          <div className="dashboard-header">
            History {loading && <Spinner animation="border" className="ms-3" />}
          </div>
          <div className="dashboard-main">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Name</th>
                  <th scope="col">Date</th>
                  <th scope="col">Total Time</th>
                </tr>
              </thead>
              <tbody>
                {meetings.map((el: any, index) => {
                  console.log({ el });
                  return (
                    <tr key={el._id}>
                      <th scope="row">{index + 1}</th>
                      <td>{el.user ? el.user.username : "-"}</td>
                      {/* <td>{el.startTime.split("T")[0]}</td>
                      <td>{el.meetingTime} secs</td> */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
