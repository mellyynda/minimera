import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../MaterialTheme'

import { MainWrapper } from '../Styled'
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AboutPage from '../About';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import { withAuthentication } from '../Session';
import ItemPage from '../Items/ItemPage';

import * as ROUTES from '../../constants/routes';
import { SINGLE_ITEM } from '../../constants/routes';
import MyItems from '../Account/MyItems';

const App = () => (
  <Router>
    <MainWrapper>
      <ThemeProvider theme={theme}>
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />

        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.ABOUT} component={AboutPage} />
        <Route path={ROUTES.MY_ITEMS} component={MyItems} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />

        <Navigation />
      </ThemeProvider>
    </MainWrapper>
  </Router>
);

export default withAuthentication(App);
