import server from './';

export const signinResult = (payload) =>
  server.post('/auth', payload);
