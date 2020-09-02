import React from 'react';
import propTypes from 'prop-types';
import { TableCell as BasicTableCell } from '@material-ui/core';
import styled from 'styled-components';
import font from '~/theme/font';

const StyledTableCell = styled(BasicTableCell)`
  border-width: 0;
  padding-left: 0;
  ${font.h5}
`;

const TableCell = (props) => {
  return (
    <StyledTableCell { ...props } />
  );
};

TableCell.propTypes = {
  align: propTypes.string,
};

TableCell.defaultProps = {
  align: 'center',
};

export default TableCell;
