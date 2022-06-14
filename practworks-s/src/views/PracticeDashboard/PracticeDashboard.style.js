import styled from "styled-components";

const DashboardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 15px;
  justify-content: space-between;
  margin: -10px;

  .ant-card {
    background: #dfe7ef;
    border-radius: 10px;
  }
`;

export default DashboardWrapper;
