import styled from "styled-components";

const ModalWrapper = styled.div`
  margin: -1.5rem;
  .section-title {
    background-color: #213861;
    text-align: center;
    padding: 0.5rem 0;
    border-left: 1px solid white;
    border-right: 1px solid white;
  }
  .section-title h4 {
    color: white;
  }
  .award-wrapper {
    display: flex;
    justify-content: center;
    column-gap: 1rem;
    background-color: #ffc000;
    padding: 0.25rem 0;
    border: 1px solid white;
    /* border-bottom: 1px solid white; */
  }
  .award-data {
    background-color: #213861;
    color: white;
    display: grid;
    grid-template-columns: 100px auto;
  }
  .award-data > p,
  .rank-data > p {
    border-bottom: 1px solid white;
  }
  .award-data > *:nth-of-type(odd),
  .rank-data > *:nth-of-type(odd) {
    padding-left: 0.5rem;
    border-left: 1px solid white;
  }
  .award-data > *:nth-of-type(even),
  .rank-data > *:nth-of-type(even) {
    padding-right: 0.5rem;
    border-right: 1px solid white;
  }
  .rank-wrapper {
    background-color: #a9d18c;
    text-align: center;
    padding: 0.25rem 0;
    border: 1px solid white;
  }
  .rank-data {
    background-color: #213861;
    color: white;
    display: grid;
    grid-template-columns: 80px auto;
  }
  .rank-data.last {
    border-radius: 0 0 10px 10px;
  }
  .rank-data > p,
  .award-data > p {
    padding: 0.25rem 0;
    font-family: "Montserrat-Regular" !important;
  }
  /* .rank-data > p:nth-of-type(1) {
    border-bottom: 1px solid white;
  }
  .rank-data > p:nth-of-type(2) {
    border-bottom: 1px solid white;
  } */
  .stars {
    display: flex;
  }
`;

export default ModalWrapper;
