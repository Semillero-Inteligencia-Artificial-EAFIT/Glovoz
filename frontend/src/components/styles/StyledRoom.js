import { styled } from "styled-components";

export const Main = styled.main`
  height: 68vh;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 0 auto;
  border-top: 2px solid #eee;
  padding: 10px;
  @media screen and (max-width: 320px) {
    height: 68vh;
  }
  @media screen and (min-height: 500px) {
    height: 55vh;
  }
  @media screen and (min-height: 900px) {
    height: 70vh;
  }
`;

export const FormContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 8vh;
  background-color: #fff;
  bottom: 0;
  padding: 20px 0;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

export const Form = styled.div`
  max-width: 1000px;
  display: grid;
  grid-template-columns: 0.6fr 1.4fr;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 1.5rem;
  button {
    font-size: 1rem;
    padding-top: 15px;
  }
  select {
    border: none;
    background-color: #ddd;
    font-size: 1rem;
    padding: 15px;
    border-radius: 5px;
    border: 0.1px solid #aaa;
    outline: none;
  }
  @media screen and (max-width: 320px) {
    padding: 0 20px;
    select {
      padding: 15px 5px;
    }
  }
`;

export const ButtonSpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const RoomName = styled.p`
  text-align: center;
  margin: 0 auto;
`;

export const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px auto;
  padding: 0 10px;
  @media screen and (min-width: 768px) {
    max-width: 800px;
  }
`;

export const Arrow = styled.div`
  border-radius: 50%;
  padding: 3px 6px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  &:hover {
    color: #fff;
    background-color: #555;
  }
`;
