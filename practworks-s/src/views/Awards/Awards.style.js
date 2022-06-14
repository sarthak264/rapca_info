import styled from "styled-components";

const DashboardWrapper = styled.div`
  .color {
    color: #bababa;
  }

  th.ant-table-cell {
    font-size: 20px;
    font-family: "Montserrat-Bold";
    text-align: center;
  }

  .ant-table-thead > tr > th {
    background: #e8eaef;
    border: 1px solid rgb(77, 104, 152, 0.26) !important;
  }

  .ant-table-tbody > tr > td {
    border-bottom: 1px solid rgb(77, 104, 152, 0.26) !important;
  }

  .ant-table.ant-table-bordered > .ant-table-container {
    /* border: 1px solid rgb(77, 104, 152, 0.26) !important; */
    /* border-radius: 12px; */
    border: none;
  }

  .border {
    border: 1px solid rgb(77, 104, 152, 0.26) !important;
  }

  .ant-table-container table > thead > tr:first-child th:first-child {
    border-top-left-radius: 12px;
  }

  .ant-table-container table > thead > tr:first-child th:last-child {
    border-top-right-radius: 12px;
  }

  .ant-table.ant-table-bordered
    > .ant-table-container
    > .ant-table-content
    > table
    > thead
    > tr
    > th,
  .ant-table.ant-table-bordered
    > .ant-table-container
    > .ant-table-header
    > table
    > thead
    > tr
    > th,
  .ant-table.ant-table-bordered
    > .ant-table-container
    > .ant-table-body
    > table
    > thead
    > tr
    > th,
  .ant-table.ant-table-bordered
    > .ant-table-container
    > .ant-table-content
    > table
    > tbody
    > tr
    > td,
  .ant-table.ant-table-bordered
    > .ant-table-container
    > .ant-table-header
    > table
    > tbody
    > tr
    > td,
  .ant-table.ant-table-bordered
    > .ant-table-container
    > .ant-table-body
    > table
    > tbody
    > tr
    > td,
  .ant-table.ant-table-bordered
    > .ant-table-container
    > .ant-table-content
    > table
    > tfoot
    > tr
    > th,
  .ant-table.ant-table-bordered
    > .ant-table-container
    > .ant-table-header
    > table
    > tfoot
    > tr
    > th,
  .ant-table.ant-table-bordered
    > .ant-table-container
    > .ant-table-body
    > table
    > tfoot
    > tr
    > th,
  .ant-table.ant-table-bordered
    > .ant-table-container
    > .ant-table-content
    > table
    > tfoot
    > tr
    > td,
  .ant-table.ant-table-bordered
    > .ant-table-container
    > .ant-table-header
    > table
    > tfoot
    > tr
    > td,
  .ant-table.ant-table-bordered
    > .ant-table-container
    > .ant-table-body
    > table
    > tfoot
    > tr
    > td {
    border-right: 1px solid rgb(77, 104, 152, 0.26) !important;
    border-left: 1px solid rgb(77, 104, 152, 0.26) !important;
  }
`;

export default DashboardWrapper;
