import { useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminPannelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Paper from '@mui/material/Paper';
import { AuthUserContext } from '../Session';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const StyledPaper = styled(Paper)`
position: fixed; 
bottom: 0;
left: 0;
right: 0;
@media(min-width: 768px) {
  bottom: auto;
  top: 0;
  &>div{
    background: var(--main-color);
    padding: 0 5%;
    &>div{
      display: block;
    }
    &>a{
      color: #fff !important;
      max-width: 90px;
    }
  }
}
`;

const Logo = styled.div`
color: #fff;
font-family: "Belleza", sans-serif;
font-size: 45px;
flex-grow: 1;
display: none;
text-shadow: 2px 2px 1px #8c8c8c, 2px 2px 23px rgba(0, 0, 0, 40%);
`

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth authUser={authUser} /> : null
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = ({ authUser }) => {

  const [value, setValue] = useState("home");

  return (
    <Box sx={{ width: '100%' }}>
      <StyledPaper elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          sx={{ padding: { lg: '0 10% !important' } }}
        >
          <Logo>
            minimera
          </Logo>
          <BottomNavigationAction
            component={Link}
            to={ROUTES.HOME}
            label="Hem"
            value="home"
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to={ROUTES.ABOUT}
            label="Om"
            value="about"
            icon={<InfoIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to={ROUTES.ACCOUNT}
            label="Min profil"
            value="profile"
            icon={<AccountCircleIcon />}
          />

          {!!authUser.roles[ROLES.ADMIN] && (
            <BottomNavigationAction
              component={Link}
              to={ROUTES.ADMIN}
              label="Admin"
              value="admin"
              icon={<AdminPannelSettingsIcon />}
            />
          )}

        </BottomNavigation>
      </StyledPaper>
    </Box>
  )
};

export default Navigation;
