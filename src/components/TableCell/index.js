import React from 'react';
import { TableCell as BasicTableCell } from '@material-ui/core';
import styled from 'styled-components';

const StyledTableCell = styled(BasicTableCell)`
  border-width: 0;
  padding-left: 0;
  text-align: center;
`;

const TableCell = ({label, ...props}) => {
  return (
    <StyledTableCell { ...props } />
  );
};
export default TableCell;
