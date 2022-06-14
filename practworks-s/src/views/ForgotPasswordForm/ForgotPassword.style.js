import styled from "styled-components";

const ForgotPasswordWrapper = styled.div`
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

  .terms-font {
    font-size: 12px;
    font-family: "Montserrat-Medium";
    color: rgb(186, 190, 195);
    padding: 20px 65px;
    text-align: center;
  }

  .ant-select-single.ant-select-open .ant-select-selection-item {
    font-family: "Montserrat-SemiBold";
  }

  .ant-select-single.ant-select-show-arrow .ant-select-selection-item,
  .ant-select-single.ant-select-show-arrow .ant-select-selection-placeholder {
    font-family: "Montserrat-SemiBold";
  }

  .ant-input-group-addon:first-child {
    background-color: #e8eaef;
    border-radius: 8px;
  }
  .ant-input-group {
    border-radius: 8px;
    border: solid 1px #cdcdcd;
  }

  .ant-input-group > .ant-input:last-child,
  .ant-input-group-addon:last-child {
    border: none;
  }

  .ant-form-item-explain {
    font-family: "Montserrat-Medium" !important;
  }

  div {
    font-family: "Montserrat-Medium";
  }

  span {
    font-family: "Montserrat-Medium";
  }

  .ant-form-item-has-error .ant-input-group-addon {
    color: black;
    border-color: transparent;
  }
`;

export default ForgotPasswordWrapper;
