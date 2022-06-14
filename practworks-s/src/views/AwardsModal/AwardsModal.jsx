import React from "react";
import ModalWrapper from "./AwardsModal.style";

function AwardsModal() {
  const awardsData = [
    {
      title: "MAP",
      name: "Milestones at PractWorks",
      criteria:
        "Every time the student crosses the milestone of solving of a set of 40 questions.",
      chips: 40,
      frequency:
        "Continuous. Awarded every time student crosses the milestone.",
    },
    {
      title: "CAP",
      name: "Constant at PractWorks",
      criteria: "Three missions in a week for a continuous stretch of 4 weeks.",
      chips: 100,
      frequency:
        "Continuous. Every time the student completes 4 weeks stretch.",
    },
    {
      title: "CAP",
      name: "Constant at PractWorks",
      criteria: "Three missions in a week for a continuous stretch of 4 weeks.",
      chips: 100,
      frequency:
        "Continuous. Every time the student completes 4 weeks stretch.",
    },
    {
      title: "CAP",
      name: "Constant at PractWorks",
      criteria: "Three missions in a week for a continuous stretch of 4 weeks.",
      chips: 100,
      frequency:
        "Continuous. Every time the student completes 4 weeks stretch.",
    },
  ];
  const ranksData = [
    { rank: "Officer Cadet", stars: 1, startRange: 0, endRange: 200 },
    { rank: "Lieutenant", stars: 2, startRange: 201, endRange: 400 },
    { rank: "Captain", stars: 3, startRange: 401, endRange: 600 },
    { rank: "Major", stars: 4, startRange: 601, endRange: 800 },
    { rank: "Colonel", stars: 5, startRange: 801, endRange: 1000 },
    { rank: "Brigadier", stars: 6, startRange: 1001, endRange: 1300 },
    { rank: "Lieutenant General", stars: 7, startRange: 1301, endRange: 1600 },
    { rank: "General", stars: 8, startRange: 1601, endRange: 2000 },
    { rank: "Field Marshall", stars: 9, startRange: 2001, endRange: "" },
  ];
  return (
    <ModalWrapper>
      <div className="section-title">
        <h4 className="Monts-Medium">Awards</h4>
      </div>
      {awardsData.map((data, index) => {
        return (
          <div key={index}>
            <div className="award-wrapper">
              <p>{data.title}</p>
              <p>{data.name}</p>
            </div>
            <div className="award-data">
              <p>Criteria</p>
              <p>{data.criteria}</p>
              <p>Chips</p>
              <p>{data.chips}</p>
              <p>Frequency</p>
              <p>{data.frequency}</p>
            </div>
          </div>
        );
      })}
      <div className="section-title">
        <h4 className="Monts-Medium">Ranks</h4>
      </div>
      {ranksData.map((data, index) => {
        const starsArray = [];
        for (let i = 0; i < data.stars; i++) {
          starsArray.push(1);
        }
        return (
          <div key={index}>
            <div className="rank-wrapper">
              <p>{data.rank}</p>
            </div>
            <div
              className={`${
                index === ranksData.length - 1 ? "rank-data last" : "rank-data"
              }`}
            >
              <p>Criteria</p>
              <p>
                Earn points in range {data.startRange}-{data.endRange}
              </p>
              <p>Stars</p>
              <p className="stars">
                {starsArray.map((star, i) => {
                  return <>⭐</>;
                })}
              </p>
            </div>
          </div>
        );
      })}
    </ModalWrapper>
  );
}

export default AwardsModal;
