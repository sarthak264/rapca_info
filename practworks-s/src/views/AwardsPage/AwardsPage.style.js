import styled from "styled-components";

const PageWrapper = styled.div`
  .awards-container {
    position: relative;
    display: flex;
    justify-content: space-evenly;
    background: #213861;
    padding-bottom: 30px;
    padding-top: 35px;
    margin-top: -35px;
    margin-bottom: 20px;
    color: white;
  }
  .absolute-wrapper {
    position: relative;
  }
  .info-btn {
    position: absolute;
    top: 50%;

    right: 2rem;
  }
  .info-btn > i {
    cursor: pointer;
  }
  .awards-container > div {
    text-align: center;
  }
  .award-img {
    width: 3rem;
    height: 3rem;
    margin-bottom: 10px;
  }
  .stars {
    display: flex;
    justify-content: center;
    /* column-gap: 1rem; */
  }
  .list-item {
    padding: 0.5rem 1rem;
    display: flex;
    justify-content: space-between;
  }
  .list-item.gray {
    background-color: lightgray;
  }
  p.index {
    width: 20px;
  }
  .name-wrapper {
    display: flex;
    column-gap: 0.75rem;
    align-items: center;
  }
  .name-wrapper img {
    width: 25px;
  }
  .user-img {
    height: 1.5rem;
  }
  .left {
    display: flex;
    column-gap: 1rem;
  }
`;

export default PageWrapper;
