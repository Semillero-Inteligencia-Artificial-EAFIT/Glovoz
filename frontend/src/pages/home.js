import { auth } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import Layout from "../components/Layout";
import SignIn from "../components/SignIn";
import EnterRoom from "../components/EnterRoom";

export default function Home() {
  const [user] = useAuthState(auth);
  return (
    <Layout>
      <section>{user ? <EnterRoom /> : <SignIn />}</section>
    </Layout>
  );
}
