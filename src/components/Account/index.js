import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PasswordChangeForm from '../PasswordChange';
import { AuthUserContext, withAuthorization } from '../Session';
import SignOutButton from '../SignOut';
import { MainHeading } from '../Styled';
import { MainButton as LinkButton } from '../Landing';
import { MainButton } from '../Styled';
import ScreenSizeContext from '../Helpers/screenSizeContext';
import * as ROUTES from '../../constants/routes';

const StyledMainButton = styled(MainButton)`
${props => props.bigScreenOpen ? 'background-color: #dfdfdf !important; border: none; cursor: auto;' : ''}
`;

const StyledLinkButton = styled(LinkButton)`
max-width: 250px;
margin: 0 auto 15px;
`;

const PassChangeWrapper = styled.div`
position: absolute;
top: 55px;
right 15px;
`

const AccountPage = () => {
  const windowDimensions = useContext(ScreenSizeContext);
  const [show, setShow] = useState(false);
  const style = { maxWidth: '250px', margin: { xs: '0 auto 15px', md: '0 0 15px' }, color: 'rgba(0, 0, 0, 0.6)' };

  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <Box>
          <MainHeading>Min profil</MainHeading>
          <Box sx={{
            '& > *': { m: { md: '0 0 15px' } },
            maxWidth: { md: '850px' },
            width: '100%',
            margin: '0 auto',
            padding: '26px',
            position: 'relative',
          }}>
            <StyledLinkButton to={ROUTES.MY_ITEMS} style={{ marginBottom: '45px' }} >
              Mina anonser
            </StyledLinkButton>
            <Typography variant="subtitle1" gutterBottom component="div" sx={style} ><b>E-post:</b> {authUser.email}</Typography>
            <StyledMainButton type="button" onClick={() => setShow(true)} bigScreenOpen={show && (windowDimensions.width > 899)} >
              Återställa lösenord
            </StyledMainButton>
            <Dialog onClose={() => setShow(false)} open={show && (windowDimensions.width < 900)}>
              <PasswordChangeForm />
            </Dialog>
            {show && (windowDimensions.width > 899) ?
              <PassChangeWrapper>
                <IconButton
                  edge={false}
                  aria-label="close"
                  onClick={() => setShow(false)}
                  sx={{ position: 'absolute', top: '-15px', right: '-10px' }}
                >
                  <CloseIcon />
                </IconButton>
                <PasswordChangeForm />
              </PassChangeWrapper>
              : null}
            <SignOutButton />
          </Box>
        </Box>
      )}
    </AuthUserContext.Consumer >
  )
};

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);