import React from 'react'
import styled from 'styled-components';
import Button from './index';
import colors from '../../theme/colors';

const StyledFlatButton = styled(Button)`
    color: ${colors.primary};
    border-color: ${colors.primary};
    background-color:: ${colors.primary};
    margin: 0 1em 0 1em;
`;

const FlatButton = (props) => (
  <StyledFlatButton
    type='button'
    variant='outlined'
    {...props}
  />
)

export default (FlatButton)