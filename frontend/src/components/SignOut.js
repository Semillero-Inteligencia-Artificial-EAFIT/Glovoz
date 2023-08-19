import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import Button from "./Button";

// firebase authentication signout
export default function SignOut() {
  const [user] = useAuthState(auth);
  function signOut() {
    auth?.signOut();
    window.location.href = "/";
  }
  return user && <Button onClick={signOut}>Sign Out</Button>;
}
