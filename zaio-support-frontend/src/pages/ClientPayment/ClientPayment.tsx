import React, { useEffect, useState } from "react";
import "./ClientPayment.css";
import Zaio from "../../assets/images/visa.png";
import styles from "./Payment.module.css";
import { ClientNavbar } from "../../components/ClientNavbar/ClientNavbar";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { PaymentService } from "../../services/payment.service";
import { useHistory } from "react-router-dom";
import { RouteDefinitions } from "../../utils/RouteDefinitions";
import { toast } from "react-toastify";

export function ClientPayment() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({ html: "" });
  const [data, setData] = useState({
    paymentBrand: "visa",
    cardNumber: "4111111111111111",
    cardHolder: "aksh",
    expiryMonth: "05",
    expiryYear: "2025",
    redirectUrl: "http://localhost:3000/client-payment",
    cvv: "123",
  });
  const queries = new URLSearchParams(history.location.search);

  console.log({ history });
  useEffect(() => {
    const funct = async () => {
      console.log(queries.get("id"));
      if (queries.get("id")) {
        setLoading(true);
        console.log("checking Payment");
        PaymentService.checkPaymentStatus()
          .then((res) => {
            if (res.status === 200) {
              history.push(RouteDefinitions.ROUTE_CLIENT_DASHBOARD);
            } else if (res.status === 204) {
              history.push(RouteDefinitions.ROUTE_CLIENT_PAYMENT);
            }
          })
          .catch(() => {
            toast.error(
              "Please re-check if your card is valid, has enough balance or enter your card details correctly."
            );
            history.push(RouteDefinitions.ROUTE_CLIENT_PAYMENT);
          })
          .finally(() => setLoading(false));
      }
    };
    funct();
  }, []);

  const setValue = (key: string, value: string) => {
    console.log(key, value);
    setData({ ...data, [key]: value });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (
      data.cardNumber !== "" &&
      data.cardHolder !== "" &&
      data.cvv !== "" &&
      data.expiryMonth !== "" &&
      data.expiryYear !== ""
    ) {
      await PaymentService.makePayment(data)
        .then((res) => setResponse(res.data))
        .catch((err) => console.log(err));
    }
    setLoading(false);
  };
  if (queries.get("id")) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation={"border"} />
      </div>
    );
  }
  if (response.html !== "")
    return (
      <>
        <ClientNavbar />
        <div className="d-flex text-center justify-content-center align-items-center flex-column mt-5">
          <div className="m-5">
            Please click below to add you Credit/Debit card.
          </div>
          <div dangerouslySetInnerHTML={{ __html: response.html }} />
        </div>
      </>
    );
  return (
    <>
      {" "}
      <ClientNavbar />
      <div className="page">
        <Form
          className={"p-4 col-12 col-md-6 mt-4 " + styles.formp1}
          onSubmit={onSubmit}
        >
          <div className="h5">
            Pay with Debit/Credit card <img src={Zaio} alt=" Visa Master" />
          </div>
          {/*  */}
          {/* <Form.Group>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                        className={styles.input_field} 
                        type="text" 
                        value={data.amount+".00 ZAR"}
                        disabled/>
                </Form.Group> */}

          <Form.Group>
            <Form.Label className={styles.form_label}>Name on card</Form.Label>
            <Form.Control
              className={styles.input_field}
              type="text"
              placeholder="Enter Name"
              value={data.cardHolder}
              onChange={(e) => setValue("cardHolder", e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label className={styles.form_label}>Card Number</Form.Label>
            <Form.Control
              className={styles.input_field}
              type="number"
              placeholder="Enter Number"
              value={data.cardNumber}
              onChange={(e) => setValue("cardNumber", e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label className={styles.form_label}>Card Type</Form.Label>
            <Form.Control
              className={styles.input_field}
              as="select"
              value={data.paymentBrand}
              onChange={(e) => setValue("paymentBrand", e.target.value)}
            >
              <option value="visa">VISA</option>
              <option value="mastercard">MASTERCARD</option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label className={styles.form_label}>Expiry Date</Form.Label>
            <Row>
              <Col>
                <Form.Control
                  className={styles.input_field}
                  type="number"
                  placeholder="03 - Expiry Month"
                  value={data.expiryMonth}
                  onChange={(e) => setValue("expiryMonth", e.target.value)}
                />
              </Col>
              <Col>
                <Form.Control
                  className={styles.input_field}
                  type="number"
                  placeholder="2021 - Expiry Year"
                  value={data.expiryYear}
                  onChange={(e) => setValue("expiryYear", e.target.value)}
                />
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className="w-25">
            <Form.Label className={styles.form_label}>CVV</Form.Label>
            <Form.Control
              className={styles.input_field}
              type="password"
              placeholder="CVV"
              value={data.cvv}
              onChange={(e) => setValue("cvv", e.target.value)}
            />
          </Form.Group>
          <Button className="submit mt-5" type="submit" disabled={loading}>
            Submit Payment
          </Button>
        </Form>
      </div>
    </>
  );
}
