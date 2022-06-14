import React, { useState, useEffect } from "react";
import Button from "../../components/common/Button/Button";
import { Document, Page } from "react-pdf";
import ModalWrapper from "./CurrentMissionModal.style";
import { useMediaQuery } from "react-responsive";
import Modal from "components/common/Modal/Modal";
import QRCode from "react-qr-code";

function CurrentMissionModal({ pdf, buttons, thirdButton, ytLinks, toggle }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const Mobile = useMediaQuery({ query: "(max-width: 426px)" });
  const Tablet = useMediaQuery({ query: "(max-width: 768px)" });
  const SmallDesktop = useMediaQuery({ query: "(max-width: 991px)" });
  const BigDesktop = useMediaQuery({ query: "(min-width:1200)" });

  const toggleModal = () => {
    setModal(!modal);
  };
  const toggleModal2 = () => {
    setModal2(!modal);
  };
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }
  console.log(pdf);
  const increase = () => {
    if (pageNumber !== numPages) {
      setPageNumber(pageNumber + 1);
    } else {
      return;
    }
  };
  const decrease = () => {
    if (pageNumber !== 1) {
      setPageNumber(pageNumber - 1);
    } else {
      return;
    }
  };
  return (
    <ModalWrapper>
      <div className="flex-y">
        <Document
          file={pdf}
          onLoadSuccess={onDocumentLoadSuccess}
          renderMode="canvas"
        >
          <Page
            size="A4"
            pageNumber={pageNumber}
            width={`${
              Mobile
                ? " 350"
                : Tablet
                ? "540"
                : SmallDesktop
                ? "720"
                : BigDesktop
                ? "1200"
                : "900"
            }`}
          />
        </Document>
        <div
          className="flex-x mt-10"
          style={{
            columnGap: "0.5rem",
            boxShadow: "0 -2.5px 7px 3px #dddddd",
          }}
        >
          <button
            className={`navigation-btns bigger ${
              pageNumber !== 1 ? "active" : ""
            }`}
            onClick={() => {
              setPageNumber(1);
            }}
          >
            <i class="bi bi-chevron-bar-left"></i>
          </button>
          <button
            className={`navigation-btns ${pageNumber !== 1 ? "active" : ""}`}
            onClick={decrease}
          >
            <i class="bi bi-chevron-left"></i>
          </button>
          <button
            className={`navigation-btns ${
              pageNumber !== numPages ? "active" : ""
            }`}
            onClick={increase}
          >
            <i class="bi bi-chevron-right"></i>
          </button>
          <button
            className={`navigation-btns bigger ${
              pageNumber !== numPages ? "active" : ""
            }`}
            onClick={() => {
              setPageNumber(numPages);
            }}
          >
            <i class="bi bi-chevron-bar-right"></i>
          </button>
        </div>
        {buttons && (
          <div className="flex-x ma-10" style={{ columnGap: "1rem" }}>
            <Button
              text="Submit"
              className="submit-btn"
              onClick={toggleModal2}
            ></Button>
            {thirdButton && (
              <Button
                text="Help"
                className="cancel-btn"
                onClick={toggleModal}
              ></Button>
            )}
            <Button
              text="Cancel"
              className="cancel-btn"
              onClick={toggle}
            ></Button>
          </div>
        )}
      </div>
      <Modal
        isOpen={modal}
        toggle={toggleModal}
        title="Solutions"
        width="700px"
        ytLinks={ytLinks}
      />
      <Modal
        isOpen={modal2}
        toggle={toggleModal2}
        title="Scan to Submit"
        width="500px"
      />
    </ModalWrapper>
  );
}

export default CurrentMissionModal;
