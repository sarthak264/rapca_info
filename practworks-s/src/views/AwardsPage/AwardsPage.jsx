import StudentServices from "api/StudentServices";
import React, { useEffect, useState } from "react";
import PageWrapper from "./AwardsPage.style";
import UserImg from "../../assets/images/userImage.svg";
import Award from "../../assets/images/medal.png";
import Coin from "../../assets/images/coin.png";
import Modal from "components/common/Modal/Modal";

function AwardsPage() {
  const [data, setData] = useState({
    map_count: 0,
    cap_count: 0,
    tap_count: 0,
    showdown_count: 0,
    chips: 0,
    rank: "",
    stars: 1,
    current_position: 0,
    current_points: 0,
    users_list: [],
  });
  const [stars, setStars] = useState([]);
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };
  useEffect(() => {
    StudentServices.getAwards().then((res) => {
      console.log(res.data.data);
      setData(res.data.data);
    });
  }, []);
  useEffect(() => {
    const array = [];
    for (let i = 0; i < data.stars; i++) {
      array.push(data.stars);
    }
    setStars(array);
  }, [data]);
  const stats = [
    { title: "MAP Winner", data: data.map_count },
    { title: "CAP Winner", data: data.cap_count },
    { title: "Chips", data: data.chips },
    { title: "TAP Winner", data: data.tap_count },
    { title: "Showdown", data: data.showdown_count },
  ];
  return (
    <PageWrapper>
      <div className="awards-container">
        {stats.map((stat, i) => {
          return (
            <div>
              <img
                src={stat.title === "Chips" ? Coin : Award}
                className="award-img"
                alt="coin-medal"
              />
              <p>{stat.title}</p>
              <p>
                {stat.data}{" "}
                {stat.data !== null
                  ? `${
                      stat.data === 0 ? "" : stat.data === 1 ? "time" : "times"
                    }`
                  : "0"}
              </p>
            </div>
          );
        })}
      </div>
      <div className="Monts-Bold fs-20 dark-blue text-center">{data.rank}</div>
      <div className="absolute-wrapper">
        <div className="Monts-Bold fs-30 dark-blue text-center">
          Leaderboard
        </div>
        <div className="info-btn">
          <i class="bi bi-info-circle" onClick={toggleModal}></i>
        </div>
      </div>
      <div className="stars mb-20">
        {stars.map(() => {
          return (
            <>
              <p className="star">⭐</p>
            </>
          );
        })}
      </div>
      <div className="list-wrapper">
        {data.users_list.map((user, i) => {
          return (
            <div
              class={`list-item ${
                i + 1 === data.current_position ? "gray" : ""
              }`}
              key={i}
            >
              <div className="left">
                <p class="index">{`${i + 1}.`}</p>
                <div class="name-wrapper">
                  <img
                    src={user.profile_photo ? user.profile_photo : UserImg}
                    // src={UserImg}
                    className="user-img"
                  />
                  <p class="name">
                    {i + 1 === data.current_position
                      ? "You"
                      : `${user.first_name} 
                  ${user.last_name}`}
                  </p>
                </div>
              </div>
              <div className="right">
                <p>{`${user.earned_points} points`}</p>
              </div>
            </div>
          );
        })}
      </div>
      <Modal
        isOpen={modal}
        toggle={toggleModal}
        title="Awards and Ranks"
        width="550px"
      />
    </PageWrapper>
  );
}

export default AwardsPage;
