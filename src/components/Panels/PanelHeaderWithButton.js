import React from 'react';
import { Typography, withStyles } from '@material-ui/core';
import Button from '../Buttons';

const styles = theme => ({
  panelHeader: {
    marginTop: -11,
    marginLeft: -25,
    marginRight: -25,
    paddingTop: 5,
    paddingBottom: 18,
    paddingLeft: 22,
    paddingRight: 22,
    borderBottom: '1px solid #ddd',
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      paddingTop: 15,
    }
  },
  subTitle: {
    color: '#afafaf',
    fontSize: 14,
    fontWeight: 300,
    marginLeft: 7,
  },
  buttonZone: {
    position: 'absolute',
    top: 3,
    right: 17,
    [theme.breakpoints.down('xs')]: {
      paddingTop: 15,
    }
  },
})

const PanelHeaderWithButton = ({
  title = '',
  subTitle = '',
  hideButton=false,
  classes,
  children,
  onClick,
  btnText,
  ...props
}) => (
  <div className={classes.panelHeader} {...props}>
    <Typography variant='h5'>
      {title}
      <span className={classes.subTitle}>{subTitle}</span>
    </Typography>
    <div className={classes.buttonZone}>
      <Button
        text={btnText}
        hide={hideButton}
        color='primary'
        className={classes.button}
        onClick={onClick}
      />
    </div>
  </div>
);

export default withStyles(styles)(PanelHeaderWithButton)