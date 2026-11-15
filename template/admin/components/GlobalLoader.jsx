import { useSelector } from 'react-redux';
import Loader from 'ui-component/Loader';

const GlobalLoader = () => {
  const isFetching = useSelector((state) => state.fetching.pendingActionTypes.length > 0);

  return isFetching ? <Loader /> : null;
};

export default GlobalLoader;
