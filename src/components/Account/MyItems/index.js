import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import { withAuthorization } from '../../Session';
import { MainHeading } from '../../Styled';
import Items from '../../Items';

const MyItems = () => {
  const [openForm, setOpenForm] = useState(false);
  const own = true;

  const fabStyle = {
    position: 'fixed',
    bottom: 65,
    right: 16,
  };

  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <MainHeading>Mina anonser</MainHeading>

      <Fab onClick={() => setOpenForm(true)} sx={fabStyle} color="primary" aria-label="add" style={{ zIndex: '400' }}>
        <AddIcon />
      </Fab>

      <Items openForm={openForm} setOpenForm={setOpenForm} own={own} />

    </Box>
  )
};


const condition = authUser => !!authUser;

export default withAuthorization(condition)(MyItems);