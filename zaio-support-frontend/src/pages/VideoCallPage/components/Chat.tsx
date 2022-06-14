import React, { useContext, useEffect, useState } from "react";

import { useHistory } from "react-router";

import { UserContext } from "../../../context/UserContext";
import { customSocket } from "../../../utils/socket";
import styles from "./styles/Chat.module.css";

export const Chat = () => {
  const [messages, setMessages] = useState<
    {
      user: string;
      text: string;
    }[]
  >([]);
  const [textArea, setTextArea] = useState("");

  const history = useHistory();
  const query = new URLSearchParams(history.location.search);
  const meetingId = query.get("meetingId");
  const { user } = useContext(UserContext);
  useEffect(() => {
    console.log({ customSocket, user });
    if (user) {
      console.log("SOCKETTTTT", customSocket);
      customSocket.emit(
        "join",
        { name: user.email, party: meetingId, userId: user.userId },
        () => {}
      );
      customSocket.on("message", (message) => {
        console.log("msg");
        setMessages((prev) => [...prev, message]);
      });
    }
    return () => {
      customSocket.disconnect();
      customSocket.off();
    };
  }, [user]);
  const submitMessage = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // console.log(e);
    if (e.key === "Enter") {
      e.preventDefault();
      if (textArea.trim().length === 0) return;

      customSocket.emit(
        "sendMessage",
        {
          party: meetingId,
          text: textArea,
          userId: user?.userId,
          name: user?.email,
        },
        () => {}
      );

      setTextArea("");
    }
  };
  return (
    <>
      <div className={`${styles.chat}`}>
        <p className={`${styles.chatHeading} text-center mb-1 mt-2`}>Chat</p>
        <div className={`d-flex flex-column pb-5 px-3 ${styles.chatMessages}`}>
          {messages.map((data: any, index: any) => {
            return (
              <div className="row" key={`chat${index + 1}`}>
                <p className="text-muted mb-1">
                  <small>{`${data.name}`}</small>
                </p>
                <p
                  className={`text-break ${styles.chatMessage} mb-2`}
                >{` ${data.text}`}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <textarea
          placeholder="Type your message here"
          className={`${styles.chatInput} ${styles.formControl}`}
          onChange={(e) => setTextArea(e.target.value)}
          aria-label="With textarea"
          value={textArea}
          onKeyPress={submitMessage}
        />
      </div>
    </>
  );
};
