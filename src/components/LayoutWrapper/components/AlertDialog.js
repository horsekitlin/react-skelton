import React from 'react';
import AlertDialogWrapper from '../../AlertDialogWrapper';

const AlertDialog = ({
  title,
  watchData,
  mode,
  level,
  onConfirm,
  onCancel,
  onChangeHandler,
  ...props
}) => (
  <AlertDialogWrapper
    {...props}
    maxWidth='md'
    onConfirm={onConfirm}
    onCancel={onCancel}
    level={level}
    cancelText='取消'
    confirmText='确认'
  >
    {title}
  </AlertDialogWrapper>
);

export default AlertDialog;
