import { css, styled } from "styled-components";

// CSS usando styled-components
export const Message = styled.div`
  display: flex;
  align-items: center;
  p {
    max-width: 500px;
    margin-bottom: 12px;
    line-height: 24px;
    padding: 10px 20px;
    border-radius: 25px;
    position: relative;
    color: white;
    background-color: gray;
  }
  ${(props) =>
    props.messageclass === "chatBot" &&
    css`
      justify-content: center;
      p {
        align-self: center;
        color: white;
      }
    `}
  ${(props) =>
    props.messageclass === "sent" &&
    css`
      flex-direction: row-reverse;
      p {
        align-self: flex-end;
        background-color: #0b93f6;
        color: white;
      }
    `}
  ${(props) =>
    props.messageclass === "received" &&
    css`
      p {
        align-self: flex-end;
        background-color: #17a589;
      }
    `}
    img {
    width: 40px;
    border-radius: 100%;
    margin: 2px 5px;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
`;

export const Flag = styled.div`
  position: absolute;
  font-size: 12px;
  bottom: -6px;
  padding: 4px;
  border-radius: 50%;
  background: #ccc;
`;
