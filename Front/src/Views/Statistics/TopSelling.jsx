import { useEffect, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTable } from "react-table";

export const TopSellingComponent = () => {
    const dispatch = useDispatch();
    const sellingData = useSelector((state) => state.payments.topSelling);

    const columns = React.useMemo(
        () => [
          {
            Header: "Game Name",
            accessor: "gameName",
          },
          {
            Header: "Quantity Sold",
            accessor: "quantitySold",
          },
        ],
        []
      );
    
      // Crea la instancia de la tabla
      const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({
        columns,
        data: sellingData, // Pasa los datos de juegos más vendidos aquí
      });
    
      return (
        <div  className="table-responsive p-5 login-box">
          <h2 className="mb-3">Top Selling Games</h2>
          <div className=" table-div">

          <table {...getTableProps()} className="table table-dark table-striped custom-table">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>{column.render("Header")}</th>
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
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
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

};