import SignIn from "../../components/SignIn";
import EnterRoom from "./EnterRoom";
import { auth } from "../../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Home = () => {
  const [user] = useAuthState(auth);

  let content = user ? <EnterRoom user={user} /> : <SignIn />;
  return content;
};

export default Home;
