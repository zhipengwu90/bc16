import React from "react";
import styles from "./YearArea.module.css";
const YearArea = ({ items }) => {
  const renderTable = () => {
    const table = [];
    for (let i = 0; i < items.RowCount; i++) {
      const row = [];
      const rowData = items.Cells.filter((cell) => cell.RowIndex === i);
      for (let j = 0; j < items.ColumnCount; j++) {
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
      <table className={styles.myTable}>
        <tbody> {renderTable()}</tbody>
      </table>
    </div>
  );
};

export default YearArea;
