import React, { useState, useEffect } from "react";
import styles from "./YearArea.module.css";
import checkTable from "../../func/checkTable";

const YearArea = ({ items }) => {
  const [findTable, setFindTable] = useState([]);

  useEffect(() => {
    const tableIndex = checkTable(
      items,
      "District Number",
      "Subdistrict Number",
      "Statistical Area"
    );

    if (tableIndex !== undefined && tableIndex !== null) {
      setFindTable(renderTable(items.Tables[tableIndex]));
    }
  }, [items]);

  const renderTable = (item) => {
    return item.Cells.map((_, i) => {
      const rowData = item.Cells.filter((cell) => cell.RowIndex === i);
      const rowCells = rowData.map((cell, j) => (
        <td key={j}>{cell.Content}</td>
      ));
      return <tr key={i}>{rowCells}</tr>;
    });
  };

  return (
    <div className={styles.yearBox}>
      {findTable.length ? (
        <table className={styles.myTable}>
          <tbody>{findTable}</tbody>
        </table>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default YearArea;