import { Container, Card, CardBody, Heading } from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react';
import ThemeContext from "../ThemeContext";

const Home = () => {
  const colorScheme = useContext(ThemeContext);
  useEffect(() => {
    document.title = "Home";
  }, [])
  return (
    <Container maxW={'container.md'} mt={'20'}>
      <Card>
        <CardBody >
          <Heading colorScheme={colorScheme}>Welcome To Crypto Project Three.</Heading>
        </CardBody>
      </Card>
    </Container>
  );
};

export default Home;
