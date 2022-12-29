import { Container, Card, CardBody, Heading } from '@chakra-ui/react';
import React, { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    document.title = "Home";
  }, [])
  return (
    <Container maxW={'container.xl'}>
      <Card>
        <CardBody>
          <Heading colorScheme={'green'}>Welcome To Crypto Project Three.</Heading>
        </CardBody>
      </Card>
    </Container>
  );
};

export default Home;
