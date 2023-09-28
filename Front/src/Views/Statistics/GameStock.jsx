import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useTable, useSortBy, useFilters } from "react-table";

export const GameStockComponent = () => {
    const [globalFilter, setLocalFilter] = useState('');
    
    const ColumnFilter = ({ column }) => {
      const { filterValue, setFilter } = column;

      const handleSearchClick = (e) => {
        if (e.target.tagName === 'INPUT') {
          e.stopPropagation();
        }
      };  
      
      return (
        <input
          value={filterValue || ''}
          onChange={(e) => {
            setFilter(e.target.value || undefined);
            setLocalFilter(e.target.value);
          }}
          placeholder={`Search ${column.Header}`}
          onClick={handleSearchClick}
          className="form-control bg-transparent text-white col-6"
        />
      );
    };
    const stockData = useSelector((state) => state.game.game)
    
    const columns = React.useMemo(
        () => [
            {
                Header: 'Game',
                accessor: 'name',
                sortType: 'alphanumeric',
                Filter: ColumnFilter,
            },
            {
                Header: 'Stock',
                accessor: 'stock',
                sortType: 'basic',
          },
        ],
        []
      );
    
      const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter,
      } = useTable(
        {
          columns,
          data: stockData,
        },
        useFilters,
        useSortBy
      );
    
    
      return (
        <div className="table-responsive p-5 login-box">
          <h2 className="mb-3">Game Stock</h2>
          {/* <input
            value={globalFilter}
            onChange={(e) => {
              setGlobalFilter(e.target.value || undefined); // Establece el filtro global
              setLocalFilter(e.target.value); // Actualiza el estado local de filtro
            }}
            placeholder="Buscar en todos los juegos"
          /> */}
          <div className=" table-div">

          <table  {...getTableProps()} className="table table-dark table-striped custom-table">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th className=" fs-6 p-4 " {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render('Header')}
                      <span className="mb-3">
                        {column.isSorted
                          ? column.isSortedDesc
                            ? <i class="ms-3 fa-solid fa-chevron-down"></i>
                            : <i class="ms-3 fa-solid fa-chevron-up"></i>
                          : ''}
                      </span>
                      {column.Header === 'Game' ? (
                        <div>{column.render('Filter')}</div>
                      ) : null}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        </div>
      );
}