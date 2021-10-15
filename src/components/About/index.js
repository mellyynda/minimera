import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { withAuthorization } from '../Session';
import { MainHeading } from '../Styled';

const AboutPage = () => {
  const height = window.innerHeight - 56;
  return (
    <Box maxWidth="sm" sx={{ '& > :not(style)': { m: 3 }, maxWidth: '350px', margin: '0 auto', height: height, overflow: 'auto', marginBottom: '56px' }}>
      <MainHeading>Hur funkar det?</MainHeading>
      <Card variant="outlined" sx={{ boxShadow: ' 0px 4px 4px 0 rgba(0, 0, 0, 25%), 0px 16px 24px 0 rgba(0, 0, 0, 14%), 0px 6px 30px 0 rgba(0, 0, 0, 12%)' }} >
        <CardContent>
          <Typography variant="h5" component="div">Varför?</Typography>
          <Typography variant="body2">För att spara miljön och minska vår konsumtion av varor och saker som vi annars kan dela med varandra.</Typography>
        </CardContent>
      </Card>
      <Card variant="outlined" sx={{ boxShadow: ' 0px 4px 4px 0 rgba(0, 0, 0, 25%), 0px 16px 24px 0 rgba(0, 0, 0, 14%), 0px 6px 30px 0 rgba(0, 0, 0, 12%)' }} >
        <CardContent>
          <Typography variant="h5" component="div">Att låna av någon</Typography>
          <Typography variant="body2">☉ Hitta den annons som du är intresserad av.</Typography>
          <Typography variant="body2">☉ Klicka på “Kontakta annonsör” och skicka ett meddelande.</Typography>
          <Typography variant="body2">☉ Om utlånaren godkänner förfrågan så kommer ni överens om tid för upphämtning och återlämning själva.</Typography>
        </CardContent>
      </Card>
      <Card variant="outlined" sx={{ boxShadow: ' 0px 4px 4px 0 rgba(0, 0, 0, 25%), 0px 16px 24px 0 rgba(0, 0, 0, 14%), 0px 6px 30px 0 rgba(0, 0, 0, 12%)' }} >
        <CardContent>
          <Typography variant="h5" component="div">Låna saker snabbt</Typography>
          <Typography variant="body2">Det är enkelt och smidigt att låna från dina vänner med minimera.
            Det kostar ingenting att använda vår app och du kan välja vilken grupp du vill tillhöra eller skapa din egen.</Typography>
        </CardContent>
      </Card>
      <Card variant="outlined" sx={{ boxShadow: ' 0px 4px 4px 0 rgba(0, 0, 0, 25%), 0px 16px 24px 0 rgba(0, 0, 0, 14%), 0px 6px 30px 0 rgba(0, 0, 0, 12%)' }} >
        <CardContent>
          <Typography variant="h5" component="div">Låna ut till dina vänner</Typography>
          <Typography variant="body2">Nu kan du både bidra till en mer hållbar ekonomi och hjälpa dina vänner. Skapa et konto och lägg till något du sällan använder i en vängrupp.</Typography>
        </CardContent>
      </Card>
    </Box>
  )
};


const condition = authUser => !!authUser;

export default withAuthorization(condition)(AboutPage);