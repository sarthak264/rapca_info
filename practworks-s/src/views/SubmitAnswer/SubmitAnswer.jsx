import React, { useState, useEffect, useRef } from "react";
import { Page1Wrapper, Page2Wrapper } from "./SubmitAnswer.style";
import DashboardLogo from "../../assets/images/DashboardLogo.png";
import Button from "../../components/common/Button/Button";

function SubmitAnswer() {
  const input = useRef();
  const [images, setImages] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const captureImage = (e) => {
    console.log(e.currentTarget.files);
  };
  const fromGallery = (e) => {
    if (e.target.files && e.target.files[0]) {
      const prev = [...images];
      let urls = [];
      for (let i = 0; i < e.target.files.length; i++) {
        urls.push(URL.createObjectURL(e.target.files[i]));
      }
      console.log(e.target.files);
      setImages([...prev, ...urls]);
      setSubmitted(true);
    }
  };
  const removeImage = (i) => {
    const prev = [...images];
    prev.splice(i, 1);
    setImages(prev);
  };
  const addImages = () => {};
  useEffect(() => {
    console.log(images);
  }, [images]);
  return (
    <>
      {!submitted && (
        <Page1Wrapper>
          <div className="header">
            <img src={DashboardLogo} alt="" />
          </div>
          <input
            type="file"
            name="image1"
            id="image1"
            accept="image/*"
            className="card gallery"
            capture="user"
            ref={input}
            onChange={(e) => {
              captureImage(e);
            }}
          />
          <label htmlFor="image1" className="card gallery">
            <i className="bi bi-camera"></i>
            Camera
          </label>
          <p className="or">OR</p>
          <input
            type="file"
            name="image2"
            id="image2"
            accept="image/*"
            multiple="multiple"
            className="card gallery"
            autoComplete="off"
            onChange={(e) => {
              fromGallery(e);
            }}
          />
          <label htmlFor="image2" className="card gallery">
            <i className="bi bi-image"></i>
            Photo Gallery
          </label>
        </Page1Wrapper>
      )}
      {submitted && (
        <Page2Wrapper>
          <div className="images-container">
            {images &&
              images.map((image, i) => {
                return (
                  <div className="image-wrapper">
                    <img src={image} alt="preview image" key={i} />
                    <i
                      class="bi bi-trash-fill"
                      onClick={() => {
                        removeImage(i);
                      }}
                    ></i>
                  </div>
                );
              })}
          </div>
          <Button
            text="Add Pages"
            style={{ marginBottom: "1rem", marginTop: "2rem" }}
            onClick={addImages}
          ></Button>
          <Button text="Submit"></Button>
        </Page2Wrapper>
      )}
    </>
  );
}

export default SubmitAnswer;
