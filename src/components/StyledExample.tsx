import styled from 'styled-components';

// Example styled component using the Detroit theme
export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.asphaltBlack};
  color: ${({ theme }) => theme.colors.creamyBeige};
  padding: 2rem;
  border-radius: 8px;
  margin: 1rem 0;
`;

export const Heading = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.neonOrange};
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

export const Text = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.creamyBeige};
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

export const AccentButton = styled.button`
  background-color: ${({ theme }) => theme.colors.neonYellow};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neonOrange};
    color: ${({ theme }) => theme.colors.creamyBeige};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const StyledExample = () => {
  return (
    <Container>
      <Heading>Detroit Styled Components</Heading>
      <Text>
        This is an example of styled-components working with your Detroit-themed design system. 
        The theme includes industrial colors like asphalt black, rusted steel, and neon accents 
        that capture the spirit of Motor City.
      </Text>
      <AccentButton>Get Started</AccentButton>
    </Container>
  );
};
