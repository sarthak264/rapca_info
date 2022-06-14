import React from "react";
import ModalWrapper from "./SolutionModal.style";

function SolutionModal({ ytLinks }) {
  console.log(ytLinks);
  return (
    <ModalWrapper>
      {ytLinks.map((link, i) => {
        let startTime = link.start_time;
        let endTime = link.stop_time;
        let startTimeArray = startTime.split(":");
        let endTimeArray = endTime.split(":");
        let startSeconds = +startTimeArray[0] * 60 + +startTimeArray[1];
        let endSeconds = +endTimeArray[0] * 60 + +endTimeArray[1];
        return (
          <div>
            <div className="card-wrapper">
              <iframe
                width="100%"
                height="320"
                src={`https://www.youtube.com/embed/${link.id}?start=${startSeconds}&end=${endSeconds}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={link.title}
              />
              <p>{link.title}</p>
            </div>
          </div>
        );
      })}
    </ModalWrapper>
  );
}

export default SolutionModal;
