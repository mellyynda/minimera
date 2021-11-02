import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { withAuthorization } from '../Session';
import { MainHeading } from '../Styled';
import Items from '../Items';
import ScreenSizeContext from '../Helpers/screenSizeContext';

const HomePage = () => {
  const windowDimensions = useContext(ScreenSizeContext);
  const [openForm, setOpenForm] = useState(false);
  const own = false;

  const fabStyle = {
    position: 'fixed',
    bottom: { xs: 65, md: 'auto' },
    right: { xs: 16, md: windowDimensions.width / 2 - 28 },
    top: { xs: 'auto', md: '28px' },
    background: { md: 'var(--text-color)' },
    zIndex: '400',
    boxShadow: '0 0px 1px rgba(0,0,0,0.12), 0 0px 2px rgba(0,0,0,0.12), 0 0px 4px rgba(0,0,0,0.12), 0 0px 8px rgba(0,0,0,0.12), 0 0px 16px rgba(0,0,0,0.12);'
  };

  return (
    <Box>
      <MainHeading>Hem</MainHeading>

      <Fab onClick={() => setOpenForm(true)} sx={fabStyle} color="primary" aria-label="add" >
        <AddIcon />
      </Fab>

      <Items openForm={openForm} setOpenForm={setOpenForm} own={own} />
    </Box>
  )
};


const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);