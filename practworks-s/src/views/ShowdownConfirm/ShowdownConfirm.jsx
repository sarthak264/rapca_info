import React from "react";
import ModalWrapper from "./ShowdownConfirm.style";
import Button from "../../components/common/Button/Button";

function ShowdownConfirm({ setConfirm, onClick, message }) {
  return (
    <ModalWrapper>
      <p>{message}</p>
      <div className="btn-wrapper">
        <Button
          text="Confirm"
          onClick={() => {
            onClick();
            setConfirm(true);
          }}
        ></Button>
        <Button
          text="Cancel"
          onClick={() => {
            onClick();
            setConfirm(false);
          }}
        ></Button>
      </div>
    </ModalWrapper>
  );
}

export default ShowdownConfirm;
