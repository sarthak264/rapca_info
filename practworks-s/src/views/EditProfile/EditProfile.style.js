import styled from "styled-components";

const EditProfileWrapper = styled.div`
  .grid {
    display: grid;
    grid-template-columns: 48% 4% 43%;
    justify-content: start;
    text-align: left;
    margin-top: 20px;
    grid-column-gap: 20px;
  }

  .ant-form-item-label > label {
    font-size: 16px;
    font-family: "Montserrat-Medium";
    color: rgb(186, 190, 195);
  }

  .ant-input {
    color: #213861 !important;
    font-family: "Montserrat-SemiBold";
    border-radius: 8px;
    border: solid 1px #cdcdcd;
    background-color: #ffffff !important;
    height: 50px;
  }

  .ant-input-affix-wrapper {
    color: rgb(186, 190, 195);
    border-radius: 8px !important;
    border: solid 1px #cdcdcd;
  }

  .ant-select-single.ant-select-open .ant-select-selection-item {
    font-family: "Montserrat-SemiBold";
  }

  .ant-select-single.ant-select-show-arrow .ant-select-selection-item,
  .ant-select-single.ant-select-show-arrow .ant-select-selection-placeholder {
    font-family: "Montserrat-SemiBold";
  }

  .ant-select-selector {
    border-radius: 8px !important;
    border: solid 1px #cdcdcd;
    font-family: "Montserrat-SemiBold";
  }

  .ant-select-selection-item {
    color: #213861;
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

  .ant-select-single.ant-select-lg:not(.ant-select-customize-input):not(.ant-select-customize-input)
    .ant-select-selection-search-input {
    height: 50px !important;
  }

  .ant-select-selection-placeholder {
    font-family: "Montserrat-SemiBold";
    font-size: 16px;
  }

  .ant-select-single.ant-select-lg:not(.ant-select-customize-input)
    .ant-select-selector {
    height: 50px;
    padding: 5px 11px;
    font-family: "Montserrat-SemiBold";
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
`;

export default EditProfileWrapper;
