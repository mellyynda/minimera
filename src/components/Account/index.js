import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import PasswordChangeForm from '../PasswordChange';
import { AuthUserContext, withAuthorization } from '../Session';
import SignOutButton from '../SignOut';
import { MainHeading } from '../Styled';
import { MainButton as LinkButton } from '../Landing';
import { MainButton } from '../Styled';
import * as ROUTES from '../../constants/routes';


const AccountPage = () => {
  const [show, setShow] = useState(false);
  const height = window.innerHeight - 56;

  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <Box maxWidth="md" sx={{ '& > :not(style)': { m: 0 }, margin: '0 auto' }}>
          <MainHeading>Min profil</MainHeading>
          <Box maxWidth="md" sx={{ '& > :not(style)': { m: 4 }, margin: '0 auto' }}>
            <Typography variant="subtitle1" gutterBottom component="div" >E-post: {authUser.email}</Typography>

            <LinkButton to={ROUTES.MY_ITEMS} style={{ maxWidth: '250px', margin: '0 auto', marginBottom: '15px' }}>
              Mina anonser
            </LinkButton>
            <MainButton type="button" onClick={() => setShow(true)} style={{ maxWidth: '250px', margin: '0 auto', marginBottom: '15px' }}>
              Återställa lösenord
            </MainButton>
            <Dialog onClose={() => setShow(false)} open={show}>
              <PasswordChangeForm />
            </Dialog>
            <SignOutButton />
          </Box>
        </Box>
      )
      }
    </AuthUserContext.Consumer >
  )
};

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);