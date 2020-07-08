import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { withStyles, withMobileDialog } from '@material-ui/core';
import { PanelHeader, PanelFooter } from '../../components/Panels';
import Button from '../Buttons';
import TextButton from '../Buttons/TextButton';

const style = theme => ({
  paper: {
    minWidth: '300px',
    padding: theme.spacing(3),
    overflowX: 'auto',
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(1),
      padding: theme.spacing(2)
    }
  },
  dialogContent: {
    [theme.breakpoints.down('xs')]: {
      padding: 0
    }
  },
  flexDialog: {
    display: 'flex',
  }
});

const DialogWrapper = ({
  open,
  mode,
  title,
  isFlex,
  classes,
  maxWidth,
  children,
  onEnter,
  onExited,
  onCancel,
  onConfirm,
  confirmButtonText,
  cancelButtonText,
  isConfirmDisabled,
  hasLine
}) => (
  <Dialog
    aria-labelledby='detail-dialog'
    open={open}
    onClose={onCancel}
    maxWidth={maxWidth}
    onEnter={onEnter}
    onExited={onExited}
    PaperProps={{ className: classes.paper }}
  >
    <PanelHeader title={title} align='center' />
    <DialogContent className={classNames(classes.dialogContent, { [classes.flexDialog]: isFlex })}>{children}</DialogContent>
    <PanelFooter hasLine={hasLine}>
      <TextButton
        hide={mode === 'confirm'}
        text={cancelButtonText}
        onClick={onCancel}
      />
      <Button
        text={confirmButtonText}
        onClick={onConfirm}
        hide={isConfirmDisabled}
      />
    </PanelFooter>
  </Dialog>
);

DialogWrapper.propTypes = {
  open: propTypes.bool,
  isFlex: propTypes.bool,
  title: propTypes.string,
  maxWidth: propTypes.string,
  isConfirmDisabled: propTypes.bool,
  cancelButtonText: propTypes.string,
  confirmButtonText: propTypes.string,
  onCancel: propTypes.func,
  onConfirm: propTypes.func.isRequired
};

DialogWrapper.defaultProps = {
  title: '',
  maxWidth: 'md',
  open: false,
  isFlex: false,
  confirmButtonText: '确认',
  cancelButtonText: '取消',
  isConfirmDisabled: false,
  onCancel: () => false
};

export default withMobileDialog()(withStyles(style)(DialogWrapper));
