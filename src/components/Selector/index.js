import React from 'react';
import propTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const defaultData = [
  { text: 'Option 1', value: 1},
  { text: 'Option 2', value: 2}
];

const Selector = ({ datas, ...props}) => {
  return (
    <Select {...props} >
    {datas.map((data, index) => {
      return (
        <MenuItem value={data.value} key={`${data.text}-${index}`}>{data.text}</MenuItem>
      )
    })}
    </Select>
  );
};

Selector.propTypes = {
  value: propTypes.number,
  onChange: propTypes.func,
};

Selector.defaultPrsops = {
  datas: defaultData,
  onChange: () => {},
};

export default Selector;