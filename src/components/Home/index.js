import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import { withAuthorization } from '../Session';
import { MainHeading } from '../Styled';
import Items from '../Items';

const HomePage = () => {
  const [openForm, setOpenForm] = useState(false);
  const own = false;

  const fabStyle = {
    position: 'fixed',
    bottom: { xs: 65, md: 'auto' },
    right: { xs: 16, md: window.innerWidth / 2 - 28 },
    top: { xs: 'auto', md: '28px' },
    background: { md: '#223843' }
  };

  return (
    <Box>
      <MainHeading>Hem</MainHeading>

      <Fab onClick={() => setOpenForm(true)} sx={fabStyle} color="primary" aria-label="add" style={{ zIndex: '400' }}>
        <AddIcon />
      </Fab>

      <Items openForm={openForm} setOpenForm={setOpenForm} own={own} />
    </Box>
  )
};


const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);