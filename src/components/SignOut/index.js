import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { withFirebase } from '../Firebase';
import { MainButton } from '../Styled'


const SignOutButton = ({ firebase }) => (
    <MainButton type="button" onClick={firebase.doSignOut} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LogoutIcon /> Logga ut
    </MainButton>
);
export default withFirebase(SignOutButton);