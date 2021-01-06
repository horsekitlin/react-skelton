import React, { useEffect } from 'react';
import isEmpty from 'lodash/isEmpty';
import { Outlet } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { useLocation, useNavigate } from 'react-router-dom';
import TopBar from './TopBar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));

const MainLayout = () => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();

  const paths = location.pathname.split('/').filter(str => !isEmpty(str));

  useEffect(() => {
    if(paths.length === 0) {
      navigate('/app');
    }
  }, []);
  
  return (
    <div className={classes.root}>
      <TopBar />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
