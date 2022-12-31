import {
  Menu,
  MenuList,
  MenuItem,
  IconButton,
  MenuButton,
  Box,
  HStack,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import ThemeContext from '../ThemeContext';


const Header = () => {
  const colorScheme = useContext(ThemeContext);
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
          <Link to="/">
            <MenuItem>
              Home
            </MenuItem>
            </Link>
            <Link to="/exchanges">
            <MenuItem>
              Exchanges
            </MenuItem>
            </Link>
            <Link to="/coins">
            <MenuItem>
              Coins
            </MenuItem>
            </Link>
          </MenuList>
        </Menu>
      </Box>
    </HStack>
  );
};

export default Header;
