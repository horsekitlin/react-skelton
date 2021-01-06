import React from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'components/Page';
import Notifications from './components/Notifications';
import UpdatePassword from './components/UpdatePassword';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const SettingsView = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Settings"
    >
      <Container maxWidth="lg">
        <Notifications />
        <Box mt={3}>
          <UpdatePassword />
        </Box>
      </Container>
    </Page>
  );
};

export default SettingsView;