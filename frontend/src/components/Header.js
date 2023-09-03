import SignOut from "./SignOut";
import { auth } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import {
  DropDown,
  HeaderContainer,
  LogoContainer,
  ProfilePicture,
  StyledHeader,
  Title,
  UserContainer,
} from "./styles/StyledHeader";

export default function Header() {
  const [user] = useAuthState(auth);
  const [active, setActive] = useState(false);
  const [goToHome, setGoToHome] = useState(false);
  // if (goToHome) {
  //   return <Navigate to="/" />;
  // }

  const changeActive = () => setActive((prev) => !prev);

  const userContent = user && (
    <ProfilePicture alt="profile" src={user?.photoURL} onClick={changeActive} />
  );

  const dropDown = active && (
    <DropDown>
      <SignOut user={user} />
    </DropDown>
  );

  return (
    <HeaderContainer>
      <StyledHeader>
        <LogoContainer onClick={() => setGoToHome(true)}>
          <Title>Glovoz</Title>
          <Title>🌎🦾🔥</Title>
        </LogoContainer>
        <UserContainer>
          {userContent}
          {dropDown}
        </UserContainer>
      </StyledHeader>
    </HeaderContainer>
  );
}
