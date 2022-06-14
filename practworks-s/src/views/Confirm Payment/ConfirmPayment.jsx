import { message } from "antd";
import StudentServices from "api/StudentServices";
import React, { useState } from "react";
import Button from "../../components/common/Button/Button";
import Modal from "../../components/common/Modal/Modal";
import { useDispatch } from "react-redux";
import AuthActions from "redux/auth/actions";
import AuthServices from "api/AuthServices";
const { userData } = AuthActions;

export default function ConfirmPayment(props) {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();

  const toggle = () => {
    setModal(!modal);
  };

  const subscribeHandler = () => {
    StudentServices.subscribe().then((res) => {
      if (res.data.status === 0) {
        message.error(res.data.message);
        props.onClick();
      } else {
        window.open(res.data.data.subscription_url, "_blank");
        AuthServices.view().then((res) => {
          dispatch(
            userData({
              firstName: res.data.data.first_name,
              lastName: res.data.data.last_name,
              image: res.data.data.profile_photo,
              data: res.data.data,
            })
          );
        });
        props.onClick();
        // toggle();
      }
    });
  };

  return (
    <div className="text-center">
      <div className=" Monts-Medium fs-14 " style={{ color: "#898989" }}>
        <ul className="pt-10 text-left">
          <li className="fs-12 Monts-SemiBold color pb-10">
            Unlimited access and evaluation to both ICSE and CBSE multiple
            choice questions for Revise topics with immediate feedback
          </li>
          <li className="fs-12 Monts-SemiBold color">
            Unlimited practicing and evaluation of PractWorks missions
          </li>
          <li className="fs-12 Monts-SemiBold color ptb-10">
            Unlimited eligibility for Showdowns based on the practice
          </li>
          <li className="fs-12 Monts-SemiBold color ptb-10">
            Earn various rewards for your practice
          </li>
          <li className="fs-12 Monts-SemiBold color ptb-10">
            Subscription is renewed every month that can be cancelled.
          </li>
        </ul>
      </div>
      <div className="Monts-SemiBold dark-blue fs-20 ptb-10">
        Rs. 599/- every month excluding taxes
      </div>
      <div className="pt-10">
        <Button
          text="Confirm Payment"
          onClick={() => {
            subscribeHandler();
          }}
          width={300}
        ></Button>
      </div>
      <Modal
        isOpen={modal}
        toggle={toggle}
        title="Payment Successfully Done"
        width={500}
      />
    </div>
  );
}
