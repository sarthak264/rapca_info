import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { UserService } from "../../services/user.service";
import { RouteDefinitions } from "../../utils/RouteDefinitions";

interface Props {}

export const LandingPage = (props: Props) => {
  const history = useHistory();
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useContext(UserContext);
  useEffect(() => {
    const query = new URLSearchParams(history.location.search);
    const email = query.get("email");
    const username = query.get("user");
    const meetingTopic = query.get("meetingTopic");
    if (email && username && meetingTopic) {
      localStorage.setItem("username", username);
      UserService.getToken(email, username)
        .then((res) => {
          localStorage.setItem("userToken", res.data.token);
          setUser({ ...res.data, email, type: "user" });
          history.push(
            RouteDefinitions.ROUTE_TUTOR_SUPPORT +
              "?meetingTopic=" +
              meetingTopic
          );
        })
        .catch((rej) => console.error(rej));
    } else {
      setError("Email not found");
    }
  }, []);
  return (
    <div className="pt-5 text-center h3">
      {!error ? (
        "Setting up some stuff for you ...."
      ) : (
        <a href="?email=guest@gmail.com&meetingTopic=HTML%20and%20CSS&user=Guest">
          Click here to join
        </a>
      )}
    </div>
  );
};
