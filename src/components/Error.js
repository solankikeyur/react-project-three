import { Card, CardBody, Container, Heading } from '@chakra-ui/react'
import React from 'react'

const Error = ({message}) => {
  return (
    <Container mt={'10'}>
        <Card color={'red.500'}>
          <CardBody>
            <Heading size={'md'}>{message}</Heading>
          </CardBody>
        </Card>
    </Container>
  )
}

export default Error
