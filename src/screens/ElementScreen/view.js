import React from "react";
import Box from '@material-ui/core/Box';
import { CircularProgress, TableRow } from '@material-ui/core';
import DateRange from "~/components/DateRange";
import Button from '~/components/Buttons';
import FlatButton from '~/components/Buttons/FlatButton';
import LineButton from '~/components/Buttons/LineButton';
import TextButton from '~/components/Buttons/TextButton';
import Checkbox from '~/components/CheckBox';
import Selector from '~/components/Selector';
import TextInput from "~/components/TextInput";
import Switch from "~/components/Switch";
import Radio from '~/components/Radio';
import Table from '~/components/Table';
import TableCell from '~/components/TableCell';
import TreeView from '~/components/TreeView';

const tableDatas = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' },
  { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
  { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
  { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
  { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
];

const ElementScreen = ({ isLoading }) => {
  if (isLoading) return <CircularProgress />;
  
  return(
      <Box m={3} display='flex' flexDirection='column'>
        <Box m={2} display='flex' flexDirection='column'  justifyContent='flex-start' >
          <Box display='flex' flexDirection='row'  justifyContent='flex-start' >
            <Button text='Origin Button'/>
            <FlatButton text='Flat Button' />
            <LineButton text='Line Button' />
            <TextButton color='secondary' text='Text Button' />
          </Box>
          <DateRange onDateChange={()=>{}} />
          <Selector />
          <Checkbox checked label='check box' />
          <Switch checked label='switch' />
          <Radio checked label='radio'/>
          <TextInput title='Text Input Label' placeholder='type here' />
          <TextInput title='Text Input Label' value='Done' isSuccess />
        </Box>
        <Box m={2} p={2}>
          <Table
            title='Example Table'
            rightElement={<Button text='Export Action' />}
            headers={Object.keys(tableDatas[0])}
            children={
              tableDatas.map((row, index)=> (
                <TableRow key={`${row.id}-${index}`}>
                  <TableCell align='left'>{row.id}</TableCell>
                  <TableCell>{(row.numeric)? 'Y': 'N'}</TableCell>
                  <TableCell>{(row.disablePadding)? 'Y': 'N'}</TableCell>
                  <TableCell>{row.label}</TableCell>
                </TableRow>
              ))
            }
          />
        <Box mt={5} p={2} display='flex' flexDirection='column'  justifyContent='flex-start'border='1px solid lightgrey' >
          <TreeView />
        </Box>
        </Box> 
      </Box>
  );
};

export default (ElementScreen);
