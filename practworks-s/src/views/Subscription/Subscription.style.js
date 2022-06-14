import styled from "styled-components";

const DashboardWrapper = styled.div`
  .grid {
    display: grid;
    grid-template-columns: auto auto auto;
    grid-column-gap: 20px;
    justify-content: left;
  }

  .ant-card {
    background: #dfe7ef;
    border-radius: 10px;
    border: solid 1px #bababa;
  }

  .color {
    color: #bababa;
  }

  li::marker {
    color: #213861;
    font-size: 18px;
  }

  .clicked {
    border: 2px solid #213861;
  }

  .grid-t {
    display: grid;
    grid-template-columns: 80%;
    grid-row-gap: 20px;
    justify-content: center;
  }
`;

export default DashboardWrapper;
