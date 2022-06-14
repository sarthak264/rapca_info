import styled from "styled-components";

export const Page1Wrapper = styled.div`
  .header {
    padding: 1rem 0.5rem;
    background-color: #213861;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  p.or {
    text-align: center;
    margin: 1rem 0 0;
  }
  .card {
    width: 90%;
    margin: 1rem auto 0;
    padding: 2rem 0;
    background-color: #f3f4f6;
    border: none;
    border-radius: 12px;
    text-align: center;
  }
  .card i {
    font-size: 3.5rem;
    color: #658bb1;
  }
  input[type="file"] {
    display: none;
  }
  .card p,
  label.card {
    color: #213861;
    font-family: "Montserrat-Medium" !important;
    font-size: 1.1rem;
    font-weight: 600;
  }
`;

export const Page2Wrapper = styled.div`
  padding: 3vw;
  .images-container {
    padding-top: 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4vw;
  }
  .images-container img {
    max-width: 100%;
    object-fit: cover;
    border-radius: 12px;
    border: 1px dashed #213861;
    width: 45vw;
    height: 48vw;
  }
  .image-wrapper {
    position: relative;
  }
  .image-wrapper i {
    position: absolute;
    top: 0;
    right: 0;
    width: 1.8rem;
    height: 1.8rem;
    transform: translate(30%, -30%);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    background-color: #658bb1;
    border-radius: 50%;
  }
`;
