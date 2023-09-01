import React from 'react';
import './Tienda.css';


const Pagination = ({ currentPage, totalPages, onNextPage, onPrevPage }) => {
  
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  
  
  return (
    <div className='container'>
      <button className='paginationButton' onClick={onPrevPage} disabled={currentPage === 1}>A</button>
      <span className='numeration'>
        {/* {currentPage} de {totalPages} */}
        {pageNumbers.map((pageNumber) => (
          <span key={pageNumber} className={pageNumber === currentPage ? 'activePage' : 'other'}>
            {pageNumber + ' '} 
          </span>
        ))}
      </span>
      <button className='paginationButton' onClick={onNextPage} disabled={currentPage === totalPages}>S</button>
    </div>
  );
};

export default Pagination;