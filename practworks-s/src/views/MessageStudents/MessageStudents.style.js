import styled from "styled-components";

const DashboardWrapper = styled.div`
  .color {
    color: #bababa;
  }

  th.ant-table-cell {
    font-size: 20px;
    font-family: "Montserrat-Bold";
    text-align: center;
    border-radius: 10px;
  }

  .ant-table.ant-table-bordered > .ant-table-container {
    border: 1px solid #4d6898 !important;
  }

  .ant-input {
    color: #213861;
    font-family: "Montserrat-SemiBold";
    border-radius: 8px;
    border: solid 1px #cdcdcd;
    background-color: #ffffff;
    height: 50px;
  }

  .ant-input-affix-wrapper {
    color: rgb(186, 190, 195);
    border-radius: 8px !important;
    border: solid 1px #cdcdcd;
  }
`;

export default DashboardWrapper;