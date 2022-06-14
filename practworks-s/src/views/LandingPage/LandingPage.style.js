import { device } from "helper/constants";
import styled from "styled-components";
import background from "../../assets/images/background.png";
import imageUl from "../../assets/images/imageUl.png";
// #373a47

// #213861 - recommeded color
const LandingPageWrapper = styled.div`


.bm-burger-button {
  position: fixed;
  width: 30px;
  height: 30px;
  left: 250px;
  top: 20px;
}

/* Color/shape of burger icon bars */
.bm-burger-bars {
  background: #213861;
}

/* Color/shape of burger icon bars on hover*/
.bm-burger-bars-hover {
  background: #a90000;
}

/* Position and sizing of clickable cross button */
.bm-cross-button {
  height: 24px;
  width: 24px;
}

/* Color/shape of close button cross */
.bm-cross {
  background: #bdc3c7;
}

/*
Sidebar wrapper styles
Note: Beware of modifying this element as it can break the animations - you should not need to touch it in most cases
*/
.bm-menu-wrap {
  position: fixed;
  height: 50%;
}

/* General sidebar styles */
.bm-menu {
  background: #213861;
  padding: 2.5em 1.5em 0;
  font-size: 1.15em;
}

/* Morph shape necessary with bubble or elastic */
.bm-morph-shape {
  fill: #213861;
  background: #213861;
  width: 50%;
  position: relative;

}

/* Wrapper for item list */
.bm-item-list {
  color: #b8b7ad;
  padding: 0.8em;
}

/* Individual item */
.bm-item {
  display: inline-block;
}

/* Styling of overlay */
.bm-overlay {
  background: rgba(122, 0, 0, 0.3);
}
.bm-item {
  display: inline-block;

  color: #d1d1d1;
  margin-bottom: 10px;
  text-align: left;
  text-decoration: none;
  transition: color 0.2s;
}

.bm-item:hover {
  color: #ffffff;
}
    



  .header {
    background-color: #213861;
    height: 130px;
    width: 100%;
    align-items: center;
    display: flex;
    justify-content: center;
  }

  .hrBorder {
    /* margin: 5px 20px 0px 20px; */
    border-top: 1px solid #658bb1;
  }

  .menuList {
    display: flex;
    list-style-type: none;
    padding-top: 30px;
    float: right;
    align-items: center !important;
    white-space: nowrap;
  }


  .chevronDown {
    position: relative;
    top: 2px;
  }

  .dropdown {
    float: left;
    overflow: hidden;
  }

  .dropdown .dropbtn {
    font-size: 19px;
    border: none;
    outline: none;
    color: #658bb1;
    font-weight: bold;
    background-color: inherit;
    font-family: inherit;
    margin: 0;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }

  .dropdown-content a {
    float: none;
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    text-align: left;
  }

  .dropdown-content a:hover {
    background-color: #ddd;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }

  .menuListItem {
    display: block;
    font-size: 19px;
    letter-spacing: 2px;
    text-align: center;
    line-height: 23px;
    color: #213861;
    font-weight: bold;
    margin-left: 17px;
    letter-spacing: normal;
  }

  .menuListItem .menuNavLink {
    display: block;
    color: #658bb1;
    cursor: pointer;
    text-decoration: none;
    &:hover {
      text-decoration: none;
      color: rgba(153, 153, 153, 1);
      -webkit-transition-duration: 0.4s;
      transition-duration: 0.4s;
    }
  }
  .active {
    color: #213861 !important;
  }

  .button {
    width: 250px;
    height: 70px;
    margin: 34px 28px 72.3px 10px;
    /* padding: 24px 38px; */
    border-radius: 39px;
    background-color: #4d6898;
    font-size: 23px;
    font-weight: bold;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: 0.5px;
    color: #ffffff;
  }

  .whoChoose {
    height: 658px;
    width: 100%;
    background-image: url(${background});
    background-repeat: no-repeat;
    background-size: contain;
  }

  .video {
    box-sizing: none;
    border-radius: 20px;
    object-fit: fill;
    outline: none;
  }

  .imageUl {
    list-style-type: none;
  }

  .pointItem {
    background: url(${imageUl}) 0 3px no-repeat;
    padding-left: 40px;
    height: 50x;
    font-size: 14px;
    margin-top: 30px;
    line-height: 2.5;
    letter-spacing: normal;
    text-align: left;
    color: #658bb1;
  }

  .curvedDiv {
    margin-top: -30px;
  }

  .howItWorks {
    background-color: #f2f4f8;
    height: 1900px;
  }

  .contactUs {
    background-color: #213861;
    height: 344px;
    position: relative;
  }

  .footer {
    background-color: #1a2d4e;
    height: 50px;
  }

  .contactUsBox {
    height: 398.1px;
    position: absolute;
    top: -60px;
    padding: 36.1px 55.3px 49.1px;
    box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.16);
    background-color: #ffffff;
    border-radius: 10px;
    margin: 0 19vw;
  }

  input {
    border: 0;
    outline: 0;
    background: transparent;
    border-bottom: 1px solid rgba(112, 112, 112, 0.2);
    width: 100%;
    font-size: 20px;
    padding: 8px 0px;
    font-weight: 500;
    color: #658bb1;
  }

  input::placeholder {
    color: #658bb1 !important;
  }

  .button2 {
    background-color: #213861;
    color: #ffffff;
    font-size: 20px;
    font-weight: bold;
    padding: 13px 118px 12px;
    border-radius: 10px;
    border: none;
  }

  .footerSide {
    display: flex;
    list-style-type: none;
    float: right;
  }

  .footerListItem {
    margin-left: 10px;
    text-decoration: none;
  }

  .footerListItem a {
    cursor: pointer;
    color: #ffffff;
    text-decoration: none;
  }

  .fixed-header {
    position: fixed;
    z-index: 10;
    background: white;
    width: 100%;
  }

  .icon-height {
    height: 90px;
  }

  .left-image {
    height: 540px;
  }

  .home {
    padding-top: 140px;
  }

  .home-right {
    padding-top: 120px;
    padding-bottom: 120px;
    padding-left: 70px;
  }

  // ML

  .buttonL {
    width: 220px;
    height: 50px;
    margin: 20px 28px 0px 0px;
    /* padding: 24px 38px; */
    border-radius: 39px;
    background-color: #4d6898;
    font-size: 23px;
    font-weight: bold;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: 0.5px;
    color: #ffffff;
  }

  .button2L {
    background-color: #213861;
    color: #ffffff;
    font-size: 20px;
    font-weight: bold;
    padding: 10px 70px;
    border-radius: 10px;
    border: none;
  }

  .howItWorksL {
    background-color: #f2f4f8;
    height: 1850px;
  }

  .contactUsBoxL {
    height: 350px;
    position: absolute;
    top: -60px;
    padding: 15px;
    box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.16);
    background-color: #ffffff;
    border-radius: 10px;
    margin: 10px;
  }

  .contactUsL {
    background-color: #213861;
    height: 320px;
    position: relative;
  }

  .footerL {
    background-color: #1a2d4e;
    height: 90px;
  }

  .footerSideL {
    display: flex;
    list-style-type: none;
    /* float: right; */
    padding: 0;
  }

  .footerListItemL {
    margin-left: 5px;
    text-decoration: none;
  }

  .hrBorderL {
    /* margin: 5px 20px 0px 20px; */
    border-top: 1px solid #658bb1;
    width: 100vw !important;
  }

  .home-right-t {
    padding-top: 40px;
    padding-bottom: 40px;
    padding-left: 70px;
  }

  .contactUsBox-t {
    height: 398.1px;
    position: absolute;
    top: -60px;
    padding: 36.1px 55.3px 49.1px;
    box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.16);
    background-color: #ffffff;
    border-radius: 10px;
    margin: 0 5vw;
  }

  .icon-height-t {
    height: 72px;
  }

  .icon-heightL {
    height: 38px;
    width: 120px;
  }

  .pointItem-t {
    background: url(${imageUl}) no-repeat;
    background-size: 15px;
    height: 40px;
    padding-left: 30px;
    font-size: 11px;
    margin-top: 10px;
    line-height: 2.5;
    letter-spacing: normal;
    text-align: left;
    color: #658bb1;
  }

  .whoChoose-t {
    height: 400px;
    width: 100%;
    background-image: url(${background});
    background-repeat: no-repeat;
    background-size: contain;
  }

  .whoChooseL {
    height: 480px;
    /* width: 100%; */
    margin: 15px 10px;
    /* background-image: url(${background}); */
    background: #213861;
    background-repeat: no-repeat;
    border-radius: 15px;
  }

  .imageUlL {
    list-style-type: none;
    padding: 0;
  }
  .imageUl-t {
    list-style-type: none;
    padding: 0;
  }

  .pointItemL {
    background: url(${imageUl}) no-repeat;
    background-size: 15px;
    padding-left: 30px;
    height: 30px;
    font-size: 11px;
    margin-top: 10px;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: left;
    color: #658bb1;
  }

  .pointItemL-active {
    background: url(${imageUl}) no-repeat;
    background-size: 15px;
    height: 30px;
    padding-left: 30px;
    font-size: 11px;
    margin-top: 10px;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: left;
    color: white;
  }

  .pointItem-t-active {
    background: url(${imageUl}) no-repeat;
    background-size: 15px;
    height: 40px;
    padding-left: 30px;
    font-size: 11px;
    margin-top: 10px;
    line-height: 2.5;
    letter-spacing: normal;
    text-align: left;
    color: white;
  }

  .pointItem-active {
    background: url(${imageUl}) 0 3px no-repeat;
    padding-left: 40px;
    height: 50px;
    font-size: 14px;
    margin-top: 30px;
    line-height: 2.5;
    letter-spacing: normal;
    text-align: left;
    color: white;
  }

  .footer-t {
    background-color: #1a2d4e;
    height: 72px;
  }

  @media ${device.mobileL} {
    .icon-height {
      height: 38px;
      width: 120px;
    }
 

    .fixed-header {
      position: fixed;
      z-index: 10;
      background: white;
      width: 100vw;
    }

    .top {
      padding-top: 23px;
    }
    .menuListItem {
      display: block;
      font-size: 11px;
      letter-spacing: 2px;
      text-align: center;
      line-height: 23px;
      color: #213861;
      font-weight: bold;
      margin-left: 7px;
      letter-spacing: normal;
    }

    .left-image {
      height: 350px;
    }

    .home {
      padding-top: 100px;
    }

    .home-right {
      padding-top: 0;
      padding-bottom: 0;
      padding-left: 15px;
      text-align: center;
    }
  }
  
`;

export default LandingPageWrapper;
