import React, { useContext, useEffect, useState } from "react";
import { ClientSidebar } from "../../components/ClientSidebar/ClientSidebar";
import { ClientNavbar } from "../../components/ClientNavbar/ClientNavbar";
import { ClientService } from "../../services/client.service";
import { UserContext } from "../../context/UserContext";
import { Spinner } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";

interface Props {}

export const MeetingsPage = (props: Props) => {
  const { user } = useContext(UserContext);
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const toastObj = toast("Loading...", {
      autoClose: 1000,
    });
    if (user) {
      setLoading(true);
      console.log(user.userId);
      ClientService.getClientById(user.userId)
        .then((res) => {
          console.log(res.data.client);
          setMeetings(res.data.client.meetings);
        })
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
  useEffect(() => {
    console.log(meetings);
  }, [meetings]);
  return (
    <div>
      <ToastContainer />
      <ClientNavbar />
      <div className="d-flex mt-5">
        <ClientSidebar />
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
                  //   console.log({ el });
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
