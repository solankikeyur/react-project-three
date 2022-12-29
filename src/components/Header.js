import {
  Menu,
  MenuList,
  MenuItem,
  IconButton,
  MenuButton,
  Box,
  HStack,
} from '@chakra-ui/react';
import React from 'react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

const Header = () => {
  const colorScheme = 'green';
  return (
    <HStack h={'55'}>
      <ColorModeSwitcher></ColorModeSwitcher>
      <Box pos={'fixed'} top={'4'} left={'4'} zIndex={'overlay'}>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="solid"
            colorScheme={colorScheme}
          />
          <MenuList>
            <MenuItem>
              <Link to="/">Home</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/exchanges">Exchanges</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/coins">Coins</Link>
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </HStack>
  );
};

export default Header;
