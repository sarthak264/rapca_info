import styled from "styled-components";
import Paper4 from "../../assets/images/Paper4.jpg";

const AssigmentDetailsWrapper = styled.div`
  .card {
    background-color: #f7f7f7;
  }

  .ant-divider-horizontal {
    border-top: 1px solid #d9e1e8;
    margin: 0;
  }

  .ant-divider-vertical {
    border-left: 1px solid #d9e1e8;
    margin: 0;
    display: block;
    height: 100%;
  }

  .grid {
    display: grid;
    grid-template-columns: 50% 0% 50%;
    /* justify-items: center; */
  }

  .grid-3 {
    height: 500px;
    /* overflow: auto; */
    display: grid;
    grid-template-columns: 15% 85%;
    grid-column-gap: 10px;
  }

  .grid-4 {
    display: grid;
    grid-template-columns: 30% 70%;
    justify-items: center;
    padding-top: 10px;
    grid-row-gap: 10px;
  }

  .circle {
    border-radius: 50%;
    width: 24px;
    height: 24px;
    border-radius: 23px;
    border: solid 1px #658bb1;
    text-align: center;
  }

  .ant-radio-inner {
    width: 24px;
    height: 24px;
  }

  .green {
    .ant-radio-inner {
      border-width: 3px;
      border-radius: 50%;
      border-style: solid;
      border-color: #44cb54;
    }

    .ant-radio-checked .ant-radio-inner {
      background: #44cb54 !important ;
    }
    .ant-radio-checked .ant-radio-inner:after {
      background: none;
    }
  }

  .yellow {
    .ant-radio-inner {
      border-width: 3px;
      border-radius: 50%;
      border-style: solid;
      border-color: #d5ca52;
    }

    .ant-radio-checked .ant-radio-inner {
      background: #d5ca52 !important ;
    }

    .ant-radio-checked .ant-radio-inner:after {
      background: none;
    }
  }

  .orange {
    .ant-radio-inner {
      border-width: 3px;
      border-radius: 50%;
      border-style: solid;
      border-color: #ea9f28;
    }

    .ant-radio-checked .ant-radio-inner {
      background: #ea9f28 !important ;
    }

    .ant-radio-checked .ant-radio-inner:after {
      background: none;
    }
  }

  .red {
    .ant-radio-inner {
      border-width: 3px;
      border-radius: 50%;
      border-style: solid;
      border-color: #cc2d2d;
    }

    .ant-radio-checked .ant-radio-inner {
      background: #cc2d2d !important ;
    }

    .ant-radio-checked .ant-radio-inner:after {
      background: none;
    }
  }

  /* .ant-radio-checked .ant-radio-inner {
    border-color: red !important ;
  }

  .ant-radio-checked .ant-radio-inner:after {
    background-color: red;
    transform: scale(2.5);
  }

  .ant-radio:hover .ant-radio-inner {
    border-color: red;
  } */

  .background {
    background: linear-gradient(
      to bottom,
      #000000,
      rgba(0, 0, 0, 0.4) 57%,
      rgba(255, 255, 255, 0) 112%
    );

    width: 49%;
    height: 70px;
    padding: 10px;
    position: absolute;
  }

  .pdf-hover {
    width: 30%;
    color: white;
    float: right;
    border: 1px solid white;
    font-size: 12px;
    font-family: "Montserrat-SemiBold";
    text-align: center;
    border-radius: 5px;
    padding: 5px;
  }

  iframe {
    scrollbar-face-color: #ff8c00;
    scrollbar-track-color: #fff8dc;
    scrollbar-arrow-color: #ffffff;
    scrollbar-highlight-color: #fff8dc;
    scrollbar-shadow-color: #d2691e;
    scrollbar-3dlight-color: #ffebcd;
    scrollbar-darkshadow-color: #8b0000;
  }

  /* body.embed {
    margin: 0 !important;
    overflow: hidden !important;
    background: none !important;
  } */

  /* #scroller::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }

  #scroller::-webkit-scrollbar {
    width: 6px;
    background-color: #f5f5f5;
  } */

  /* .relative::-webkit-scrollbar {
    width: 11px;
  }
  .relative {
    scrollbar-width: thin;
    scrollbar-color: var(--thumbBG) var(--scrollbarBG);
  }
  .relative::-webkit-scrollbar-track {
    background: var(--scrollbarBG);
  }
  .relative::-webkit-scrollbar-thumb {
    background-color: var(--thumbBG);
    border-radius: 6px;
    border: 3px solid var(--scrollbarBG);
  } */

  .grid-2 {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    grid-column-gap: 5px;
  }

  /* svg {
    background: url(${Paper4}) center/80% !important;
  } */

  .ant-btn-primary {
    background: #658bb1;
    border-color: #658bb1;
  }

  .__markerjs2_ {
    font-size: 16px;
    position: absolute;
    top: 167px !important;
    height: 500px !important;
    left: 510px !important;
    width: 390px;
    z-index: 5;
    overflow: scroll;
  }
`;

export default AssigmentDetailsWrapper;
