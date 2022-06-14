import React, { useState, useEffect } from "react";
import { Select, message, Spin } from "antd";
import PageWrapper from "./CreateMission.style";
import Button from "../../components/common/Button/Button";
import StudentServices from "api/StudentServices";
import { useHistory } from "react-router-dom";
import { RouteDefinitons } from "routes/RouteDefinitions";

function CreateMission() {
  const { Option } = Select;
  const history = useHistory();
  const originalParams = {
    stream: null,
    subject: null,
    topic: null,
    concept_id: null,
    no_of_que: null,
    difficulty_level: "easy",
  };
  const originalOptions = {
    stream: [],
    subject: [],
    topic: [],
    concept: [],
    questions: [1, 2, 3, 4, 5],
  };
  const [params, setParams] = useState(originalParams);
  const [req, setReq] = useState(0);
  const arr = ["stream", "subject", "topic", "concept", "no_of_que"];
  const [optionsData, setOptionsData] = useState(originalOptions);
  const [finalArray, setFinalArray] = useState([]);
  const [previousSum, setPreviousSum] = useState(0);
  const resetOptions = () => {
    setParams({
      stream: null,
      subject: null,
      topic: null,
      concept_id: null,
      no_of_que: null,
      difficulty_level: "easy",
    });
    setOptionsData({
      stream: [],
      subject: [],
      topic: [],
      concept: [],
      questions: [1, 2, 3, 4, 5],
    });
    setReq(0);
  };
  useEffect(() => {
    let obj = { type: arr[req] };
    if (req === 1) {
      obj = { ...obj, stream_id: params.stream };
    } else if (req === 2) {
      obj = { ...obj, stream_id: params.stream, subject_id: params.subject };
    } else if (req === 3) {
      obj = {
        ...obj,
        stream_id: params.stream,
        subject_id: params.subject,
        topic_id: params.topic,
      };
    } else if (req === 4) {
      obj = {
        ...obj,
        stream_id: params.stream,
        subject_id: params.subject,
        topic_id: params.topic,
        concept_id: params.concept_id,
      };
    }
    console.log(obj);
    if (req !== 4) {
      StudentServices.getMissionsDropdown(obj).then((res) => {
        console.log(res.data.data);
        let copy = {};
        if (req === 0) {
          copy = { ...originalOptions, stream: res.data.data };
        } else if (req === 1) {
          copy = {
            ...optionsData,
            subject: res.data.data,
            topic: [],
            concept: [],
          };
        } else if (req === 2) {
          copy = { ...optionsData, topic: res.data.data, concept: [] };
        } else if (req === 3) {
          copy = { ...optionsData, concept: res.data.data };
        } else {
          return;
        }
        if (copy !== {}) {
          setOptionsData(copy);
        }
      });
    }
  }, [params]);
  const filter = (input, option) => {
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };
  const filterSort = (optionA, optionB) => {
    return optionA.children
      .toLowerCase()
      .localeCompare(optionB.children.toLowerCase());
  };
  useEffect(() => {
    console.log(finalArray);
  }, [finalArray]);
  // useEffect(() => {
  //   console.log(optionsData);
  // }, [optionsData]);
  // useEffect(() => {
  //   console.log(params);
  // }, [params]);
  const selectAction = () => {
    if (
      !params.stream ||
      !params.subject ||
      !params.topic ||
      !params.concept_id ||
      !params.no_of_que
    ) {
      message.warn("Please select all fields.");
    }
    let sumOfQuestions = 0;
    let localPreviousSum;
    for (let i = 0; i < finalArray.length; i++) {
      // console.log(finalArray[i].questions);
      localPreviousSum = sumOfQuestions + finalArray[i].no_of_que;
    }
    sumOfQuestions = localPreviousSum + params.no_of_que;
    if (previousSum === 0) {
      setPreviousSum(params.no_of_que);
    } else {
      if (sumOfQuestions <= 5) {
        setPreviousSum(sumOfQuestions);
      }
    }
    if (sumOfQuestions >= 5) {
      message.warn(`Please select less than ${5 - previousSum + 1} questions.`);
    } else {
      const newArray = [
        ...finalArray,
        {
          concept_id: params.concept_id,
          difficulty_level: params.difficulty_level,
          no_of_que: params.no_of_que,
        },
      ];
      setFinalArray(newArray);
      // resetOptions();
      setParams({
        ...params,
        topic: null,
        concept_id: null,
        no_of_que: null,
        difficulty_level: "easy",
      });
    }
  };
  const submitAction = () => {
    const postParam = {
      create_mission: JSON.stringify(finalArray),
      subject_id: params.subject,
    };
    if (finalArray.length === 0) {
      message.warn("Have atleast 1 question selection");
    } else {
      StudentServices.createMission(postParam).then((res) => {
        console.log(res.data.data);

        if (res.data.status === 1) {
          resetOptions();
          setPreviousSum(0);
          setFinalArray([]);
          history.push(
            RouteDefinitons.ROUTE_STUDENT_CURRENT_MISSIONS + "?src=practice"
          );
        }
      });
    }
  };
  return (
    <PageWrapper>
      {previousSum > 0 && (
        <div className="modal-container">
          <div className="modal-wrapper">
            <p>Total: {previousSum} out of 5 questions selected</p>
            <i
              className="bi bi-trash-fill"
              onClick={() => {
                setPreviousSum(0);
                resetOptions();
              }}
            ></i>
          </div>
        </div>
      )}
      <div className="Monts-Bold fs-20 dark-blue mb-20">Create Mission</div>
      <div className="inputs-wrapper">
        <div className="option-wrapper">
          <p>Stream</p>
          <Select
            showSearch
            disabled={finalArray.length ? true : false}
            value={params.stream}
            size="large"
            style={{ width: 400 }}
            placeholder={`${
              finalArray.length ? params.stream : "Select Stream"
            }`}
            optionFilterProp="children"
            filterOption={(input, option) => {
              filter(input, option);
            }}
            filterSort={(optionA, optionB) => {
              filterSort(optionA, optionB);
            }}
            onChange={(value) => {
              const obj = {
                stream: value,
                subject: null,
                topic: null,
                concept_id: null,
                no_of_que: null,
                difficulty_level: "easy",
              };
              setParams(obj);
              setReq(1);
            }}
          >
            {/* <Option value="hello">Hello</Option> */}
            {optionsData.stream.map((item, i) => {
              return (
                <Option value={item.stream_id} key={i}>
                  {item.name}
                </Option>
              );
            })}
          </Select>
        </div>
        <div className="option-wrapper">
          <p>Subject</p>
          <Select
            showSearch
            disabled={finalArray.length ? true : false}
            value={params.subject}
            size="large"
            style={{ width: 400 }}
            placeholder={`${
              finalArray.length ? params.stream : "Select Subject"
            }`}
            optionFilterProp="children"
            filterOption={(input, option) => {
              filter(input, option);
            }}
            filterSort={(optionA, optionB) => {
              filterSort(optionA, optionB);
            }}
            onChange={(value) => {
              const obj = {
                ...params,
                subject: value,
                topic: null,
                concept_id: null,
                no_of_que: null,
              };
              setParams(obj);
              setReq(2);
            }}
          >
            {/* <Option value="hello">Hello</Option> */}
            {optionsData.subject.map((item, i) => {
              return (
                <Option value={item.subject_id} key={i}>
                  {item.name}
                </Option>
              );
            })}
          </Select>
        </div>
        <div className="option-wrapper">
          <p>Topic</p>
          <Select
            showSearch
            value={params.topic}
            size="large"
            style={{ width: 400 }}
            placeholder="Select Topic"
            optionFilterProp="children"
            filterOption={(input, option) => {
              filter(input, option);
            }}
            filterSort={(optionA, optionB) => {
              filterSort(optionA, optionB);
            }}
            onChange={(value) => {
              const obj = {
                ...params,
                topic: value,
                concept_id: null,
                no_of_que: null,
              };
              setParams(obj);
              setReq(3);
            }}
          >
            {/* <Option value="hello">Hello</Option> */}
            {optionsData.topic.map((item, i) => {
              return (
                <Option value={item.topic_id} key={i}>
                  {item.name}
                </Option>
              );
            })}
          </Select>
        </div>
        <div className="option-wrapper">
          <p>Concept</p>
          <Select
            showSearch
            value={params.concept_id}
            size="large"
            style={{ width: 400 }}
            placeholder="Select Concept"
            optionFilterProp="children"
            filterOption={(input, option) => {
              filter(input, option);
            }}
            filterSort={(optionA, optionB) => {
              filterSort(optionA, optionB);
            }}
            onChange={(value) => {
              const obj = {
                ...params,
                concept_id: value,
                no_of_que: null,
              };
              setParams(obj);
            }}
          >
            {/* <Option value="hello">Hello</Option> */}
            {optionsData.concept.map((item, i) => {
              return (
                <Option value={item.concept_id} key={i}>
                  {item.concepts.name}
                </Option>
              );
            })}
          </Select>
        </div>
        <div className="option-wrapper">
          <p>Number of Questions</p>
          <Select
            showSearch
            value={params.no_of_que}
            size="large"
            style={{ width: 400 }}
            placeholder="Select Number of Questions"
            optionFilterProp="children"
            filterOption={(input, option) => {
              filter(input, option);
            }}
            filterSort={(optionA, optionB) => {
              filterSort(optionA, optionB);
            }}
            onChange={(value) => {
              const obj = {
                ...params,
                no_of_que: value,
              };
              setParams(obj);
              setReq(4);
            }}
          >
            {optionsData.questions.map((item, i) => {
              return (
                <Option value={item} key={i}>
                  {item}
                </Option>
              );
            })}
          </Select>
        </div>
      </div>
      <div
        className="flex-x center mt-20"
        style={{ columnGap: "1rem", margin: "0 auto" }}
      >
        <Button
          text="Select"
          width="300"
          className="select-btn"
          onClick={selectAction}
        ></Button>
        <Button
          text="Submit"
          width="300"
          className="submit-btn"
          onClick={submitAction}
        ></Button>
      </div>
    </PageWrapper>
  );
}

export default CreateMission;
