import React from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { withAuthorization } from '../Session';
import { MainHeading } from '../Styled';

const StyledMainHeading = styled(MainHeading)`
@media(min-width: 900px){
  padding-left: 24px;
}
`;

const StyledCard = styled(Card)`
// box-shadow:  0px 4px 4px 0 rgba(0, 0, 0, 25%), 0px 16px 24px 0 rgba(0, 0, 0, 14%), 0px 6px 30px 0 rgba(0, 0, 0, 12%);
box-shadow: 0 1px 2px rgba(0,0,0,0.07), 
0 2px 4px rgba(0,0,0,0.07), 
0 4px 8px rgba(0,0,0,0.07), 
0 8px 16px rgba(0,0,0,0.07),
0 16px 32px rgba(0,0,0,0.07);
`;

const AboutPage = () => {
  const height = window.innerHeight - 56;
  return (
    <Box maxWidth="md" sx={{ '& > :not(style)': { m: 3 }, margin: '0 auto', height: height, overflow: 'auto', marginBottom: '56px' }}>
      <StyledMainHeading>Hur funkar det?</StyledMainHeading>
      <StyledCard variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">Varför?</Typography>
          <Typography variant="body2">För att spara miljön och minska vår konsumtion av varor och saker som vi annars kan dela med varandra.</Typography>
        </CardContent>
      </StyledCard>
      <StyledCard variant="outlined" >
        <CardContent>
          <Typography variant="h5" component="div">Att låna av någon</Typography>
          <Typography variant="body2">☉ Hitta den annons som du är intresserad av.</Typography>
          <Typography variant="body2">☉ Klicka på “Kontakta annonsör” och skicka ett meddelande.</Typography>
          <Typography variant="body2">☉ Om utlånaren godkänner förfrågan så kommer ni överens om tid för upphämtning och återlämning själva.</Typography>
        </CardContent>
      </StyledCard>
      <StyledCard variant="outlined" >
        <CardContent>
          <Typography variant="h5" component="div">Låna saker snabbt</Typography>
          <Typography variant="body2">Det är enkelt och smidigt att låna från dina vänner med minimera.
            Det kostar ingenting att använda vår app och du kan välja vilken grupp du vill tillhöra eller skapa din egen.</Typography>
        </CardContent>
      </StyledCard>
      <StyledCard variant="outlined" >
        <CardContent>
          <Typography variant="h5" component="div">Låna ut till dina vänner</Typography>
          <Typography variant="body2">Nu kan du både bidra till en mer hållbar ekonomi och hjälpa dina vänner. Skapa et konto och lägg till något du sällan använder i en vängrupp.</Typography>
        </CardContent>
      </StyledCard>
    </Box>
  )
};


const condition = authUser => !!authUser;

export default withAuthorization(condition)(AboutPage);