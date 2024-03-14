import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import Logo from "../logo/Logo";
import Casita from "../../casita/Casita";

const Navbar = ( { numeroAnimales } ) =>
{
  const [ casitaAbierta, setCasitaAbierta ] = useState( false );
  const casitaRef = useRef( null );

  useEffect( () =>
  {
    function handleClickOutside ( event )
    {
      if ( casitaRef.current && !casitaRef.current.contains( event.target ) )
      {
        setCasitaAbierta( false );
      }
    }

    document.addEventListener( "mousedown", handleClickOutside );
    return () =>
    {
      document.removeEventListener( "mousedown", handleClickOutside );
    };
  }, [ casitaRef ] );

  const toggleCasita = () =>
  {
    setCasitaAbierta( !casitaAbierta );
  };

  return (
    <nav className="navbar-container">
      <div className="navbar">
        <div className="navlink-container">
          <NavLink className="navlink" to="/sobreNosotras" id="active-link">
            Sobre Nosotras
          </NavLink>
          <NavLink className="navlink" to="/adoptar" id="active-link">
            Adoptar
          </NavLink>
          <NavLink className="navlink" to="/donar" id="active-link">
            Donar
          </NavLink>
          <div className="hamburger">☰</div>
        </div>
        <div className="logo-container">
          <NavLink to="/">
            <Logo />
          </NavLink>
        </div>
        <div className="casita-container" ref={casitaRef}>
          <img
            className="casita"
            alt="casita"
            src="src\assets\images\casitaIcon.png"
            onClick={toggleCasita}
          />
          {numeroAnimales > 0 && (
            <span className="numero-animales">{numeroAnimales}</span>
          )}
          {casitaAbierta && (
            <div className="casita-dropdown">
              <Casita />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

