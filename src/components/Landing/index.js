// import Button from '@mui/material/Button'

import Link from '@mui/material/Link';
import styled from 'styled-components'

const LandingCover = styled.div`
background: var(--main-color);
height: 100vh;
width: 100%;
// display: flex;
// flex-direction: column;
// justify-content: flex-end;

section {
  width: 85%;
  margin: auto;
  h1 {
  color: #fff;
  font-family: "Belleza", sans-serif;
  font-weight: 400;
  font-size: 80px;
  margin-bottom: 35px;
  }
  p {
    color: #fff;
    font-family: "Belleza", sans-serif;
    font-size: 20px;
  }
}
`

const LinkSection = styled.section`
`

const MainButton = styled.button`
width: 100%;
max-width: 250px;
margin: 0 auto;
padding: 20px 0;
border: 2px solid var(--main-color);
color: var(--main-color);
border-radius: 5px;
font-size: 20px;
`

const Landing = () => (
  <LandingCover>
    <section>
      <h1>minimera</h1>
      <p>Låna saker av personer i din närhet istället för att köpa. </p>
    </section>
    <LinkSection>
      <MainButton variant="outlined" size="large"> BLI MEDLEM </MainButton>
      <p>Redan medlem? <Link color="secondary">Logga in</Link></p>
    </LinkSection>
  </LandingCover>
);

export default Landing;
