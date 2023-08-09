import { styled } from "styled-components";
import SignOut from "./SignOut";
import { auth } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const HeaderContainer = styled.header`
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  // cursor: pointer;
`;

const UserContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin: 0;
  @media screen and (max-width: 320px) {
    font-size: 1.7rem;
  }
`;

const ProfilePicture = styled.img`
  width: 45px;
  border-radius: 100%;
  border: 2px solid #ddd;
  transition: 0.3s ease-in;
  cursor: pointer;
  &:hover {
    border: 2px solid gray;
  }
`;

const DropDown = styled.div`
  position: absolute;
  top: 55px;
  right: -10px;
  width: 82px;
  background-color: white;
  border-radius: 5px;
  transition: 0.3s ease-in;
`;

export default function Header() {
  const [user] = useAuthState(auth);
  const [active, setActive] = useState(false);
  const [goToHome, setGoToHome] = useState(false);
  // if (goToHome) {
  //   return <Navigate to="/" />;
  // }
  return (
    <HeaderContainer>
      <StyledHeader>
        <LogoContainer onClick={() => setGoToHome(true)}>
          <Title>PRIMUS</Title>
          <Title>🌎🦾🔥</Title>
        </LogoContainer>
        <UserContainer>
          {user ? (
            <ProfilePicture
              alt="profile"
              src={user.photoURL}
              onClick={() => setActive((prev) => !prev)}
            />
          ) : (
            <></>
          )}
          {active && (
            <DropDown>
              <SignOut />
            </DropDown>
          )}
        </UserContainer>
      </StyledHeader>
    </HeaderContainer>
  );
}
