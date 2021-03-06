import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import styled from 'styled-components';

import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { Form, FormWrapper, MainButton, ContentWrapper } from '../Styled'

import { withFirebase } from '../Firebase';
import { SignInLink, StyledP } from '../SignIn';

import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';



const SignUpPage = () => (
  <FormWrapper>
    <SignUpForm />
  </FormWrapper>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  error: null,
  group: 'demoGroup',
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne, isAdmin } = this.state;

    const roles = {};

    if (isAdmin) {
      roles[ROLES.ADMIN] = ROLES.ADMIN;
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
            roles,
          });
      })
      .then(() => {
        return this.props.firebase.doSendEmailVerification();
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {

    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      isAdmin,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <Form
        onSubmit={this.onSubmit}
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="name"
          label="Namn"
          variant="outlined"
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Adress"
        />
        <TextField
          id="password"
          label="L??senord"
          variant="outlined"
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <TextField
          id="passRepeat"
          label="Upprepa l??senord"
          variant="outlined"
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <FormControl fullWidth>
          {/* <InputLabel id="demo-simple-select-standard-label">Grup</InputLabel> */}
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value=''
            label="V??lj grup"
            // onChange={this.onChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem
              value=''
            ><em>Demo grup</em></MenuItem>
          </Select>
        </FormControl>
        <FormControlLabel control={<Checkbox />} label="Admin"
          name="isAdmin"
          type="checkbox"
          checked={isAdmin}
          onChange={this.onChangeCheckbox}
        />

        <MainButton disabled={isInvalid} type="submit">BLI MEDLEM</MainButton>

        {error && <p>{error.message}</p>}

        <SignInLink />

      </Form>
    );
  }
}

const SignUpLink = () => (
  <StyledP>
    Ingen konto? <Link to={ROUTES.SIGN_UP}>Skapa konto</Link>
  </StyledP>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;
export { SignUpForm, SignUpLink };