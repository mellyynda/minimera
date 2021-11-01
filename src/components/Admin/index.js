import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PersonIcon from '@mui/icons-material/Person';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import { MainHeading } from '../Styled';
import { StyledLink } from '../Styled';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';


const AdminPage = () => (
  <Box>
    <MainHeading style={{ paddingLeft: '24px' }}>Admin</MainHeading>
    <Switch>
      <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
      <Route exact path={ROUTES.ADMIN} component={UserList} />
    </Switch>
  </Box>
);

class UserListBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));

      this.setState({
        users: usersList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;

    return (
      <Box sx={{ '& > ': { m: 3 }, margin: '0 auto', overflow: 'auto', marginBottom: '56px', maxWidth: { xs: 360, md: 850 } }}>
        <Typography variant="h6" gutterBottom component="div" sx={{ color: 'rgba(0, 0, 0, 0.6)', padding: { xs: '0 15px', md: '0' } }}>Användarlista:</Typography>
        {loading && <div>Loading ...</div>}

        {!(users.length > 0) && !loading ?
          <Typography variant="h6" gutterBottom component="div" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>No users to display.</Typography>
          :
          <List sx={{ width: '100%', marginLeft: 0, bgcolor: 'background.paper' }}>
            {users.map(user => (
              <StyledLink key={user.uid}
                to={{
                  pathname: `${ROUTES.ADMIN}/${user.uid}`,
                  state: { user },
                }}>
                <ListItem alignItems="center">
                  <ListItemAvatar>
                    <PersonIcon fontSize="large" style={{ color: 'var(--main-color)' }} />
                  </ListItemAvatar>
                  <ListItemText
                    sx={{ '& > *': { display: { md: 'inline !important' } }, position: 'relative' }}
                    primary={user.username}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'inline', position: { md: 'absolute' }, left: { md: '240px' } }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {user.email + ' '}
                        </Typography>

                        <Typography
                          sx={{ display: 'inline', position: { md: 'absolute' }, right: { md: '0' } }}
                          component="span"
                          variant="body2"
                          color="text.secondary"
                        >
                          {user.uid}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider component="li" />
              </StyledLink>
            ))}
          </List>
        }

      </Box>
    );
  }
}

class UserItemBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      user: null,
      ...props.location.state,
    };
  }
  componentDidMount() {
    if (this.state.user) {
      return;
    }

    this.setState({ loading: true });
    this.props.firebase
      .user(this.props.match.params.id)
      .on('value', snapshot => {
        this.setState({
          user: snapshot.val(),
          loading: false,
        });
      });
  }
  componentWillUnmount() {
    this.props.firebase.user(this.props.match.params.id).off();
  }

  onSendPasswordResetEmail = () => {
    this.props.firebase.doPasswordReset(this.state.user.email);
  };

  render() {
    const { user, loading } = this.state;
    return (
      <Box sx={{ '& > ': { m: 3 }, margin: '0 auto', overflow: 'auto', marginBottom: '56px', maxWidth: { xs: 360, md: 850 } }}>
        <StyledLink to={ROUTES.ADMIN}>
          <IconButton
            edge={false}
            aria-label="close"
            sx={{ position: 'absolute', top: '10px', left: '10px' }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
        </StyledLink>
        {loading && <div>Loading ...</div>}
        {user && (
          <List sx={{ width: '100%', maxWidth: { xs: 360, md: 550 }, bgcolor: 'background.paper' }}>
            <ListItem alignItems="flex-start" sx={{ padding: { md: '5px 0 !important' } }}>
              <ListItemText
                sx={{ '& > *': { display: { md: 'inline !important' } } }}
                primary='Användarnamn:'
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ fontWeight: '500', display: 'inline', position: { md: 'absolute' }, left: { md: '240px' } }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {user.username}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider component="li" />
            <ListItem alignItems="flex-start" sx={{ padding: { md: '5px 0 !important' } }}>
              <ListItemText
                sx={{ '& > *': { display: { md: 'inline !important' } } }}
                primary='Mejl adress:'
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline', position: { md: 'absolute' }, left: { md: '240px' } }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {user.email}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider component="li" />
            <ListItem alignItems="flex-start" sx={{ padding: { md: '5px 0 !important' } }}>
              <ListItemText
                sx={{ '& > *': { display: { md: 'inline !important' } } }}
                primary='ID:'
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline', position: { md: 'absolute' }, left: { md: '240px' } }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {user.uid}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <ListItem alignItems="flex-start" sx={{ padding: { md: '5px 0 !important' } }}>
              <Button
                type="button"
                onClick={this.onSendPasswordResetEmail}
              >
                Send password reset
              </Button>
            </ListItem>
          </List>
        )
        }
      </Box>
    );
  }
}


const condition = authUser =>
  authUser && !!authUser.roles[ROLES.ADMIN];

const UserList = withFirebase(UserListBase);
const UserItem = withFirebase(UserItemBase);

export default withAuthorization(condition)(withFirebase(AdminPage));