import React, { Component } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import { withAuthorization } from '../Session';
import { MainHeading } from '../Styled';
import Items from '../Items';

const HomePage = () => {

  const fabStyle = {
    position: 'absolute',
    bottom: 65,
    right: 16,
  };

  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <MainHeading>Hem</MainHeading>
      <Fab sx={fabStyle} color="primary" aria-label="add" style={{ zIndex: '400' }}>
        <AddIcon />
      </Fab>

      <Items />
    </Box>
  )
};


const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);