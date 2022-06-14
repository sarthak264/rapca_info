import styled from "styled-components";

const DashboardWrapper = styled.div`
  .grid {
    display: grid;
    grid-template-columns: auto auto auto;
    grid-column-gap: 20px;
  }
  .ant-card {
    border-radius: 10px;
  }

  .ant-card-body {
    padding: 0px;
  }

  .color {
    color: #bababa;
  }

  .bottom-button {
    background: #4d6898;
    text-align: center;
    color: white;
    border-radius: 0 0 10px 10px;
    padding: 10px;
  }
`;

export default DashboardWrapper;
