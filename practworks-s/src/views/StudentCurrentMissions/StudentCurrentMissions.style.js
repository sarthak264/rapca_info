import styled from "styled-components";

const PageWrapper = styled.div`
  .ant-tabs-nav {
    margin-bottom: 30px;
  }
  .ant-tabs-tab-btn {
    padding: 0.5rem 1rem !important;
    font-family: "Montserrat-SemiBold" !important;
    color: #213861;
    font-size: 1rem !important;
  }
  .ant-tabs-tab {
    background-color: #f1f1f1 !important;
    margin-left: 10px !important;
  }
  .ant-tabs-tab-active {
    background-color: #213861 !important;
    color: #fff !important;
  }
  .ant-tabs-tab-active > div {
    color: #fff !important;
  }
  .btn-wrapper {
    display: flex;
    justify-content: center;
    margin: 20px auto 0;
  }
`;

export default PageWrapper;
