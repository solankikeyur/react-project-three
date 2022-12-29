import { Heading, Stack, VStack } from '@chakra-ui/react'
import React from 'react'

const Footer = () => {
  return (
    <Stack w={'full'} mt={'20'} h={'20'} bgColor={'green.500'} pos={'fixed'} bottom={'0'} >
        <VStack>
            <Heading size={'md'} color={'white'} textTransform={'uppercase'} mt={'6'}>Crypto Project</Heading>
        </VStack>
    </Stack>
  )
}

export default Footer
