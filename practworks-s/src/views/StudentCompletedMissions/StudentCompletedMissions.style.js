import styled from "styled-components";

const PageWrapper = styled.div`
  .ant-table-row {
    cursor: pointer;
  }
  .ant-select {
    color: #fff;
    background: #213861;
    border: none;
    border-radius: 4px !important;
  }
  .ant-select-selector {
    background: transparent !important;
    border: none !important;
    border-radius: 4px !important;
  }
  span.ant-select-selection-placeholder {
    font-size: 0.9rem !important;
    color: white !important;
  }
  .ant-select-suffix svg {
    fill: white !important;
    strokewidth: 2px !important;
  }
  .ant-select-selection-item {
    font-family: "Montserrat-Regular" !important;
  }
  .btn-wrapper {
    display: flex;
    justify-content: center;
    margin: 20px auto 0;
  }
`;

export default PageWrapper;
