import styled from "styled-components";

const CardBoxWrapper = styled.div`
  .box {
    width: 844px;
    height: 280px;
    border-radius: 15px;
    box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.16);
    background-color: #ffffff;
    position: relative;
  }

  .paddingLeft {
    margin: 272.9px 2px 39px 0;
    padding: 60px 95.5px 48.4px 135.5px;
  }

  .paddingRight {
    margin: 187.7px 0 46.3px;
    padding: 60px 221.5px 48.1px 79.5px;
  }

  .imageLeft {
    position: absolute;
    top: -80px;
    left: 0px;
  }

  .imageRight {
    position: absolute;
    top: -112px;
    right: 0px;
  }

  .borderRight {
    position: absolute;
    top: 130px;
    right: -160px;
    height: 242px;
    width: 160px;
    opacity: 0.3;
    border-right: 5px dotted #4d6898;
    border-top: 5px dotted #4d6898;
  }

  .borderLeft {
    position: absolute;
    top: 130px;
    left: -160px;
    opacity: 0.3;
    border-left: 5px dotted #4d6898;
    height: 242px;
    width: 160px;
    border-top: 5px dotted #4d6898;
  }

  .boxL {
    width: auto;
    height: 300px;
    border-radius: 15px;
    box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.16);
    background-color: #ffffff;
    position: relative;
  }

  .paddingLeftL {
    margin: 50px 10px;
    padding: 60px 20px;
  }

  .paddingRightL {
    margin: 50px 10px;
    padding: 60px 20px;
  }

  .imageLeftL {
    position: absolute;
    top: -60px;
    left: 0px;
  }

  .imageRightL {
    position: absolute;
    top: -60px;
    right: 0px;
  }
`;

export default CardBoxWrapper;
