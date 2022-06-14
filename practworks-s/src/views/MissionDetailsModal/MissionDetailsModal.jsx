import React, { useEffect, useState } from "react";
import ModalWrapper from "./MissionDetailsModal.style";
import Button from "../../components/common/Button/Button";
import { Input, message } from "antd";
import PdfModal from "../../components/common/PdfModal/PdfModal";
import ReactStars from "react-rating-stars-component";
import StudentServices from "api/StudentServices";

function MissionDetailsModal({ onClick, modalData }) {
  const { TextArea } = Input;
  const [rating, setRating] = useState(0);
  const [subModal, setSubModal] = useState(false);
  const [pdf, setPdf] = useState("");
  const [heading, setHeading] = useState("");
  const [feedback, setFeedback] = useState("");
  const toggleModal = () => {
    setSubModal(!subModal);
  };
  const ratingChanged = (newRating) => {
    setRating(newRating);
  };
  useEffect(() => {
    setFeedback("");
    setRating(0);
  }, [modalData]);
  const postFeedback = () => {
    if (!feedback) {
      message.warn("Please write a feedback");
      setRating(5);
    } else {
      const params = {
        rating: rating,
        feedback: feedback,
      };
      console.log(modalData.mission_id);
      StudentServices.postFeedback(modalData.mission_id, params).then((res) => {
        if (res.data.status === 1) {
          onClick();
          setFeedback("");
          setRating(0);
          message.success("Successfull.");
        }
      });
    }
  };
  const listItems = [
    {
      heading: "View Questions",
      pdf: modalData.question,
    },
    {
      heading: "View Submission",
      pdf: modalData.submission,
    },
    {
      heading: "View Evaluation",
      pdf: modalData.evaluation,
    },
    {
      heading: "View Answers",
      pdf: modalData.answer,
    },
  ];
  return (
    <ModalWrapper>
      <div className="list-wrapper">
        <div className="header">
          <p>{modalData.mission_id}</p>
        </div>
        <div className="points">
          <h4 className="dark-blue Monts-SemiBold fs-25">{modalData.points}</h4>
          <p className="dark-blue Monts-SemiBold fs-15 thin">
            Points you have earned
          </p>
        </div>
        {listItems.map((item, i) => {
          return (
            <div key={i}>
              <p
                className="dark-blue Monts-SemiBold fs-15 hover"
                onClick={() => {
                  setPdf(item.pdf);
                  setHeading(item.heading);
                  toggleModal();
                }}
              >
                {item.heading}
              </p>
            </div>
          );
        })}
      </div>
      <div className="gray-bg">
        <p className="dark-blue Monts-SemiBold fs-15">Ratings</p>
        <ReactStars
          count={5}
          value={rating}
          onChange={ratingChanged}
          size={24}
          activeColor="#ffd700"
        />
        <div className="feedback-wrapper">
          <p className="dark-blue Monts-SemiBold fs-15 mb-7">Your Feedback</p>
          <TextArea
            autoSize={{ minRows: 4, maxRows: 6 }}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </div>
        <Button
          text="Submit"
          style={{ marginTop: "20px" }}
          onClick={postFeedback}
        ></Button>
      </div>
      <PdfModal
        isOpen={subModal}
        toggle={toggleModal}
        title="Current Mission"
        heading={heading}
        pdf={pdf}
        buttons={false}
      />
    </ModalWrapper>
  );
}

export default MissionDetailsModal;
