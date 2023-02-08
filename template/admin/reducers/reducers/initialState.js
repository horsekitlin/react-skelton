const authState = {
  isAuth: false,
};

const customizationState = {
  isOpen: [], // for active default menu
  fontFamily: `'Roboto', sans-serif`,
  borderRadius: 12,
  opened: true,
};

const initialState = {
  auth: authState,
  customization: customizationState,
};

export default initialState;
