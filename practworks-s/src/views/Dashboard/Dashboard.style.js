import styled from "styled-components";

const DashboardWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-column-gap: 20px;
  justify-content: center;

  .ant-card {
    background: #dfe7ef;
    border-radius: 10px;
  }
`;

export default DashboardWrapper;
