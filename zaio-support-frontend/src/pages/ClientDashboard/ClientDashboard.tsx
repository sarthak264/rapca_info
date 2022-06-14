import {
  Spinner,
  Card,
  ListGroup,
  ListGroupItem,
  Button,
} from "react-bootstrap";
import "./ClientDashboard.css";
import { ClientSidebar } from "../../components/ClientSidebar/ClientSidebar";
import { ClientNavbar } from "../../components/ClientNavbar/ClientNavbar";
import { useContext, useEffect, useState } from "react";
import { ClientService } from "../../services/client.service";
import { toast, ToastContainer } from "react-toastify";
import { UserContext } from "../../context/UserContext";
import { PaymentService } from "../../services/payment.service";

interface Props {}

export const ClientDashboard = (props: Props) => {
  const [update, setUpdate] = useState(true);
  interface cardsInterface {
    clientId: string;
    clientSecret: string;
    createdAt: string;
    email: string;
    username: string;
    meetings: Array<Object>;
    redirectUrl: string;
    updatedAt: string;
    websiteUrl: string;
    unpaidMeetingTime: string;
    cards: Array<Object>;
  }
  const [data, setData] = useState<cardsInterface>();
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (update) {
      const toastObj = toast("Loading...", {
        autoClose: 1000,
      });
      if (user) {
        setLoading(true);
        console.log(user.userId);
        ClientService.getClientById(user.userId)
          .then((res) => {
            console.log(res.data.client);
            setData(res.data.client);
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
    }
  }, [update]);
  return (
    <div>
      <ToastContainer />
      <ClientNavbar />
      <div className="d-flex mt-5">
        <ClientSidebar />
        <div className="w-100">
          <div className="client-dashboard-header">
            Client Dashboard
            {loading && <Spinner animation="border" className="ms-3" />}
          </div>

          {data && (
            <div className="client-dashboard-main">
              <Card className="client-details">
                <Card.Header>Unpaid Meeting Time</Card.Header>
                <Card.Body>{data.unpaidMeetingTime}</Card.Body>
              </Card>
              <Card className="client-details">
                <Card.Header>Email</Card.Header>
                <Card.Body>{data.email}</Card.Body>
              </Card>
              <Card className="client-details">
                <Card.Header>Client ID</Card.Header>
                <Card.Body>{data.clientId}</Card.Body>
              </Card>
              <Card className="client-details">
                <Card.Header>Client Secret</Card.Header>
                <Card.Body>{data.clientSecret}</Card.Body>
              </Card>
              <Card className="client-details">
                <Card.Header>Card Number</Card.Header>
                <Card.Body>
                  {data.cards.map((card: any) => {
                    console.log(card.cardNumber);
                    return (
                      <div className="column">
                        <div className="number d-flex justtify-content-center align-items-center">
                          <p className="mb-0">
                            XXXX - XXXX - XXXX - {card.cardNumber}
                          </p>
                          <Button
                            variant="primary"
                            className="m-2"
                            onClick={() => {
                              const toastObj = toast("Loading...", {
                                autoClose: false,
                              });
                              PaymentService.oneClickPayment({
                                cardSno: card.cardSno,
                              })
                                .then((res) => {
                                  toast.update(toastObj, {
                                    render: "Success",
                                    autoClose: 4000,
                                  });
                                })
                                .catch(() =>
                                  toast.update(toastObj, {
                                    render: "Failed",
                                    autoClose: 4000,
                                  })
                                );
                            }}
                          >
                            Pay Now
                          </Button>
                        </div>
                        {/* <div className="time"></div> */}
                        {/* <div className="email">
                          <p className="mb-0">{card.email}</p>
                        </div>
                        <div className="time"></div> */}
                      </div>
                    );
                  })}
                </Card.Body>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
