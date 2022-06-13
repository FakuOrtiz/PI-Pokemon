import React from "react";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllPokemons, getAllTypes } from "../../redux/actions";
import "./Inicio.css";
import titulo from "../../assets/img/titulo.png"
import ash from "../../assets/img/Ash_Inicio.png"

export default function Inicio() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPokemons());
    dispatch(getAllTypes());
  }, [dispatch]);

  return (
    <div className="contenedorInicio">
      <NavLink to="/pokemons">
        <img src={titulo} alt="titulo" className="tituloInicio"/>
      </NavLink>
      <p className="clickParaEmpezar">¡Clickeá APPemon para comenzar!</p>
      <img src={ash} alt="ash" className="ash"/>
    </div>
  );
}