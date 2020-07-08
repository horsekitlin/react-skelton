import React from "react";
import Box from '@material-ui/core/Box';
import { CircularProgress, TableRow, TableCell } from '@material-ui/core';
import DateRange from "../../components/DateRange";
import Button from '../../components/Buttons';
import FlatButton from '../../components/Buttons/FlatButton';
import LineButton from '../../components/Buttons/LineButton';
import TextButton from '../../components/Buttons/TextButton';
import Checkbox from '../../components/CheckBox';
import Selector from '../../components/Selector';
import TextInput from "../../components/TextInput";
import Switch from "../../components/Switch";
import Radio from '../../components/Radio';
import Table from '../../components/Table';

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
            <Button>Origin Button</Button>
            <FlatButton>Flat Button</FlatButton>
            <LineButton>Line Button</LineButton>
            <TextButton color='secondary'>Text Button</TextButton>
          </Box>
          <DateRange onDateChange={()=>{}} />
          <Selector defaultValue={1} value={1} datas={[]} />
          <Checkbox checked label='check box' />
          <Switch checked label='switch' />
          <Radio checked label='radio'/>
          <TextInput title='Text Input Label' placeholder='type here' />
          <TextInput title='Text Input Label' value='Done' isSuccess />
        </Box>
        <Box m={2} p={2}>
          <Table
            title='Example Table'
            rightTitle={<Button> Export Action </Button>}
            headers={Object.keys(tableDatas[0])}
            children={
              tableDatas.map((row, index)=> (
                <TableRow key={`${row.id}-${index}`}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{(row.numeric)? 'Y': 'N'}</TableCell>
                  <TableCell>{(row.disablePadding)? 'Y': 'N'}</TableCell>
                  <TableCell>{row.label}</TableCell>
                </TableRow>
              ))
            }
          />
        </Box> 
      </Box>
  );
};

export default (ElementScreen);
