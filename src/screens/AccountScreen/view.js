import React, { useState } from "react";
import {
  Box,
  TableRow,
} from '@material-ui/core';
import Table from '../../components/Table';
import TableCell from '../../components/TableCell';
import Button from '../../components/Buttons';


const AccountScreen = (props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = () => {
    setPage(page);
  };

  const handleChangeRowsPerPage = () => {
    setRowsPerPage(rowsPerPage);
  };

  const headers = ['账号', '角色', '状态', '操作'];
  const datas = [
    { name: 'administrator', role:'admin', status: 1, opt: ''},
    { name: 'user01', role:'manager', status: 1, opt:'edit'},
  ];
  
  return(
    <Box m={3} display='flex' flexDirection='column'>
      <Table
        title='AccountScreen'
        rightTitle={<Button> Export Action </Button>}
        headers={headers}
        children={
          datas.map((row, index)=> (
            <TableRow key={`${row.name}-${index}`}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.opt}</TableCell>
            </TableRow>
          ))
        }
        totalCount={datas.length}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default (AccountScreen);
