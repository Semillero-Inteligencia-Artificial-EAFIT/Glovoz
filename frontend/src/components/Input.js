import { styled } from "styled-components";

const StyledInput = styled.input`
  padding: 10px 16px;
  border-radius: 5px;
  border: 1px solid #ddd;
  outline: none;
  font-size: 1rem;
  &:focus {
    border: 1px solid #aaa;
  }
`;
export default function Input(props) {
  return <StyledInput {...props} />;
}
