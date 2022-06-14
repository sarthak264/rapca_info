import styled from "styled-components";
import { device } from "helper/constants";

const DashboardLayoutWrapper = styled.div`
  .trigger {
    /* padding: 0 24px; */
    /* font-size: 18px; */
    /* line-height: 64px; */
    transition: color 0.3s;
    display: flex;
    justify-content: "space-between" !important ;
  }

  /* .trigger:hover {
    color: #1890ff;
  } */

  .logo {
    margin: 16px 50px;
  }

  .collapse-logo {
    margin: 16px 30px;
  }

  .site-layout .site-layout-background {
    background: #fff;
  }

  .ant-layout {
    background: #213861;
  }
  .ant-layout-sider {
    background: #213861;
    /* height: 100%; */
    overflow: auto;
  }

  .ant-layout-sider-collapsed {
    width: 6% !important;
    max-width: 6% !important;
    flex: 0 0 6% !important;
  }

  .Card-Layout {
    margin: 35px 40px;
    color: white;
    background: #658bbf;
    border-radius: 10px;
    width: 270px;
  }
  .rectangle {
    height: 18px;
    border-left: 3px solid white;
    /* background-color: #ffffff; */
  }

  .site-layout .site-layout-background {
    margin: 0 !important;
  }

  .ant-layout-sider-children {
    position: absolute;
    // max-width: 25%;
  }

  .carousel__dot-group {
    display: flex;
    justify-content: center;
  }
  .carousel__dot {
    width: 5px;
    height: 12px;
    border: none;
    background: white;
    opacity: 0.5;
    border-radius: 12px;
    margin-left: 5px;
  }
  .carousel__dot--selected {
    width: 5px;
    height: 12px;
    background: white;
    opacity: 1;
    border-radius: 12px;
    margin-left: 5px;
  }

  .Card-Layout-t {
    margin: 35px 40px;
    color: white;
    background: #658bbf;
    border-radius: 10px;
    width: 240px;
  }
  .Card-Layout-m {
    margin: 35px 40px;
    color: white;
    background: #658bbf;
    border-radius: 10px;
    width: 280px;
  }

  @media ${device.mobileL} {
    .ant-layout-sider-collapsed {
      display: none;
    }

    .ant-layout-sider-children {
      max-width: 100%;
    }
  }
`;

export default DashboardLayoutWrapper;
