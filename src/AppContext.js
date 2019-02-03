import React from 'react';

export const AppContext = React.createContext({
  user: null,
  isLoggedIn: false,
  setUser: () => {},
  removeUser: () => {}
});
