import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import AccountProfile from 'src/components/account/AccountProfile';
import AccountProfileDetails from 'src/components/account/AccountProfileDetails';
import SettingsPassword from 'src/components/settings/SettingsPassword';

const Account = () => (
  <>
    <Helmet>
      <title>YANA - Voice Chat Rooms</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
            alignItems="center"
            justify="center"
        >
          {/*
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <AccountProfile />
          </Grid>
          */}
          <Grid
            item
            lg={12}
          >
            <AccountProfileDetails />

          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default Account;
