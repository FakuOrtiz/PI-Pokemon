import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentPage } from '../../redux/actions';
import "./Paginacion.css"

export default function Paginacion({allPokes}) {
    let currentPage = useSelector(state => state.page);
    let pageNumbers = [];
    let pokesPerPage = 12;
    let totalPages = Math.ceil(allPokes/pokesPerPage);
    let dispatch = useDispatch();
    
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className='contenedorPaginado'>
            <ul>
                <button disabled={currentPage - 1 === 0} onClick={() => dispatch(setCurrentPage(currentPage - 1))}>PREV</button>
                {
                    pageNumbers?.map(num => {
                        return (
                            <li key={num}>
                                <button className={currentPage === num ? "btnActive" : "btnPagination"} onClick={() => dispatch(setCurrentPage(num))}>{num}</button>
                            </li>
                        )
                    })
                }
                <button disabled={currentPage === totalPages} onClick={() => dispatch(setCurrentPage(currentPage + 1))}>NEXT</button>
            </ul>
        </nav>
    )

}
