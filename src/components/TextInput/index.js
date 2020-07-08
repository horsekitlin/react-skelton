import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import InputBase from '@material-ui/core/InputBase';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { withStyles } from '@material-ui/core/styles';
import Colors from '../../constants/colors.config';
import ValidErrorMessage from './ValidErrorMessage';
import { FormGroup, FormLabel } from './InputWrappers';

const styles = theme => ({
  borderInputBaseRoot: {
    width: '100%'
  },
  borderInputBase: {
    marginTop: 'auto',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    padding: theme.spacing(1),
    alignItems: 'center',
    border: '1px solid #d0d0d0',
    borderRadius: theme.shape.borderRadius,
    display: 'inline-block',
    width: '100%',
    transition: '.2s',
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
    },
    [theme.breakpoints.down('md')]: {
      display: 'block'
    }
  },
  errorInputBase: {
    borderColor: '#ff8080',
    boxShadow: '0 0 0 0.2rem rgba(255,0, 0,.25)'
  },
  successIcon: {
    margin: 'auto',
    fontSize: '18px',
    color: Colors.success,
    position: 'absolute',
    right: 10,
    marginTop: 10,
    marginRight: 10
  }
});

const TextInput = props => {
  const {
    type,
    name,
    hide,
    title,
    value,
    onBlur,
    classes,
    required,
    disabled,
    isSuccess,
    placeholder,
    maxLength,
    errorMessage
  } = props;

  const [text, setText] = useState('');

  useEffect(() => {
    value === null 
      ? setText('')
      : setText(value);
  }, [value]);

  if (hide) return null;

  const handleOnChange = ({ target: { name, value } }) => {
    //onChange({ name, value });
    setText(value);
  };

  const isError = !isEmpty(errorMessage);

  return (
    <div>
      <FormGroup>
        <FormLabel hide={isEmpty(title)} required={required}>
          {title}
        </FormLabel>
        <InputBase
          type={type}
          name={name}
          value={text}
          onBlur={onBlur}
          disabled={disabled}
          placeholder={placeholder}
          inputProps={{ maxLength }}
          onChange={handleOnChange}
          classes={{
            root: classes.borderInputBaseRoot,
            input: classNames(classes.borderInputBase, {
              [classes.errorInputBase]: isError
            })
          }}
        />
        {isSuccess && (
          <CheckCircleOutlineIcon className={classes.successIcon} />
        )}
      </FormGroup>
      <ValidErrorMessage errorMessage={errorMessage} />
    </div>
  );
};

TextInput.propTypes = {
  hide: propTypes.bool,
  disabled: propTypes.bool,
  type: propTypes.string,
  title: propTypes.string,
  errorMessage: propTypes.string,
  defaultValue: propTypes.string,
  onBlur: propTypes.func,
  onChange: propTypes.func.isRequired
};

TextInput.defaultProps = {
  hide: false,
  disabled: false,
  title: '',
  type: 'text',
  errorMessage: '',
  defaultValue: '',
  maxLength: 50,
  onBlur: () => false,
  onChange: ()=>{},
};

export default withStyles(styles)(TextInput);
