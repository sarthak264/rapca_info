import CardBoxWrapper from "./CardBox.Style";
import { useMediaQuery } from "react-responsive";

const CardBox = (props) => {
  const MobileL = useMediaQuery({ query: "(max-width: 426px)" });
  const Tablet = useMediaQuery({ query: "(max-width: 991px)" });

  return (
    <CardBoxWrapper>
      <div
        className={
          MobileL
            ? [
                "boxL mt-50",
                props.float === "right"
                  ? "pull-right paddingRightL"
                  : "pull-left paddingLeftL ",
              ].join(" ")
            : Tablet
            ? [
                "boxL mt-100",
                props.float === "right"
                  ? "pull-right paddingRightL"
                  : "pull-left paddingLeftL ",
              ].join(" ")
            : [
                "box mt-100",
                props.float === "right"
                  ? "pull-right paddingRight"
                  : "pull-left paddingLeft ",
              ].join(" ")
        }
      >
        <img
          src={props.image}
          height={MobileL ? "120px" : Tablet ? "150px" : "180px"}
          alt="loading..."
          className={
            Tablet
              ? props.float === "right"
                ? "imageRightL"
                : "imageLeftL"
              : props.float === "right"
              ? "imageRight"
              : "imageLeft"
          }
        />
        <div
          className={
            MobileL
              ? "fs-18  Monts-Bold blue--text"
              : Tablet
              ? "fs-20  Monts-Bold blue--text"
              : "fs-22  Monts-Bold blue--text"
          }
        >
          {props.mainTitle}
        </div>

        <div
          className={
            MobileL
              ? "fs-10 mt-10 Monts-Medium lightBlue--text "
              : "fs-14 mt-10 Monts-Medium lightBlue--text "
          }
        >
          {props.subTitle}
        </div>
        {props.lastElement ? (
          ""
        ) : (
          <div
            className={
              MobileL
                ? ""
                : Tablet
                ? ""
                : props.float === "right"
                ? "borderLeft"
                : "borderRight"
            }
          ></div>
        )}
      </div>
    </CardBoxWrapper>
  );
};

export default CardBox;
