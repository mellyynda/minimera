import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';

import TextField from '@mui/material/TextField';


import { Form, FormWrapper, MainButton, MainHeading } from '../Styled'
import { SignUpLink, } from '../SignUp';
import { StyledP, SignInLink } from '../SignIn';

import * as ROUTES from '../../constants/routes';


const PasswordForgetPage = () => (<>
  <MainHeading>Glömt lösenord?</MainHeading>
  <FormWrapper>
    <PasswordForgetForm />
  </FormWrapper>
</>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};


class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
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

    const { email, error } = this.state;

    const isInvalid = email === '';

    return (
      <Form
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={this.onSubmit}
      >
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <MainButton disabled={isInvalid} type="submit">
          Återställ mitt lösenord
        </MainButton>
        {error && <p>{error.message}</p>}
        <SignUpLink />
        <SignInLink />
      </Form>
    );
  }
}

const PasswordForgetLink = () => (
  <StyledP>
    <Link to={ROUTES.PASSWORD_FORGET}>Glömt lösenord?</Link>
  </StyledP>
);


export default PasswordForgetPage;
const PasswordForgetForm = withFirebase(PasswordForgetFormBase);
export { PasswordForgetForm, PasswordForgetLink };