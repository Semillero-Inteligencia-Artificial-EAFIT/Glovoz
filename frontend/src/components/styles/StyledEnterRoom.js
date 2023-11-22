import { styled } from "styled-components";

// CSS utilizando styled-components
export const RoomForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  text-align: center;
  button,
  input {
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
  padding: 0 20px;
  @media screen and (min-width: 768px) {
    margin-top: 50px;
    flex-direction: row;
    text-align: left;
    gap: 5px;
  }
`;

export const OptimusContainer = styled.div`
  @keyframes bounce {
    50% {
      transform: translateY(-35px);
      opacity: 1;
    }
  }
  cursor: pointer;
  position: relative;

  &:hover {
    img {
      animation-name: bounce;
      animation-timing-function: ease-in-out;
    }
  }
`;

export const AnimationImage = styled.img`
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
    position: absolute;
    width: 90px;
    right: -98px;
    top: -29px;
    z-index: 0;
    animation-duration: 4s;
    animation-iteration-count: 1;
    transform-origin: bottom;
    opacity: 0;
  }
`;

export const ButtonContainer = styled.div`
  @media screen and (min-width: 768px) {
    position: absolute;
    z-index: 4;
    width: 150px;
  }
`;

export const Title = styled.h1`
  font-size: 3rem;
  padding: 10px;
  text-align: center;
  margin-bottom: 0;
  color: #0b153c;
  @media screen and (min-width: 768px) {
    font-size: 3.5rem;
  }
`;

export const SubTitle = styled.h1`
  font-size: 2rem;
  color: gray;
  text-align: center;
  padding: 10px;
  @media screen and (min-width: 768px) {
    padding: 0;
    margin-top: 10px;
  }
`;
