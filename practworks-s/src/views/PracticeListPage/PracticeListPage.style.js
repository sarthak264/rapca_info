import styled from "styled-components";

const PageWrapper = styled.div`
  .btn-wrapper {
    display: flex;
    justify-content: center;
    margin: 20px auto 0;
  }
  .loading {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 999;
  }
  .card {
    border-radius: 12px;
    border: 1px solid #213861;
  }
  .header {
    padding: 1rem 0;
    background-color: #213861;
    color: white;
    text-align: center;
    border-radius: 12px 12px 0 0;
  }
  .input-wrapper .ant-select {
    border-radius: 0 0 12px 12px !important;
    border: 1px solid #213861;
  }
  .options {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
  .options p {
    padding: 0.5rem 0;
    cursor: pointer;
  }
  .options p:nth-of-type(2) {
    border-right: 1px solid #213861;
    border-left: 1px solid #213861;
    padding: 0.75rem;
  }
  .ant-select {
    color: #fff;
    background: #213861;
    border: none;
    border-radius: 4px !important;
  }
  .input-wrapper .ant-select {
    color: #213861;
    background: white;
  }
  .ant-select-selector {
    background: transparent !important;
    border: none !important;
    border-radius: 4px !important;
    cursor: pointer;
  }
  span.ant-select-selection-placeholder {
    font-family: "Montserrat-Regular" !important;
    font-size: 0.9rem !important;
    color: white !important;
  }
  .input-wrapper span.ant-select-selection-placeholder {
    color: #213861 !important;
  }
  .ant-select-suffix svg {
    fill: white !important;
    strokewidth: 2px !important;
  }
  .input-wrapper .ant-select-suffix svg {
    fill: #213861 !important;
  }
  .ant-select-selection-item {
    font-family: "Montserrat-Regular" !important;
  }
`;

export default PageWrapper;
