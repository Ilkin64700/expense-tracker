import { createContext, useEffect, useState } from "react";
import React from "react";

export const Context = createContext();

const ThemeProvider = ({ children }) => {
 const [theme, setTheme] = useState(localStorage.getItem("themechoice"))
 
  useEffect(() => {
    document.body.classList.add(theme)
    localStorage.setItem("themechoice",theme)
  }, [theme])

  useEffect(() => {
    if(localStorage.getItem("themechoice"))
    setTheme(localStorage.getItem("themechoice"))
  }, [])
  
  return (
    <Context.Provider value={{theme,setTheme}}>
      {children}
    </Context.Provider>
  );
};

export default ThemeProvider
