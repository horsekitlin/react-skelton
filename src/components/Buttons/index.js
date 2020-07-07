import React from 'react';
import propTypes from 'prop-types';
import { Button as BaseButton } from '@material-ui/core';

const Button = ({hide, text, color, ...props}) => {
  return hide
  ? null
  : <BaseButton
      type='button'
      variant = 'contained'
      color= { color || 'primary' }
      {...props}
    >
      {text}
    </BaseButton>
};

Button.propTypes = {
  onClick: propTypes.func,
};

Button.defaultPrsops = {
  text: '',
  icon: null,
  onClick: () => {},
};

export default (Button)