import { useState } from 'react'
import { Link } from 'react-router-dom';
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
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
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
              label="Min profil"
              value="profile"
              icon={<AdminPannelSettingsIcon />}
            />
          )}

        </BottomNavigation>
      </Paper>
    </Box>
  )
};

export default Navigation;
