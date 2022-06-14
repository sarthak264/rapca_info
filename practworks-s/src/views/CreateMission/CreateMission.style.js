import styled from "styled-components";

const PageWrapper = styled.div`
  .loading {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 999;
  }
  .modal-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
  }
  .modal-wrapper {
    margin: 0 auto;
    padding: 1rem;
    display: flex;
    justify-content: center;
    column-gap: 2rem;
    border: 1px solid black;
    box-shadow: 0px 9px 32px 1px rgba(0, 0, 0, 0.1);
  }
  .option-wrapper {
    margin-bottom: 1rem;
  }
  .option-wrapper p {
    margin-bottom: 5px;
  }
  .inputs-wrapper {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 1rem;
  }
  .submit-btn {
    background-color: #213861 !important;
  }
  .select-btn {
    border: 2px solid #213861 !important;
    background-color: #fff !important;
    color: #213861 !important;
  }
  .ant-select-selection-placeholder {
    font-family: "Montserrat-Regular";
  }
  .ant-select-selection-item {
    font-family: "Montserrat-Regular" !important;
  }
`;
export default PageWrapper;
