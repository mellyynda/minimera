import { Link } from 'react-router-dom'

import styled from 'styled-components'

import { ContentWrapper } from '../Styled'
import { SignInLink } from '../SignIn'

import * as ROUTES from '../../constants/routes'

const LandingCover = styled(ContentWrapper)`
background: var(--main-color);
display: flex;
flex-direction: column;
justify-content: center;

section {
  width: 85%;
  margin: auto;
  h1 {
  color: #fff;
  font-family: "Belleza", sans-serif;
  font-weight: 400;
  font-size: 80px;
  margin-bottom: 35px;
  text-shadow: 2px 2px 1px #8c8c8c, 2px 2px 23px rgba(0, 0, 0, 40%);
  }
  p {
    color: #fff;
    font-family: "Belleza", sans-serif;
    font-size: 20px;
  }
}
`

const LinkSection = styled.section`
max-width: 250px;
margin: 0 auto 15px;
`

export const MainButton = styled(Link)`
display: block;
width: 100%;
padding: 20px 0;
margin-bottom: 15px;
border: 2px solid var(--main-color);
color: var(--main-color) !important;
background-color: #fff;
border-radius: 5px;
font-size: 20px;
text-align: center;
text-decoration: none;
`

const Landing = () => (
  <LandingCover>
    <section>
      <h1>minimera</h1>
      <p>Låna saker av personer i din närhet istället för att köpa. </p>
    </section>
    <LinkSection>
      <MainButton to={ROUTES.SIGN_UP}>BLI MEDLEM</MainButton>
      <SignInLink />
    </LinkSection>
  </LandingCover>
);

export default Landing;
