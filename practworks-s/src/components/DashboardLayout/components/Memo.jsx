import React, { useState, useEffect } from "react";
import { CarouselProvider, Slider, Slide, DotGroup } from "pure-react-carousel";
import { useMediaQuery } from "react-responsive";
import EvaluatorServices from "api/EvaluatorServices";
import PdfModal from "components/common/PdfModal/PdfModal";

function Memo({ margin }) {
  const Tablet = useMediaQuery({ query: "(max-width: 991px)" });
  const MobileL = useMediaQuery({ query: "(max-width: 426px)" });
  const [memo, setMemo] = useState([]);
  const [slides, setSlides] = useState(1);
  const [modal, setModal] = useState(false);
  const [pdf, setPdf] = useState("");
  const [heading, setHeading] = useState("");
  const toggleModal = () => {
    setModal(!modal);
  };
  useEffect(() => {
    EvaluatorServices.memoList().then((res) => {
      setSlides(Math.ceil(res.data.data.length / 2));
      const n = 2; //tweak this to add more items per line
      const result = new Array(Math.ceil(res.data.data.length / n))
        .fill()
        .map((_) => res.data.data.splice(0, n));

      setMemo(result);
    });
  }, []);
  return (
    <div
      className={
        MobileL ? "Card-Layout-m" : Tablet ? "Card-Layout-t" : "Card-Layout"
      }
      style={{ margin: `${margin ? "35px 40px" : "0px"}`, width: "auto" }}
    >
      <div
        className="Monts-Bold fs-17 pa-15"
        style={{
          background: "#557596",
          borderRadius: "15px 15px 0 0",
        }}
      >
        Memo
      </div>
      <div className="pa-20">
        <CarouselProvider
          naturalSlideWidth={Tablet ? 120 : 100}
          naturalSlideHeight={MobileL ? 200 : Tablet ? 170 : 70}
          dragStep={1}
          totalSlides={slides}
        >
          <Slider>
            {memo &&
              memo.map((res, i) => {
                return (
                  <Slide index={i} key={i} style={{ paddingBottom: "400px" }}>
                    {res.map((result, i) => {
                      return (
                        <div
                          key={i}
                          style={
                            result.is_read
                              ? {
                                  display: "flex",
                                  padding: "5px",
                                  margin: "5px 0",
                                }
                              : {
                                  display: "flex",
                                  padding: "10px 5px",
                                  margin: "5px 0",
                                  background: "#557596",
                                }
                          }
                        >
                          <div className="rectangle" /> &nbsp;
                          {result.type === "text" ? (
                            <div className="Monts-Regular fs-14">
                              {result.message.body}
                            </div>
                          ) : (
                            <p
                              style={{
                                color: "#F2F5F9",
                                width: "229px",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                toggleModal();
                                setPdf(result.message.body);
                                setHeading(result.message.title);
                              }}
                            >
                              {result.message.title}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </Slide>
                );
              })}
          </Slider>
          <DotGroup />
        </CarouselProvider>
      </div>
      <PdfModal
        isOpen={modal}
        toggle={toggleModal}
        pdf={pdf}
        heading={heading}
        title="Current Mission"
        buttons={false}
      />
    </div>
  );
}

export default Memo;
