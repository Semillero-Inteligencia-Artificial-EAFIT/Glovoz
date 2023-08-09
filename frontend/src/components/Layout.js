import { styled } from "styled-components";
import Header from "./Header";

const StyledLayout = styled.div`
  margin: auto;
  height: 100vh;
  background: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
`;

export const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

export default function Layout({ children }) {
  return (
    <StyledLayout>
      <Header />
      {children}
    </StyledLayout>
  );
}
