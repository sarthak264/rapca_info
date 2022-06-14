import styled from "styled-components";

const PageWrapper = styled.div`
  position: relative;
  .top {
    margin: -35px -24px 0;
    padding: 10px 25px;
    background-color: #213861;
    color: white !important;
  }
  .topic {
    text-align: center;
    margin: 0 0 10px;
  }
  .topic p {
    font-size: 20px;
  }
  .question-wrapper {
    position: relative;
    border: 1px solid #213861;
    border-radius: 12px;
    padding: 2.5rem;
    margin: 0 2rem;
  }
  .question-wrapper i {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.5rem;
  }
  .question-wrapper i.left {
    left: -2.5rem;
  }
  .question-wrapper i.right {
    right: -2.5rem;
  }
  .input {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    column-gap: 10px;
  }
  .input label {
    margin-bottom: 0 !important;
  }
  .ant-checkbox-wrapper > span {
    font-size: 20px;
  }
  p.message {
    margin: 1rem 0;
  }
  p.wrong {
    color: red;
  }
  .solution {
    font-family: "Montserrat-Regular" !important;
  }
  mjx-container[jax="CHTML"][display="true"] {
    margin: 10px 0 0 !important;
  }
  .btn-wrapper {
    max-width: 800px;
    margin: 30px auto 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default PageWrapper;
