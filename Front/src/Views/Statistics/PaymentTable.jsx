import { useState } from "react";
import { useTable, useFilters } from "react-table";
import "./PaymentTable.css"

export const PaymentTable = ({ columns, data }) => {
  const [filterInput, setFilterInput] = useState("");

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
  } = useTable({
    columns,
    data,
  },
    useFilters
  );

  const handleFilterChange = (e) => {
    const value = e.target.value || "";
    setFilter("idPayment", value); // Aplicar el filtro a la columna "payment_id"
    setFilterInput(value);
  };

  return (
    <div className="table-responsive p-5">
      <input
        value={filterInput}
        onChange={handleFilterChange}
        placeholder="Filter by Payment ID"
        className="filter-input"
      />
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
  );

  // return (
  //   <div className="table-responsive p-5">
  //     <table {...getTableProps()} className="table table-dark table-striped custom-table ">
  //       <thead>
  //         {headerGroups.map((headerGroup) => (
  //           <tr {...headerGroup.getHeaderGroupProps()}>
  //             {headerGroup.headers.map((column) => (
  //               <th {...column.getHeaderProps()}>{column.render("Header")}</th>
  //             ))}
  //           </tr>
  //         ))}
  //       </thead>
  //       <tbody {...getTableBodyProps()}>
  //         {rows.map((row) => {
  //           prepareRow(row);
  //           return (
  //             <tr {...row.getRowProps()}>
  //               {row.cells.map((cell) => {
  //                 return (
  //                   <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
  //                 );
  //               })}
  //             </tr>
  //           );
  //         })}
  //       </tbody>
  //     </table>
  //   </div>
  // );
};