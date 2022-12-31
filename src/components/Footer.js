import { Heading, Stack, VStack } from '@chakra-ui/react'
import React, { useContext } from 'react'
import ThemeContext from '../ThemeContext'

const Footer = () => {
  const colorScheme = useContext(ThemeContext);

  return (
    <Stack w={'full'} mt={'20'} h={'20'} bgColor={`${colorScheme}.500`} pos={'fixed'} bottom={'0'} >
        <VStack>
            <Heading size={'md'} color={'white'} textTransform={'uppercase'} mt={'6'}>Crypto Project</Heading>
        </VStack>
    </Stack>
  )
}

export default Footer
