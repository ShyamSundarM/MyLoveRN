import {createContext, useState} from 'react';

export const GlobalContext = createContext({
  User: String,
  Lover: String,
  Users: Array,
  setLover: Function,
});

export default function GlobalContextProvider({children}) {
  const users = ['Shyam', 'Sandhya'];
  const [userName, setUserName] = useState('');
  const [loverName, setLoverName] = useState('');
  function setLover(name: String) {
    setLoverName(name);
    if (users.findIndex(e => e === name) === 0) {
      setUserName(users[1]);
    } else setUserName(users[0]);
  }
  const value = {
    User: userName,
    setLover: setLover,
    Users: users,
    Lover: loverName,
  };
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}
