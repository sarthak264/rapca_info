import React from "react";
import Button from "../../components/common/Button/Button";
import Modal from "../../components/common/Modal/Modal";
import PaymentImage from "../../assets/images/label.svg";

export default function PaymentSuccess(props) {
  return (
    <div className="text-center">
      <img src={PaymentImage} alt="loading..." height={100} />
      <div className="Monts-Medium light-blue fs-18 ptb-10">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry’s standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen.
      </div>
      <div className="pt-10">
        <Button
          text="Okay"
          onClick={() => {
            props.onClick();
          }}
          width={300}
        ></Button>
      </div>
    </div>
  );
}
