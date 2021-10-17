import React, { Component } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import { withFirebase } from '../Firebase';
import { MainButton } from '../Styled'


const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
  invalid: false,
};

class PasswordChangeForm extends Component {

  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    event.preventDefault();
    if (this.state.passwordOne !== this.state.passwordTwo || this.state.passwordOne === '') {
      this.setState({ invalid: true });
      return;
    }
    const { passwordOne } = this.state;
    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {

    const { passwordOne, passwordTwo, error, invalid } = this.state;

    return (
      <DialogContent>
        <Box
          sx={{
            '& .MuiTextField-root': { width: '100%' },
          }}>
          <TextField
            label="Lösenord"
            error={invalid}
            helperText={invalid ? 'Lösenord måste matcha med varandra' : "Ex: telefonnummer eller mejl adress"}
            variant="outlined"
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="New Password"
          />
          <TextField
            label="Upprepa lösenord"
            error={invalid}
            helperText={invalid ? 'Lösenord måste matcha med varandra' : "Ex: telefonnummer eller mejl adress"}
            variant="outlined"
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm New Password"
          />
          <MainButton onClick={this.onSubmit}>
            Återställa lösenord
          </MainButton>
          {error && <p>{error.message}</p>}

        </Box>
      </DialogContent>
    );
  }
}
export default withFirebase(PasswordChangeForm);