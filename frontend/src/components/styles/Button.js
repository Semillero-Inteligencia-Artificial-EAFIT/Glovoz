import { css, styled } from "styled-components";

const StyledButton = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  transition: ease-in-out 0.3s;
  background-color: #fff;
  box-shadow: rgba(99, 99, 99, 0.3) 0px 2px 8px 0px;
  ${(props) => {
    switch (props.$mode) {
      case "primary":
        return css`
          border: 1px solid #000;
          font-size: 1rem;
          color: #000;
          &:hover {
            background-color: #282828;
            color: #fff;
          }
        `;
      case "play":
        return css`
          background-color: #c31313;
          color: white;
          &:hover {
            background-color: #e00b0b;
          }
        `;
      case "stop":
        return css`
          background-color: #282828;
          color: white;
          &:hover {
            background-color: #4a4a4a;
          }
        `;
      default:
        return css`
          &:hover {
            background-color: #ddd;
          }
        `;
    }
  }}
`;

export default function Button({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}
