import { ReviseContext } from "context/ReviseContext";
import React, { useContext, useState, useEffect } from "react";
import PageWrapper from "./RevisePage.style";
import { Checkbox, message as Message } from "antd";
import Button from "components/common/Button/Button";
import { Redirect, useHistory } from "react-router-dom";
import { RouteDefinitons } from "routes/RouteDefinitions";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import StudentServices from "api/StudentServices";

const RevisePage = () => {
  const { reviseData, setReviseData } = useContext(ReviseContext);
  const [checked, setChecked] = useState("");
  const [message, setMessage] = useState("");
  const mcqOptions = [
    reviseData.option_a,
    reviseData.option_b,
    reviseData.option_c,
    reviseData.option_d,
  ];
  const history = useHistory();
  useEffect(() => {
    setChecked("");
    setMessage("");
    if (reviseData.attempted !== null) {
      if (reviseData.attempted.is_correct === true) {
        setMessage("You nailed it!");
      } else {
        setMessage("Selected option is incorrect");
      }
    }
  }, [reviseData]);
  const submitAnswer = () => {
    if (checked.length === 0) {
      Message.error("Please select any option");
    } else {
      console.log(mcqOptions[parseInt(reviseData.correct_option)]);
      let optionsSelected = checked.split(",");
      let finalArray = [];
      for (let i = 0; i < optionsSelected.length; i++) {
        console.log(optionsSelected[i]);
        const index = mcqOptions.indexOf(optionsSelected[i]);
        finalArray.push(index + 1);
      }
      console.log(finalArray);
      const params = {
        topic_id: reviseData.topic_id,
        revise_question_id: reviseData.revise_question_id,
        is_correct:
          mcqOptions[parseInt(reviseData.correct_option) - 1] === checked
            ? 1
            : 0,
        answer: finalArray.toString(),
      };
      console.log(params);
      StudentServices.submitAnswer(params).then((res) => {
        console.log(res.data);
      });
      if (mcqOptions[parseInt(reviseData.correct_option) - 1] === checked) {
        setMessage("You nailed it!");
      } else {
        setMessage("Selected option is incorrect");
      }
    }
  };
  const changeQuestion = (type) => {
    let params = {
      topic_id: reviseData.topic_id,
      revise_question_id: reviseData.revise_question_id,
      is_back: type === "back" ? 1 : 0,
      is_next: type === "next" ? 1 : 0,
    };
    if (type === "back") {
      delete params.is_next;
      params.revise_question_id = reviseData.is_back;
    } else if (type === "next") {
      delete params.is_back;
      params.revise_question_id = reviseData.is_next;
    }
    console.log(params);
    StudentServices.revise(params).then((res) => {
      console.log(res);
      setReviseData((prev) => {
        return { ...res.data.data, name: prev.name };
      });
    });
  };
  console.log(reviseData);
  const select = (checked) => {
    console.log(checked.toString());
    setChecked(checked.toString());
  };
  // useEffect(() => {
  //   console.log(reviseData);
  //   if (reviseData === {}) {
  //     console.log("obj is empty");
  //     history.push(RouteDefinitons.ROUTE_STUDENT_PRACTICE_LIST);
  //   }
  // }, [reviseData]);
  const options = [
    { label: reviseData.option_a, value: reviseData.option_a },
    { label: reviseData.option_b, value: reviseData.option_b },
    { label: reviseData.option_c, value: reviseData.option_c },
    { label: reviseData.option_d, value: reviseData.option_d },
  ];
  if (reviseData === {} || reviseData === null) {
    return <Redirect to={RouteDefinitons.ROUTE_STUDENT_PRACTICE_LIST} />;
  }
  return (
    <MathJaxContext>
      <PageWrapper>
        <div className="flex-x space-between align-center mb-10 top">
          <div className="Monts-Bold fs-25">Revise</div>
          <p>{reviseData.revise_point} points</p>
        </div>
        <div className="topic">
          <p>{reviseData.name}</p>
        </div>
        <div className="question-wrapper">
          <p className="question">{reviseData.question}</p>
          <Checkbox.Group
            onChange={select}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
            }}
          >
            <Checkbox value={reviseData.option_a}>
              {reviseData.option_a}
            </Checkbox>
            <Checkbox value={reviseData.option_b}>
              {reviseData.option_b}
            </Checkbox>
            <Checkbox value={reviseData.option_c}>
              {reviseData.option_c}
            </Checkbox>
            <Checkbox value={reviseData.option_d}>
              {reviseData.option_d}
            </Checkbox>
          </Checkbox.Group>
          {reviseData.is_back && (
            <i
              className="bi bi-chevron-left left"
              onClick={() => {
                changeQuestion("back");
              }}
            ></i>
          )}
          {reviseData.is_next && reviseData.is_attempted && (
            <i
              className="bi bi-chevron-right right"
              onClick={() => {
                changeQuestion("next");
              }}
            ></i>
          )}
        </div>
        {reviseData.is_attempted || message ? (
          <p
            className={`${
              message === "Selected option is incorrect"
                ? "message wrong"
                : "message"
            }`}
          >
            {message}
          </p>
        ) : (
          ""
        )}
        {message || reviseData.is_attempted ? (
          <MathJax className="solution">{reviseData.solution}</MathJax>
        ) : (
          ""
        )}
        <div className="btn-wrapper">
          <Button
            text="Submit"
            onClick={submitAnswer}
            width="150"
            loading={message ? true : false}
            onlyDisable={true}
          />
        </div>
      </PageWrapper>
    </MathJaxContext>
  );
};

export default RevisePage;
