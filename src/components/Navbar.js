import React, { useContext, useEffect } from "react";
import SeniorSvg from "../assets/SVGs/SeniorSvg";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Context } from "../context/ThemeContext";

const Navbar = () => {
  const { theme, setTheme } = useContext(Context);
  
  const changeLightTheme = () => {
    document.body.classList.add("light");
    document.body.classList.remove("dark");
    setTheme("light");
  };

  const changeDarkTheme = () => {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    setTheme("dark");
  };

  useEffect(() => {
    localStorage.setItem("themechoice", theme);
  }, []);

  return (
    <div>
      <div className="navbar">
        <div className="logo">
          <SeniorSvg theme={theme} />
        </div>
        <div className="themebuttons">
          <button
            onClick={() => changeLightTheme()}
            type="button"
            className={`btn btnprimar ${theme === "light" ? "active" : ""}`}
          >
            <i className="bi bi-brightness-high-fill"></i>
          </button>
          <button
            onClick={() => changeDarkTheme()}
            type="button"
            className={`btn btnsecon ${theme === "dark" ? "active" : ""}`}
          >
            <i className="bi bi-moon-fill"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
