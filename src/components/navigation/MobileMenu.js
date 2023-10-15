import React from 'react'
import { useContext } from 'react';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/system';
import { NavButton } from './NavButton';

const MobileMenu = () => {
    const { authState, authDispatch } = useContext(AuthenticationContext);
    const location = useLocation();

  return (
    <Box> 
        
        <NavButton to="/" text="Logout" />
    </Box>
  )
}

export default MobileMenu