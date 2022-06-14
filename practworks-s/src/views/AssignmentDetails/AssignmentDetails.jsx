import {
  Divider,
  Pagination,
  Radio,
  Space,
  Tag,
  Button as Buttons,
  message,
} from "antd";
import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import AssigmentDetailsWrapper from "./AssignmentDetails.style";
// import { ClockCircleOutlined } from "@ant-design/icons";
// import Pdf from "./cde.pdf";
// import Paper4 from "../../assets/images/Paper4.jpg";
// import Paper5 from "../../assets/images/Paper5.jpg";
import Button from "../../components/common/Button/Button";
import Modal from "../../components/common/Modal/Modal";
// import { ReactSketchCanvas } from "react-sketch-canvas";
import { SketchField, Tools } from "react-sketch";
import {
  UndoOutlined,
  RedoOutlined,
  SaveOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import EvaluatorServices from "api/EvaluatorServices";
import * as markerjs2 from "markerjs2";

function AssignmentDetails(props) {
  const [value, setValue] = useState([]);

  const [pages, setPages] = useState(0);
  const [activePage, setactivePage] = useState(1);
  const [assignmentDetails, setAssignmentDetails] = useState({});
  const [url, setUrl] = useState(null);
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [media, setMedia] = useState([]);
  const [marker, setmarker] = useState(null);
  const [dataUrl, setdataUrl] = useState();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const [modal, setModal] = useState(false);

  const ref = useRef();

  // const [dataurl, setDataUrl] = useState([]);

  const toggle = () => {
    setModal(!modal);
  };

  // const styles = {
  //   background: `url(${Paper4}) center/80%`,
  // };

  // const draw = useRef();

  // var sketch;

  function toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  }

  useEffect(() => {
    sessionStorage.clear();
    props.collapseTrue();
    setAssignmentDetails(props.location.state);
    setPages(props.location.state.mission_media.length);

    const Tag = props.location.state.evaluator_tags.map((tag) => {
      return {
        name: tag,
        clicked: false,
      };
    });
    Tag.push({ name: "Add Remark", clicked: false });
    setTags(Tag);

    const Data = props.location.state.mission_question.map((res, i) => {
      return {
        // id: i,
        evaluator_point: -1,
        mission_question_id: null,
      };
    });

    props.location.state.mission_media.map((res, i) => {
      toDataURL(res.url1, (value) => {
        // let DataUrl = dataUrl;
        // DataUrl.push(value);
        setdataUrl(value);

        let Data = dataURLtoFile(value, `file${i + 1}.png`);
        const data = media;
        data.push({ id: i + 1, image: Data });
        setMedia([...data]);
      });
    });

    setValue(Data);

    setImage(props.location.state.mission_media[0].url1);
  }, []);

  useEffect(() => {
    // sketch.clear();
    // if (props.location.state.mission_media.length > 0) {
    //   toDataURL(
    //     props.location.state.mission_media[activePage - 1].url1,
    //     (value) => {
    //       setUrl(value);
    //     }
    //   );
    //   sketch.addImg(url);
    // }
    const ReverseMedia = data.slice().reverse();
    const filteredArr = ReverseMedia.reduce((acc, current) => {
      const x = acc.find((item) => item.id === current.id);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);

    const images = filteredArr.filter((x) => x.id === activePage);

    if (images.length > 0) {
      setImage(images[0].dataUrl);
    } else {
      setImage(props.location.state.mission_media[activePage - 1].url1);
    }
  }, [activePage]);

  // useEffect(() => {
  //   sketch.clear();
  //   sketch.addImg(url);
  // }, [url]);

  // const images = [Paper4, Paper5, Paper4, Paper4, Paper5];

  const showMarkerArea = () => {
    if (document.getElementById("img") !== null) {
      // create a marker.js MarkerArea
      const markerArea = new markerjs2.MarkerArea(
        document.getElementById("img")
      );
      setmarker(markerArea);
      markerArea.addRenderEventListener((dataUrl, state) => {
        if (document.getElementById("img")) {
          document.getElementById("img").src = dataUrl;
        }
        var file = dataURLtoFile(dataUrl, `file${activePage}.png`);

        const Data = media;

        Data.push({ id: activePage, image: file });
        setMedia([...Data]);
        // sessionStorage.setItem(`image${activePage}url`, dataUrl);
        // sessionStorage.setItem(`image${activePage}`, JSON.stringify(state));
        const DataArray = data;
        DataArray.push({
          id: activePage,
          dataUrl: dataUrl,
          states: state,
        });
        setData([...DataArray]);
      });
      // launch marker.js

      markerArea.show();

      markerArea.coverDiv.className = props.collapse
        ? "markerjs2-collapse"
        : "markerjs2";

      // if (JSON.parse(sessionStorage.getItem(`image${activePage}`))) {
      //   markerArea.restoreState(
      //     JSON.parse(sessionStorage.getItem(`image${activePage}`))
      //   );
      // }

      const ReverseMedia = data.slice().reverse();
      const filteredArr = ReverseMedia.reduce((acc, current) => {
        const x = acc.find((item) => item.id === current.id);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);

      const state = filteredArr.filter((x) => x.id === activePage);

      if (state.length > 0) {
        markerArea.restoreState(state[0].states);
      }
    }
  };

  useEffect(() => {
    marker && marker.close();
  }, [activePage]);

  useEffect(() => {
    marker && marker.close();
  }, [props.collapse]);

  const PageHandler = (page) => {
    setactivePage(page);
  };

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  const submitHandler = () => {
    // Create an array of objects

    const ReverseMedia = media.slice().reverse();
    const filteredArr = ReverseMedia.reduce((acc, current) => {
      const x = acc.find((item) => item.id === current.id);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);

    const SortArray = filteredArr.sort(function (a, b) {
      return a.id - b.id;
    });

    const ApiImage = SortArray.map((res) => {
      return res.image;
    });

    const Tags = tags.filter((res) => res.clicked === true);
    const ApiTags = Tags.map((res) => {
      return res.name;
    });
    var promise = new Promise(function (resolve, reject) {
      value.map((res) => {
        if (res.evaluator_point === -1) {
          reject("Please Evaluate All The Questions");
        }
      });
      resolve(true);
    });

    promise
      .then((res) => {
        setLoading(true);
        const remark = sessionStorage.getItem("remark");
        const params = {
          mission_evaluation: JSON.stringify(value),
          remark: remark,
          evaluation_tag: ApiTags,
          // media: ApiImage,
          mission_id: assignmentDetails.mission_id,
          user_id: assignmentDetails.user_id,
          mission_name: assignmentDetails.user_mission_id,
        };
        const formData = new FormData();
        for (let key in params) {
          formData.append(key, params[key]);
        }
        ApiImage.forEach((image) => {
          formData.append(`media`, image);
        });
        EvaluatorServices.submitEvaluation(formData).then((res) => {
          if (res.data.status === 0) {
            message.error(res.data.message);
            setLoading(false);
          } else {
            message.success(res.data.message);
            setLoading(false);
            props.history.push("/dashboard");
          }
        });
      })
      .catch((error) => {
        message.error(error);
        setLoading(false);
      });
  };

  return (
    <AssigmentDetailsWrapper>
      <div className="Monts-Bold fs-24 dark-blue ">
        Assignment Details - {assignmentDetails.user_mission_id}
      </div>
      <div className="mt-10 card">
        {/* <div className="ma-10 fs-18 dark-blue Monts-Bold">
          Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
          consectetur.
        </div>
        <div className="ma-10">
          <Tag
            color="#658bb1"
            style={{
              fontFamily: "Montserrat-Regular",
              fontSize: "14px",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            Maths
          </Tag>
          <Tag
            color="#658bb1"
            style={{
              fontFamily: "Montserrat-Regular",
              fontSize: "14px",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            Algebra
          </Tag>
        </div>
        <div className="mlr-10 pb-10 flex center color Monts-Regular fs-14">
          <ClockCircleOutlined /> &nbsp; 23rd June 2019
        </div>
        <div>
          <Divider />
        </div> */}
        <div className="grid">
          <div className="pa-20 grid-3">
            <div style={{ overflow: "auto", height: "500px" }}>
              {assignmentDetails.mission_question &&
                assignmentDetails.mission_question.map((res, i) => {
                  return (
                    <div
                      className="flex ptb-10 mt-10"
                      style={{
                        background: "white",
                        justifyContent: "space-around",
                        height: "fit-content",
                      }}
                    >
                      <div className="circle">{i + 1}</div>
                      <Radio.Group
                        value={value[i] ? value[i].evaluator_point : -1}
                        onChange={(e) => {
                          // setValue([value, e.target.value]);
                          // Radios.push
                          const data = value;
                          data[i].evaluator_point = e.target.value;
                          data[i].mission_question_id = res.mission_question_id;
                          setValue([...data]);
                        }}
                      >
                        <Space direction="vertical">
                          <Radio value={100} className="green"></Radio>
                          <Radio value={75} className="yellow"></Radio>
                          <Radio value={50} className="orange"></Radio>
                          <Radio value={0} className="red"></Radio>
                        </Space>
                      </Radio.Group>
                    </div>
                  );
                })}
            </div>
            <div style={{ overflow: "auto", height: "500px" }}>
              {/* <div className="pb-10 flex">
                <Space>
                  <Buttons
                    type="primary"
                    onClick={() => {
                      sketch.undo();
                    }}
                    icon={<UndoOutlined />}
                  >
                    Undo
                  </Buttons>
                  <Buttons
                    type="primary"
                    onClick={() => {
                      sketch.zoom(1.25);
                    }}
                    icon={<PlusCircleOutlined />}
                  >
                    Zoom
                  </Buttons>
                  <Buttons
                    type="primary"
                    onClick={() => {
                      sketch.zoom(0.6);
                    }}
                    icon={<MinusCircleOutlined />}
                  >
                    Zoom
                  </Buttons>
                  <Buttons
                    type="primary"
                    onClick={() => sketch.redo()}
                    icon={<RedoOutlined />}
                  >
                    Redo
                  </Buttons>
                  <Buttons
                    type="primary"
                    onClick={() => {
                      var file = dataURLtoFile(
                        sketch.toDataURL(),
                        `file${activePage}.png`
                      );

                      const Data = media;

                      // Data.length > 0
                      //   ? Data.map((res) => {
                      //       if (res.id === activePage) {
                      //       } else {
                      //         Data.push({ id: activePage, image: file });
                      //       }
                      //     })
                      //   : Data.push({ id: activePage, image: file });
                      // Data.push({ id: activePage, image: file });
                      // Data.length > 0
                      //   ? Data. Data.splice(activePage - 1, 0, file)
                      //   : Data.push({ id: activePage, image: file });
                      Data.push({ id: activePage, image: file });
                      setMedia([...Data]);
                    }}
                    icon={<SaveOutlined />}
                  >
                    Save
                  </Buttons>
                </Space>
              </div> */}
              {/* <SketchField
                // width="1024px"
                // height="768px"
                tool={Tools.Pencil}
                lineColor="red"
                lineWidth={2}
                height="1500px"
                width="1000px"
                ref={(c) => (sketch = c)}
              /> */}

              <img
                ref={ref}
                src={
                  // sessionStorage.getItem(`image${activePage}url`)
                  //   ? sessionStorage.getItem(`image${activePage}url`)
                  //   : image && image
                  image && image
                }
                alt="sample"
                id="img"
                width={props.collapse ? 500 : 390}
                crossorigin="anonymous"
                onClick={() => showMarkerArea()}
              />
            </div>
          </div>
          <div>
            <Divider type="vertical" />
          </div>
          <div className="pa-10 ">
            {/* <Document
              file={Pdf}
              onLoadError={(error) => {
              }}
            >
              <Page pageNumber={pageNumber} width="500" />
            </Document> */}
            <div className="background">
              <div className="pdf-hover">Reference File</div>
            </div>
            <iframe
              id="scroll"
              src={`${assignmentDetails.answer_file_url}#toolbar=0`}
              style={{ border: "none" }}
              width="100%"
              // height="100%"
              height="500"
              // className="relative"
            />
          </div>
        </div>
      </div>
      <div className=" pt-10 ml-100">
        <Pagination
          defaultCurrent={1}
          total={pages}
          defaultPageSize={1}
          current={activePage}
          onChange={PageHandler}
        />
        {/* {images.map((res) => {
          return (
            <div>
              <img src={res} width="150" height="150" alt="loading..." />
            </div>
          );
        })} */}
      </div>
      <div className="pt-10 Monts-Medium fs-16">
        Click on the below tags only if you think the student is not clear with
        these concepts.
      </div>
      <div className="pt-10">
        {tags.map((res, i) => {
          return (
            <Tag
              color={res.clicked ? "#213861" : "#658bb1"}
              style={{
                fontFamily: "Montserrat-Regular",
                fontSize: "14px",
                padding: "5px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() => {
                if (res.name === "Add Remark") {
                  toggle();
                } else {
                  const tag = tags;
                  tag[i].clicked = !tag[i].clicked;
                  setTags([...tag]);
                }
              }}
            >
              {res.name}
            </Tag>
          );
        })}
      </div>
      <div className="text-center pt-40">
        <Button
          width="400"
          text="Submit"
          loading={loading}
          onClick={() => {
            submitHandler();
          }}
        ></Button>
      </div>
      <Modal isOpen={modal} toggle={toggle} title="Add Remark" width={500} />
    </AssigmentDetailsWrapper>
  );
}
export default withRouter(AssignmentDetails);
