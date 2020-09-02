import React, { useEffect, Fragment } from 'react';
import Snackbar from '~/components/Snackbar';


const closeGlobalMsgModal = (
  nextPath,
  action,
  params,
  closeGlobalMessageModal
) => () => {
  // switch (action) {
  //   case 'goBack':
  //     pop();
  //     break;
  //   case 'goBackTo':
  //     popTo(nextPath);
  //     setTimeout(() => refresh(params));
  //     break;
  //   case 'jumpTo':
  //     jump(nextPath, params);
  //     break;
  //   case 'navigate':
  //     push(nextPath, params);
  //     break;
  //   default:
  //     break;
  // }
  return closeGlobalMessageModal();
};

const GlobalArea = props => {
  const {
    token,
    nextPath,
    action,
    params,
    level,
    open,
    text,
    confirmText,
    closeGlobalMessageModal,
    handleLogoutAndCloseModal,
    handleCloseAllModal,
  } = props;

  const closeGlobalMsgModalHandler = closeGlobalMsgModal(
    nextPath,
    action,
    params,
    closeGlobalMessageModal
  );

  useEffect(() => {
    window.addEventListener('change', handleCloseAllModal);
    return () => window.removeEventListener('change', handleCloseAllModal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <Snackbar
        key={`${level}-${text}`}
        level={level}
        open={open}
        message={text}
        confirmText={confirmText}
        closeGlobalMessageModal={closeGlobalMsgModalHandler}
        onCancel={closeGlobalMessageModal}
      />
    </Fragment>
  );
};

export default GlobalArea;
