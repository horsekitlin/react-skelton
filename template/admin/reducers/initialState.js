const authState = {
  isAuth: false,
};

const customizationState = {
  isOpen: [], // for active default menu
  fontFamily: `'Roboto', sans-serif`,
  borderRadius: 12,
  opened: false,
};


const taskState = {
  rows: [],
  totalCount: 0,
};

const fetchingState = {
  pendingActionTypes: [],
};

const initialState = {
  auth: authState,
  fetching: fetchingState,
  task: taskState,
  customization: customizationState,
};

export default initialState;
