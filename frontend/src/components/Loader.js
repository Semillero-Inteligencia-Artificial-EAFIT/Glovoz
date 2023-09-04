import { MoonLoader } from "react-spinners";
import { styled } from "styled-components";

const LoaderContainer = styled.div`
  display: flex;
  position: absolute;
  top: 45%;
  right: 45%;
`;

const Loader = () => {
  return (
    <LoaderContainer>
      <MoonLoader />
    </LoaderContainer>
  );
};

export default Loader;
