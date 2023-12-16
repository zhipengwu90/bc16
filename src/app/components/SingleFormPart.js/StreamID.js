import React, { useState, useEffect } from "react";

import styles from "./StreamID.module.css";

const StreamID = ({ items }) => {
  // const renderTable2 = () => {
  //   const table = [];
  //   for (let i = 0; i < items.RowCount; i++) {
  //     const row = [];
  //     const rowData = items.Cells.filter((cell) => cell.RowIndex === i);
  //     for (let j = 0; j < items.ColumnCount; j++) {
  //       const cellData = rowData.find((cell) => cell.ColumnIndex === j);
  //       const content = cellData ? cellData.Content : "";
  //       row.push(<td key={j}>{content}</td>);
  //     }
  //     table.push(<tr key={i}>{row}</tr>);
  //   }
  //   return table;
  // };

  const renderTable = () => {
    const table = [];
    for (let i = 0; i < items.RowCount; i++) {
      const row = [];
      const rowData = items.Cells.filter((cell) => cell.RowIndex === i);

      for (let j = 0; j < rowData.length; j++) {
        rowData[j].Content
          ? rowData[j].Content.toUpperCase() == "STREAM IDENTIFICATION"
            ? null
            : row.push(<td key={j}> {rowData[j].Content}</td>)
          : null;
      }

      table.push(<tr key={i}>{row}</tr>);
    }
      table.unshift(
        <tr key= 'StreamID'>
          <td>STREAM IDENTIFICATION</td>
        </tr>
      );
    return table;
  };

  return (
    <div className={styles.StreamBox}>
      <table className={styles.myTable}>
        <tbody> {renderTable()}</tbody>
      </table>
    </div>
  );
};

export default StreamID;
