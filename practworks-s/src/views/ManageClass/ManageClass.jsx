import TeacherServices from "api/TeacherServices";
import React, { useState, useEffect } from "react";
import Button from "../../components/common/Button/Button";
import { Row, Col, Card, message, Tag } from "antd";
import { useHistory, useParams } from "react-router-dom";
import { RouteDefinitons } from "routes/RouteDefinitions";
import Modal from "../../components/common/Modal/Modal";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function ManageClass() {
  const [underPractice, setUnderPractice] = useState([]);
  const [notUnderPractice, setNotUnderPractice] = useState([]);
  const [students, setStudents] = useState(0);
  const [classes, setClasses] = useState([]);
  const [update, setUpdate] = useState(true);
  const [modal, setModal] = useState(false);
  const [columns, setColumns] = useState([]);
  const [listUpdated, setListUpdated] = useState(false);
  const history = useHistory();
  const { id } = useParams();

  const toBeSetColumns = [
    {
      id: "underPractise",
      items: [...underPractice],
      name: "TOPICS UNDER PRACTISE",
    },
    {
      id: "notUnderPractise",
      items: [...notUnderPractice],
      name: "TOPICS NOT PRACTISED YET",
    },
  ];
  useEffect(() => {
    TeacherServices.getClasses().then((res) => {
      setClasses(res.data.data.classList);
    });
  }, []);
  useEffect(() => {
    if (update && id) {
      TeacherServices.manageClasses(id).then((res) => {
        console.log(id);
        console.log(res.data.data);
        setUnderPractice(res.data.data.underPractice);
        setStudents(res.data.data.nStudents);
        if (res.data.data.NOTunderPractice.length != 0) {
          setNotUnderPractice(res.data.data.NOTunderPractice);
        } else {
          setNotUnderPractice([]);
        }
      });
    }
  }, [id, update]);
  useEffect(() => {
    setColumns(toBeSetColumns);
  }, [underPractice, notUnderPractice]);
  useEffect(() => {
    console.log(columns);
  }, [columns]);
  const moveTopics = (id) => {
    let underPractiseParam = [];
    let notUnderPractiseParam = [];
    for (let i = 0; i < underPractice.length; i++) {
      underPractiseParam.push(underPractice[i].topic_id);
    }
    for (let i = 0; i < notUnderPractice.length; i++) {
      notUnderPractiseParam.push(notUnderPractice[i].topic_id);
    }
    setUpdate(false);
    const params = {
      under_practice: underPractiseParam,
      not_under_practice: notUnderPractiseParam,
    };
    console.log(params);
    TeacherServices.moveTopics(id, params).then((res) => {
      if (res.data.status === 0) {
        message.error(res.data.message);
      } else {
        message.success(res.data.message);
        setUpdate(true);
        setListUpdated(false);
      }
    });
  };
  const toggleModal = () => {
    setModal(!modal);
  };
  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns.filter(
        (column) => column.id === source.droppableId
      )[0];
      const destColumn = columns.filter(
        (column) => column.id === destination.droppableId
      )[0];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      if (sourceColumn.id === "underPractise") {
        setUnderPractice(sourceItems);
        setNotUnderPractice(destItems);
        setColumns([
          {
            ...sourceColumn,
            items: sourceItems,
          },
          {
            ...destColumn,
            items: destItems,
          },
        ]);
      } else {
        setUnderPractice(destItems);
        setNotUnderPractice(sourceItems);
        setColumns([
          {
            ...destColumn,
            items: destItems,
          },
          {
            ...sourceColumn,
            items: sourceItems,
          },
        ]);
      }
      setListUpdated(true);
    } else {
      return;
    }
  };
  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
    >
      <div>
        {!id && (
          <div>
            <h3 className="Monts-Bold fs-24 dark-blue mb-20 text-center">
              Manage Classes
            </h3>
            <Row gutter={[20, 20]}>
              {classes.map((el) => {
                return (
                  <Col span={8} key={el.class_id}>
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
                        history.push(
                          RouteDefinitons.ROUTE_TEACHER_CLASS_DETAILS.replace(
                            ":id",
                            el.class_id
                          )
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
                        {el.class_name}
                      </p>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </div>
        )}
        {id && (
          <>
            <div className="flex-x space-between align-center mb-20 mt-30">
              <div className="Monts-Bold fs-20 dark-blue mb-10">
                Total Students: {students}
              </div>
              <div className="flex-x stretch fs-15 mb-20">
                <Button
                  style={{
                    minWidth: 100,
                    marginRight: 20,
                    background: "#3aa76d",
                  }}
                  text="Invite"
                  onClick={toggleModal}
                ></Button>
                <Button
                  style={{ background: "#7480ff", minWidth: 170 }}
                  text="Accept/Decline"
                  onClick={() => {
                    history.push(
                      RouteDefinitons.ROUTE_TEACHER_ACCEPT_INVITE.replace(
                        ":id",
                        id
                      )
                    );
                  }}
                ></Button>
              </div>
            </div>
            {columns.map((column) => {
              return (
                <div key={column.id}>
                  <div className="Monts-Bold fs-17 dark-blue mb-40 text-center">
                    {column.name}
                  </div>
                  <Droppable droppableId={column.id}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="under_practise mb-30 flex-x"
                          style={{
                            gap: "1rem",
                            justifyContent: "flex-start",
                            flexWrap: "wrap",
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={index}
                                draggableId={item.topic_id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <Tag
                                      color={
                                        column.id === "underPractise"
                                          ? "#3a996d"
                                          : "orange"
                                      }
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        padding: "5px 10px",
                                        userSelect: "none",
                                        borderRadius: "12px",
                                        fontSize: 13,
                                        fontFamily: "Montserrat-Bold",
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      <p
                                        style={{
                                          userSelect: "none",
                                          whiteSpace: "nowrap",
                                          cursor: "grab",
                                        }}
                                      >
                                        {item.topic_name}
                                      </p>
                                    </Tag>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              );
            })}
            <div style={{ display: "flex", justifyContent: "end" }}>
              {listUpdated && (
                <Button
                  text="Save"
                  width="100"
                  onClick={() => {
                    moveTopics(id);
                  }}
                ></Button>
              )}
            </div>
            <Modal
              isOpen={modal}
              toggle={toggleModal}
              title="Invite Students"
            />
          </>
        )}
      </div>
    </DragDropContext>
  );
}

export default ManageClass;
