import { styled } from "styled-components";

// CSS usando styled-components
export const HeaderContainer = styled.header`
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  background: #0b153c;
`;

export const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  max-height: 45px;
  overflow: hidden;
`;

export const UserContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const Image = styled.img`
  margin-top: 20px;
  max-width: 300px;
`;

export const ProfilePicture = styled.img`
  width: 45px;
  border-radius: 50%;
  border: 3px solid #0b153c;
  transition: 0.3s ease-in;
  cursor: pointer;
  &:hover {
    border: 3px solid gray;
  }
`;

export const DropDown = styled.div`
  position: absolute;
  top: 55px;
  right: -10px;
  width: 82px;
  z-index: 100;
  background-color: white;
  border-radius: 5px;
  transition: 0.3s ease-in;
`;
