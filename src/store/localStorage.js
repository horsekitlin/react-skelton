const { localStorage } = window;
const LOGIN_USER_KEY = "$_LOGIN_USER_KEY";

export const getLoginUser = () => JSON.parse(localStorage.getItem(LOGIN_USER_KEY));

export const saveLoginUser = (user) => localStorage.setItem(LOGIN_USER_KEY, JSON.stringify(user));

export const removeLoginUser = () => localStorage.removeItem(LOGIN_USER_KEY);