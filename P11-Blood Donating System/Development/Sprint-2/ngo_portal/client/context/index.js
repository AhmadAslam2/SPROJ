import { useState, createContext, useEffect } from "react";

export const NGOContext = createContext();

export const NGOProvider = ({ children }) => {
  const [state, setState] = useState({
    ngo: {},
    token: "",
  });

  useEffect(() => {
    setState(JSON.parse(window.localStorage.getItem("auth")));
  }, []);

  return (
    <NGOContext.Provider value={[state, setState]}>
      {children}
    </NGOContext.Provider>
  );
};

//export {NGOContext, NGOProvider};
