import React, { useEffect, useState } from "react";
import { message, Tabs } from "antd";
import StudentServices from "api/StudentServices";
import { Col, Row, Card } from "antd";
import Button from "../../components/common/Button/Button";
import PdfModal from "components/common/PdfModal/PdfModal";
import PageWrapper from "./StudentCurrentMissions.style";
import { useHistory } from "react-router";

function StudentCurrentMissions() {
  const [key, setKey] = useState("picked");
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [topic, setTopic] = useState("");
  const [pdf, setPdf] = useState("");
  const [ytLinks, setYTLinks] = useState([]);
  const { TabPane } = Tabs;
  const history = useHistory();

  const toggleModal = (name, pdfLink) => {
    setTopic(name);
    setPdf(pdfLink);
    setModal(!modal);
  };
  useEffect(() => {
    const query = new URLSearchParams(history.location.search);
    const src = query.get("src");
    if (src) {
      message.success(
        "Your mission is under preparation and will be available once it is prepared."
      );
    }
  }, []);
  useEffect(() => {
    // console.log(key);
    const params = {
      type: key,
      page: 1,
    };
    StudentServices.getCurrentMissions(params).then((res) => {
      console.log(res.data.data);
      setData(res.data.data);
    });
  }, [key]);
  const MissionList = ({ data, toggleModal }) => (
    <>
      <Row gutter={[20, 20]}>
        {data.map((card, index) => {
          return (
            <Col span={8} key={index}>
              <Card
                style={{
                  color: "#213861",
                  height: "100%",
                  borderColor: "#213861",
                  borderRadius: "12px",
                  cursor: "pointer",
                }}
                className="d-flex align-items-center justify-content-center"
                onClick={() => {
                  console.log(card.mission_id);
                  StudentServices.getVideos(card.mission_id).then((res) => {
                    console.log(res.data.data);
                    setYTLinks(res.data.data.videoList);
                  });
                  toggleModal(
                    card.topic ? card.topic.name : card.user_mission_id,
                    card.question_file_url
                  );
                }}
              >
                <p
                  style={{
                    fontFamily: "Montserrat-Bold",
                    fontSize: "1rem",
                    cursor: "pointer",
                  }}
                  className="text-center mb-0"
                >
                  {card.user_mission_id}
                </p>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
  return (
    <PageWrapper>
      <div className="dark-blue Monts-SemiBold fs-30 mb-20">
        Current Missions
      </div>
      <Tabs
        type="card"
        size="large"
        onChange={(activeKey) => {
          setKey(activeKey);
        }}
      >
        <TabPane tab="Pract Missions" key="picked">
          <MissionList data={data} toggleModal={toggleModal} />
        </TabPane>
        <TabPane tab="Self Created" key="own">
          {" "}
          <MissionList data={data} toggleModal={toggleModal} />
        </TabPane>
        <TabPane tab="Showdown" key="shown">
          {" "}
          <MissionList data={data} toggleModal={toggleModal} />
        </TabPane>
      </Tabs>
      <PdfModal
        isOpen={modal}
        toggle={toggleModal}
        title="Current Mission"
        heading={topic}
        pdf={pdf}
        buttons={true}
        thirdButton={ytLinks.length > 0}
        ytLinks={ytLinks}
      />
    </PageWrapper>
  );
}

export default StudentCurrentMissions;
