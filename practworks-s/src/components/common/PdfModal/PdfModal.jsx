import React, { useEffect } from "react";
import { Modal as Modals } from "antd";
import ModalWrapper from "./pdfModal.style";
import closeicon from "../../../assets/images/closeicon.svg";
import CurrentMissionModal from "views/CurrentMissionModal/CurrentMissionModal";

function PdfModal(props) {
  let {
    isOpen,
    toggle,
    title,
    width,
    heading,
    pdf,
    buttons,
    thirdButton,
    ytLinks,
  } = props;
  useEffect(() => {
    document.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  }, []);

  return (
    <ModalWrapper>
      <Modals
        title={heading}
        visible={isOpen}
        onCancel={toggle}
        centered
        closeIcon={<img src={closeicon} alt="close" height="28" />}
        footer={null}
        width={width || "auto"}
        destroyOnClose={true}
      >
        {title === "Current Mission" ? (
          <CurrentMissionModal
            pdf={pdf}
            toggle={toggle}
            buttons={buttons}
            thirdButton={thirdButton}
            ytLinks={ytLinks}
          />
        ) : (
          ""
        )}
      </Modals>
    </ModalWrapper>
  );
}

export default PdfModal;
