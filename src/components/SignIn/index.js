import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { withFirebase } from '../Firebase';

import TextField from '@mui/material/TextField';

import { Form, MainButton, FormWrapper } from '../Styled'
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';


import * as ROUTES from '../../constants/routes';

export const StyledP = styled.p`
font-family: "Belleza", sans-serif;
font-size: 20px;
text-align: right;
`

const SignInPage = () => (
  <FormWrapper>
    <SignInForm />
  </FormWrapper>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = event => {
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';
    return (
      <Form
        onSubmit={this.onSubmit}
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off">
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <TextField
          id="password"
          label="Lösenord"
          variant="outlined"
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <MainButton disabled={isInvalid} type="submit">
          Sign In
        </MainButton>
        {error && <p>{error.message}</p>}
        <PasswordForgetLink />
        <SignUpLink />
      </Form>
    );
  }
}

const SignInLink = () => (
  <StyledP>Redan medlem? <Link to={ROUTES.SIGN_IN}>Logga in</Link></StyledP>
)

const SignInForm = withRouter(withFirebase(SignInFormBase));
export default SignInPage;
export { SignInForm };
export { SignInLink };