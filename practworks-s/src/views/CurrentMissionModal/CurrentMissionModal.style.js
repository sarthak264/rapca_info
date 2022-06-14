import styled from "styled-components";

const ModalWrapper = styled.div`
  margin: -1.5rem;
  overflow: hidden;
  .react-pdf__Page {
    display: flex;
    justify-content: center;
  }
  .navigation-btns {
    background-color: transparent;
    color: lightgray;
    border-radius: 12px;
    height: 50px;
    border: none;
    width: 100%;
    font-size: 1.25rem;
  }
  .navigation-btns.active {
    color: black;
  }
  .navigation-btns.bigger {
    font-size: 1.5rem;
  }
  .submit-btn {
    background-color: #213861 !important;
  }
  .cancel-btn {
    border: 2px solid #213861 !important;
    background-color: #fff !important;
    color: #213861 !important;
  }
`;

export default ModalWrapper;
