import React from "react";
import { Modal as Modals } from "antd";
import ModalWrapper from "./Modal.style";
import closeicon from "../../../assets/images/closeicon.svg";
import DepositForm from "../../../views/DepositForm/DepositForm";
import ChangePasswordForm from "../../../views/ChangePassword/ChangePasswordForm";
import ConfirmPayment from "../../../views/Confirm Payment/ConfirmPayment";
import PaymentSuccess from "../../../views/PaymentSucess/PaymentSuccess";
import AddRemark from "../../../views/Add Remark/AddRemark";
import ContactUs from "../../../views/Contact Us/ContactUsForm";
import ModifySubscription from "views/ModifySubscription/ModifySubscription";
import MessageStudents from "views/MessageStudents/MessageStudents";
import InviteStudents from "views/InviteStudents/InviteStudents";
import MissionDetailsModal from "views/MissionDetailsModal/MissionDetailsModal";
import AwardsModal from "views/AwardsModal/AwardsModal";
import SolutionModal from "views/SolutionModal/SolutionModal";
import ShowdownConfirm from "views/ShowdownConfirm/ShowdownConfirm";
import QrModal from "views/QrModal/QrModal";

export default function Modal(props) {
  let {
    isOpen,
    toggle,
    title,
    width,
    selectedRowKeys,
    modalData,
    ytLinks,
    setConfirm,
    message,
  } = props;

  return (
    <ModalWrapper>
      <Modals
        title={title}
        visible={isOpen}
        onCancel={toggle}
        centered
        closeIcon={<img src={closeicon} alt="close" height="28" />}
        footer={null}
        width={width || 400}
        destroyOnClose={true}
      >
        {title === "Deposit" ? (
          <DepositForm onClick={toggle} />
        ) : title === "Change Password" ? (
          <ChangePasswordForm onClick={toggle} />
        ) : title === "Confirm Payment" ? (
          <ConfirmPayment onClick={toggle} />
        ) : title === "Payment Successfully Done" ? (
          <PaymentSuccess onClick={toggle} />
        ) : title === "Add Remark" ? (
          <AddRemark onClick={toggle} />
        ) : title === "Contact Us" ? (
          <ContactUs onClick={toggle} />
        ) : title === "Modify Subscription" ? (
          <ModifySubscription onClick={toggle} />
        ) : title === "Message" ? (
          <MessageStudents onClick={toggle} selectedRowKeys={selectedRowKeys} />
        ) : title === "Invite Students" ? (
          <InviteStudents onClick={toggle} />
        ) : title === "Mission Detail" ? (
          <MissionDetailsModal onClick={toggle} modalData={modalData} />
        ) : title === "Awards and Ranks" ? (
          <AwardsModal onClick={toggle} />
        ) : title === "Solutions" ? (
          <SolutionModal onClick={toggle} ytLinks={ytLinks} />
        ) : title === "Showdown confirm" ? (
          <ShowdownConfirm
            onClick={toggle}
            setConfirm={setConfirm}
            message={message}
          />
        ) : title === "Scan to Submit" ? (
          <QrModal onClick={toggle} setConfirm={setConfirm} />
        ) : (
          ""
        )}
      </Modals>
    </ModalWrapper>
  );
}
