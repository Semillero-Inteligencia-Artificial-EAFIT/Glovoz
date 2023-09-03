// import { useGetUserQuery } from "../features/users/usersSlice";
import { auth } from "../lib/firebase";
import Button from "./styles/Button";

export default function SignOut({ user }) {
  //   const { data, isLoading, isSuccess, isError, error } = useGetUserQuery();
  function signOut() {
    auth?.signOut();
    window.location.href = "/";
  }
  return user && <Button onClick={signOut}>Sign Out</Button>;
}
