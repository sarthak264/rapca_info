import React from "react";
import { Link } from "react-router-dom";
import { Clock } from "../../assets/clock";
import "./ThankYouPage.css";
import { useHistory } from "react-router-dom";
interface Props {}

export const ThankYouPage = (props: Props) => {
  const history = useHistory();
  const query = new URLSearchParams(history.location.search);
  const timeString = query.get("time")!;
  const time = parseInt(timeString);
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  return (
    <div className="ty-main">
      <h4 className="ty-heading">Your session has ended</h4>
      <div className="ty-box">
        <p className="text-center">Tutor Session Summary</p>
        <div className="d-flex justify-content-center">
          <div className="d-flex">
            <Clock />
            <p className="ms-2">{`${minutes}:${seconds}`}</p>
          </div>
        </div>
      </div>
      <Link
        to="/dashboard"
        className="m-auto d-flex"
        style={{ width: "fit-content", fontSize: 20 }}
      >
        Back to course
      </Link>
    </div>
  );
};
