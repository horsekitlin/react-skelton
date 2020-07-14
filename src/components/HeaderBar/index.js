import React, { Fragment } from 'react';
import propTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';

const HeaderBar = ({ hide, variant, title, rightElement }) => {
  if(hide) return <Fragment />;

  return (
    <Box
      display='flex'
      flexDirection='row'
      justifyContent='space-between'
      alignItems='center'
    >
      <Typography variant={variant} color='textPrimary' >{title}</Typography>
      {rightElement}
    </Box>
  );
};

HeaderBar.propTypes = {
  variant: propTypes.oneOf([
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'subtitle1',
    'subtitle2',
    'body1',
    'body2',
  ]),
};

HeaderBar.defaultProps = {
  title: '',
  variant: 'h3',
  rightElement: null,
};


export default HeaderBar;