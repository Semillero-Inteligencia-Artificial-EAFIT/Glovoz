import { Container } from "../../components/Layout";
import EnterRoomForm from "./EnterRoomForm";
import { SubTitle, Title } from "../../components/styles/StyledEnterRoom";

const EnterRoom = (props) => {
  const { user } = props;

  const formattedUser = user.displayName.split(" ")[0];

  return (
    <Container>
      <Title>Bienvenid@, {formattedUser}</Title>
      <SubTitle>¡En Glovoz, el lenguaje no es una barrera!</SubTitle>
      <EnterRoomForm user={user} />
    </Container>
  );
};

export default EnterRoom;
