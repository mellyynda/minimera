import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CardMedia from '@mui/material/CardMedia';
import CallIcon from '@mui/icons-material/Call';
import Link from '@mui/material/Link';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { MainButton } from '../Styled'

const ContactDetails = styled(Link)`
flex: 1;
width: 100%;
padding: 15px;
display: flex;
align-items: center;
justify-content: center; 
background: #fff;
`;

const ItemPage = ({ viewItem, toggleItemView, item, image }) => {
  const { title, description, contact } = item;
  const [show, setShow] = useState(false);

  return (
    <Dialog
      onClose={toggleItemView}
      open={viewItem}
      fullWidth={true}
      maxWidth={'xs'}
      PaperProps={{
        style: {
          backgroundColor: '#e7f3f3',
          alignItems: 'center'
        }
      }}
    >
      <IconButton
        edge={false}
        aria-label="close"
        onClick={toggleItemView}
        sx={{ position: 'absolute', top: '8px', right: '8px' }}
      >
        <CloseIcon />
      </IconButton>
      {image &&
        <CardMedia
          component="img"
          height="250"
          image={image}
          alt={item.title}
        />
      }

      <Typography sx={{ flex: 1, margin: '15px 0' }} variant="h6" component="div">
        {title}
      </Typography>

      <Typography sx={{ flex: 1, margin: '0 15px 15px' }} variant="p" component="div">
        {description}
      </Typography>

      <p style={{ maxWidth: '250px' }} autoFocus color="inherit" onClick={() => setShow(!show)}>
        {show ? < KeyboardArrowUpIcon /> : < KeyboardArrowDownIcon />}
      </p>
      {show ?
        <ContactDetails href={'tel:' + contact} >
          <CallIcon />
          <Typography variant="p" component="div">
            {contact}
          </Typography>
        </ContactDetails>
        : null}
    </Dialog >
  )
}

export default ItemPage;