import StudentServices from "api/StudentServices";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { Select, Row, Col, message, Spin } from "antd";
import PageWrapper from "./PracticeListPage.style";
import Modal from "../../components/common/Modal/Modal";
import Button from "../../components/common/Button/Button";
import { useHistory } from "react-router-dom";
import { RouteDefinitons } from "routes/RouteDefinitions";
import RevisePage from "views/RevisePage/RevisePage";
import { ReviseContext } from "context/ReviseContext";

function PracticeListPage() {
  const { Option } = Select;
  const [subjectsList, setSubjectsList] = useState([]);
  const [subject, setSubject] = useState({});
  const [data, setData] = useState([]);
  const [topicID, setTopicID] = useState({ id: "", value: null });
  const [modal, setModal] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [timeDate, setTimeDate] = useState({});
  const [modalMessage, setModalMessage] = useState("");
  const [page, setPage] = useState(1);
  const { setReviseData } = useContext(ReviseContext);

  const history = useHistory();

  const loadMore = () => {
    console.log("Loading more");
    setPage(page + 1);
  };

  const toggleModal = () => {
    setModal(!modal);
  };
  useEffect(() => {
    StudentServices.getSubjects().then((res) => {
      console.log(res.data.data.subjects);
      setSubjectsList(res.data.data.subjects);
      setSubject(res.data.data.subjects[0].subject);
    });
  }, []);
  useEffect(() => {
    const params = {
      subject_id: subject.subject_id,
      page: page,
    };
    console.log(params);
    StudentServices.getTopicsBySubject(params).then((res) => {
      if (page === 1) {
        setData(res.data.data);
        loadMore();
      } else {
        if (res.data.data.length) {
          const prevData = [...data];
          const newData = res.data.data;
          setData([...prevData, ...newData]);
          loadMore();
        }
      }
    });
  }, [subject, page]);
  useEffect(() => {
    console.log(topicID);
    if (topicID.value === "pick a mission") {
      pickMission();
    } else if (topicID.value === "showdown") {
      getShowdownData();
    } else if (topicID.value === "revise") {
      revise();
    }
  }, [topicID]);
  useEffect(() => {
    if (confirm) {
      const params = {
        topic_id: topicID.id,
        subject_id: subject.subject_id,
        showdown_date: timeDate.date,
        showdown_time: timeDate.time,
      };
      console.log(params);
      StudentServices.getShowDown(params).then((res) => {
        if (res.data.status === 0) {
          message.warn(res.data.message);
        } else {
          message.success(res.data.message);
          history.push(RouteDefinitons.ROUTE_STUDENT_CURRENT_MISSIONS);
        }
      });
    }
  }, [confirm]);
  const getShowdownData = () => {
    StudentServices.checkEligibility({ topic_id: topicID.id }).then((res) => {
      if (res.data.status === 0) {
        message.error(res.data.message);
      } else {
        setModalMessage(res.data.message);
        setTimeDate(res.data.data);
        toggleModal();
      }
    });
  };
  const pickMission = () => {
    const params = {
      topic_id: topicID.id,
      subject_id: subject.subject_id,
    };
    console.log(params);
    StudentServices.pickMission(params).then((res) => {
      console.log(res.data.data);
      if (res.data.status === 0) {
        message.warn(res.data.message);
      } else {
        message.success(res.data.message);
        history.push(
          RouteDefinitons.ROUTE_STUDENT_CURRENT_MISSIONS + "?src=practice"
        );
      }
    });
  };
  const revise = () => {
    const params = {
      topic_id: topicID.id,
    };
    StudentServices.revise(params).then((res) => {
      let data = res.data.data;
      setReviseData({ ...data, name: topicID.name });
      history.push(RouteDefinitons.ROUTE_STUDENT_REVISE);
    });
  };
  return (
    <PageWrapper>
      <div className="Monts-Bold fs-20 dark-blue mb-10">Practice List Page</div>
      <div>
        <Select
          value={subject.name}
          showSearch
          size="large"
          style={{ width: 300 }}
          placeholder="Search for Subjects"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          filterSort={(optionA, optionB) =>
            optionA.children
              .toLowerCase()
              .localeCompare(optionB.children.toLowerCase())
          }
          onChange={(value, index) => {
            setSubject(subjectsList[index.key].subject);
          }}
        >
          {subjectsList.map((subject, index) => {
            return (
              <Option value={subject.subject.subject_id} key={index}>
                {subject.subject.name}
              </Option>
            );
          })}
        </Select>
      </div>
      <div className="mt-30">
        <Row gutter={[30, 30]}>
          {data.map((item) => {
            return (
              <Col key={item.topic_id} span={12}>
                <div className="header">
                  <p>{item.name}</p>
                </div>
                <div className="input-wrapper">
                  <Select
                    showSearch
                    size="large"
                    style={{ width: "100%" }}
                    placeholder="I want to....."
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    filterSort={(optionA, optionB) =>
                      optionA.children
                        .toLowerCase()
                        .localeCompare(optionB.children.toLowerCase())
                    }
                    onChange={(value) => {
                      if (value === "pick a mission") {
                        setTopicID({ id: item.topic_id, value: value });
                      } else if (value === "showdown") {
                        setTopicID({ id: item.topic_id, value: value });
                      } else if (value === "revise") {
                        setTopicID({
                          id: item.topic_id,
                          value: value,
                          name: item.name,
                        });
                      }
                    }}
                  >
                    <Option value="revise">Revise</Option>
                    <Option value="pick a mission">Pick a PractMission</Option>
                    <Option value="showdown">Showdown</Option>
                  </Select>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
      <Modal
        title="Showdown confirm"
        isOpen={modal}
        toggle={toggleModal}
        setConfirm={setConfirm}
        message={modalMessage}
      />
    </PageWrapper>
  );
}

export default PracticeListPage;
