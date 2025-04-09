import server from './';

export const loginResult = (payload) =>
  server.post('/auth', payload);
