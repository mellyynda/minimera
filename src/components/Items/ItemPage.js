import * as React from 'react';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { MainButton } from '../Styled'

const ItemPage = ({ viewItem, toggleItemView, item }) => {
  const { title, description, contact } = item;
  const [show, setShow] = useState(false);

  return (
    <Dialog
      open={viewItem}
      fullWidth={true}
      maxWidth={'xs'}
      PaperProps={{
        style: {
          backgroundColor: '#e7f3f3',
          padding: '0 15px',
          alignItems: 'center'
        }
      }}
    >

      <IconButton
        edge={false}
        aria-label="close"
        onClick={toggleItemView}
        sx={{ alignSelf: 'flex-end' }}
      >
        <CloseIcon />
      </IconButton>

      <Typography sx={{ flex: 1, marginBottom: '15px' }} variant="h6" component="div">
        {title}
      </Typography>

      <Typography sx={{ flex: 1, marginBottom: '15px' }} variant="p" component="div">
        {description}
      </Typography>

      <MainButton style={{ maxWidth: '250px' }} autoFocus color="inherit" onClick={() => setShow(!show)}>
        {show ? 'Dölj annonsör' : 'Kontakta annonsör'}
      </MainButton>
      {show ?
        <Typography sx={{ flex: 1, marginBottom: '15px' }} variant="p" component="div">
          Kontakt detaljer: {contact}
        </Typography>
        : null}
    </Dialog>
  )
}

export default ItemPage;