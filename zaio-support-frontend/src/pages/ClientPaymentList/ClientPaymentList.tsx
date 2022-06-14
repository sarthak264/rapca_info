import React, { useContext, useEffect, useState } from "react";
import { ClientSidebar } from "../../components/ClientSidebar/ClientSidebar";
import { ClientNavbar } from "../../components/ClientNavbar/ClientNavbar";
import { ClientService } from "../../services/client.service";
import { UserContext } from "../../context/UserContext";
import { Spinner } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";

interface Props {}

export const ClientPaymentList = (props: Props) => {
  const { user } = useContext(UserContext);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const toastObj = toast("Loading...", {
      autoClose: 1000,
    });
    if (user) {
      setLoading(true);
      //   console.log(user.userId);
      ClientService.getClientById(user.userId)
        .then((res) => {
          setPayments(res.data.client.payments);
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
  //   useEffect(() => {
  //     console.log(payments);
  //   }, [payments]);
  return (
    <div>
      <ToastContainer />
      <ClientNavbar />
      <div className="d-flex mt-5">
        <ClientSidebar />
        <div className="w-100">
          <div className="dashboard-header">
            Payments List{" "}
            {loading && <Spinner animation="border" className="ms-3" />}
          </div>
          <div className="dashboard-main">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Amount Paid</th>
                  <th scope="col">Meeting Time Paid</th>
                  <th scope="col">Payment Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((el: any, index) => {
                  let date = el.paymentdate;
                  date = new Date(date);
                  date = date.toLocaleDateString();
                  return (
                    <tr key={el._id}>
                      <th scope="row">{el._id}</th>
                      <td>{el.amountPaid}</td>
                      <td>{el.meetingTimePaid}</td>
                      <td>{date}</td>
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
