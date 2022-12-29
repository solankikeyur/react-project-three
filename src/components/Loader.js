import React from 'react';
import { Spinner, VStack, Box } from '@chakra-ui/react';

const Loader = ({show = true}) => {
  return (
    show ? (
      <VStack pos={'fixed'} top={0} bottom={0} left={0} right={0} h={'full'} w={'full'} justifyContent={'center'} zIndex={'overlay'} backdropBlur={'2xl'} style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
        <Box transform={"scale(3)"}>
          <Spinner colorScheme={'green'} size={'xl'} color={'green.500'} emptyColor={'green.100'}></Spinner>
        </Box>
      </VStack>
      
    ) : (<></>)
    
  );
};

export default Loader;
