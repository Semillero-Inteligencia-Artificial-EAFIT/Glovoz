import firebase from "firebase/compat/app";
import { auth } from "../lib/firebase";
import Button from "./Button";
import { styled } from "styled-components";

const SignInContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
`;

// firebase authentication google signin
export default function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return (
    <SignInContainer>
      <Button onClick={signInWithGoogle}>Sign in with Google</Button>
    </SignInContainer>
  );
}
