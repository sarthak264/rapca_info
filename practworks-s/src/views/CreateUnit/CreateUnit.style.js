import styled from "styled-components";

const PageWrapper = styled.div`
  .option-wrapper {
    margin-bottom: 1rem;
  }
  .option-wrapper p {
    margin-bottom: 5px;
  }
  .inputs-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
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
export default PageWrapper;
