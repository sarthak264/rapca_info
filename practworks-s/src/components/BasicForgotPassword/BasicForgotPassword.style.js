import styled from "styled-components";
import { device } from "helper/constants";

const LandingPageWrapper = styled.div`
  margin: 0;

  .divider-1 {
    width: 50%;
    background-color: #213861;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  .divider-1-100 {
    width: 50%;
    background-color: #213861;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  .divider-2 {
    width: 50%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 50px 10vw 100px 10vw;
  }

  .container {
    padding: 200px 250px 200px 100px;
  }

  .container-profile {
    padding: 70px 250px 70px 100px;
  }

  .ant-tabs-tab-btn {
    font-size: 18px;
    font-weight: bold;
    color: lightgray;
  }

  .ant-tabs-tab-btn:active {
    color: #658bb1;
  }

  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #658bb1;
  }

  .ant-tabs-ink-bar {
    background: #658bb1;
  }

  .header-login {
    font-weight: bold;
    color: #364151;
  }

  .ant-form-item-label > label {
    font-size: 16px;
    font-family: "Montserrat-Medium";
    color: rgb(186, 190, 195);
  }

  .ant-input {
    color: #213861;
    font-family: "Montserrat-SemiBold";
    border-radius: 8px;
    border: solid 1px #cdcdcd;
    background-color: #ffffff;
    height: 50px;
  }

  .ant-input-password {
    .ant-input {
      height: 35px !important;
    }
  }

  .ant-input-affix-wrapper {
    color: rgb(186, 190, 195);
    border-radius: 8px !important;
    border: solid 1px #cdcdcd;
  }

  .ant-input-number-lg {
    color: #213861;
    border-radius: 8px !important;
  }

  .terms-font {
    font-size: 12px;
    font-family: "Montserrat-Medium";
    color: rgb(186, 190, 195);
    padding: 20px 65px;
    text-align: center;
  }

  .otp-input {
    width: 50px;
    margin: 0 10px;
    padding: 15px;
  }

  .ant-select-selector {
    border-radius: 8px !important;
    border: solid 1px #cdcdcd;
    font-family: "Montserrat-SemiBold";
  }

  .ant-select-single.ant-select-lg:not(.ant-select-customize-input)
    .ant-select-selector {
    height: 50px;
    padding: 5px 11px;
    font-family: "Montserrat-SemiBold";
  }

  .ant-select-selection-item {
    color: #213861;
    font-family: "Montserrat-SemiBold";
  }

  .ant-select-single.ant-select-lg:not(.ant-select-customize-input):not(.ant-select-customize-input)
    .ant-select-selection-search-input {
    height: 50px !important;
  }

  .ant-select-selection-placeholder {
    font-family: "Montserrat-SemiBold";
    font-size: 16px;
  }

  .ant-select-selection-overflow {
    height: 50px;
  }

  .ant-tag {
    font-family: "Montserrat-Regular";
    font-size: 12px;
    padding: 5px 7px;
    border-radius: 6px;
  }

  .anticon svg {
    margin-bottom: 4px;
  }

  div {
    font-family: "Montserrat-Medium";
  }
  .divider-1-100-t {
    width: 50%;
    background-color: #213861;
    display: none;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  .divider-2-t {
    width: 100%;
    background-color: white;
    /* display: flex;
    justify-content: center;
    align-items: center; */
    padding: 50px 0px;
  }

  @media ${device.mobileL} {
    .otp-input {
      width: 40px;
      margin: 0 5px;
      padding: 15px;
    }
    .ant-input {
      color: #213861;
      font-family: "Montserrat-SemiBold";
      border-radius: 8px;
      border: solid 1px #cdcdcd;
      background-color: #ffffff;
      height: 40px;
    }
  }
`;

export default LandingPageWrapper;
