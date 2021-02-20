import React from 'react';
import {
  Box,
  Container,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'calc(100vh - 80px)',
    backgroundColor: theme.palette.background.dark,
  },
  image: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
  }
}));

const NotFoundView = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="404"
    >
      <Container maxWidth="xl">
        <Typography
          align="center"
          color="textPrimary"
          variant="h1"
        >
          404: The page you are looking for isn’t here
          </Typography>
        <Typography
          align="center"
          color="textPrimary"
          variant="subtitle2"
        >
          You either tried some shady route or you came here by mistake.
          Whichever it is, try using the navigation
          </Typography>
        <Box textAlign="center">
          <img
            alt="Under development"
            className={classes.image}
            src="/static/images/undraw_page_not_found_su7k.svg"
          />
        </Box>
      </Container>
    </Page>
  );
};

export default NotFoundView;