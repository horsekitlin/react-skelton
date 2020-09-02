import React from "react";
import { CircularProgress } from '@material-ui/core';
import HeaderBar from '~/components/HeaderBar';
import Box from '@material-ui/core/Box';

const HomeScreen = ({ isLoading }) => {
  if (isLoading) return <CircularProgress />;
  
  return(
    <Box m={2}>
      <HeaderBar title='DashBoard'/>
    </Box>
  );
};

export default (HomeScreen);
