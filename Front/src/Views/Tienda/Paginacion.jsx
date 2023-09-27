import React from 'react';
import './Tienda.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePageClick = (pageNumber) => {
    
    onPageChange(pageNumber);
  };

  return (
    <div className='data-pagination'>
      <button
        className='paginationButton'
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <i className="fa-solid fa-chevron-left"></i>
      </button>
      <span className='numeration'>
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            className={pageNumber === currentPage ? 'activePage' : 'other'}
            onClick={() => handlePageClick(pageNumber)}
          >
            {pageNumber + ' '}
          </button>
        ))}
      </span>
      <button
        className='paginationButton'
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <i className="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  );
};


// const Pagination = ({ currentPage, totalPages, onNextPage, onPrevPage }) => {
  
//   const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  
  
//   return (
//     <div className='data-pagination'>
//       <button className='paginationButton' onClick={onPrevPage} disabled={currentPage === 1}><i className="fa-solid fa-chevron-left"></i></button>
//       <span className='numeration'>
//         {/* {currentPage} de {totalPages} */}
//         {pageNumbers.map((pageNumber) => (
//           <span key={pageNumber} className={pageNumber === currentPage ? 'activePage' : 'other'}>
//             {pageNumber + ' '} 
//           </span>
//         ))}
//       </span>
//       <button className='paginationButton' onClick={onNextPage} disabled={currentPage === totalPages}><i className="fa-solid fa-chevron-right"></i></button>
//     </div>
//   );
// };

export default Pagination;