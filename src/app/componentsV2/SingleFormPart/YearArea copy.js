import React, { useState, useEffect } from "react";
import styles from "./YearArea.module.css";
import checkTable from "../../func/checkTable";
import findIndex from "../../func/findIndex";


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
    const table = [];
    for (let i = 0; i < item.RowCount; i++) {
      const row = [];
      const rowData = item.Cells.filter((cell) => cell.RowIndex === i);
      for (let j = 0; j < item.ColumnCount; j++) {
        const cellData = rowData.find((cell) => cell.ColumnIndex === j);
        const content = cellData ? cellData.Content : "";
        row.push(<td key={j}>{content}</td>);
      }
      table.push(<tr key={i}>{row}</tr>);
    }
    return table;
  };
  return (
    <div className={styles.yearBox}>
      {findTable.length ? (
        <table className={styles.myTable}>
          <tbody> {findTable} </tbody>{" "}
        </table>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default YearArea;
