import React from 'react';
import loading from "../../assets/img/loading3.gif";
import "./Loading.css"

export default function Loading() {
  return (
    <div className='contenedorLoading'>
        <img src={loading} alt="loading" />
    </div>
  )
}