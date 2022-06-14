import styled from "styled-components";

const ModalWrapper = styled.div`
  p.thin {
    font-weight: 400;
  }
  .list-wrapper {
    border: 1px solid #4d6898;
    border-radius: 10px;
    margin: 1.5rem 0 3rem 0;
  }
  .list-wrapper .header {
    background-color: #4d6898;
    color: white;
    border-radius: 10px 10px 0 0;
  }
  .list-wrapper .points {
    text-align: left;
    padding: 0.5rem 1rem;
  }
  .list-wrapper .points p {
    color: #213861;
  }
  .list-wrapper > div {
    padding: 0.5rem 0;
    text-align: center;
    border-bottom: 1px solid #4d6898;
  }
  .list-wrapper > div:last-of-type {
    border-bottom: none;
  }
  .list-wrapper .hover {
    cursor: pointer;
  }
  .rating-wrapper {
    display: flex;
    column-gap: 0.25rem;
  }
  .star .yellow {
    display: none;
  }
  .gray-bg {
    position: relative;
    z-index: 99;
    padding: 1rem 0 0;
    &::after {
      content: "";
      position: absolute;
      left: -1.5rem;
      right: -5rem;
      top: 0;
      width: calc(100% + 3rem);
      height: calc(100% + 1.5rem);
      background-color: rgb(242, 243, 243);
      border-radius: 0 0 10px 10px;
      z-index: -99;
    }
  }
  .ant-input {
    border-radius: 5px;
    background-color: rgb(231, 234, 234);
    border: none;
  }
`;

export default ModalWrapper;
