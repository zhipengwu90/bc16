import React, { useState, useEffect } from "react";
import checkTable from "../../func/checkTable";
import styles from "./StreamID.module.css";

const StreamID = ({ items }) => {
  const [findTable, setFindTable] = useState(null);
  useEffect(() => {
    const tableIndex = checkTable(
      items,
      "WATER SHED CODE",
      "GAZETTED",
      "LOCATION NAME"
    );
    if (tableIndex !== undefined && tableIndex !== null) {
      setFindTable(renderTable(items.Tables[tableIndex]));
    }
  }, [items]);

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

  const renderTable = (item) => {
    const table = [];
    for (let i = 0; i < item.RowCount; i++) {
      const row = [];
      const rowData = item.Cells.filter((cell) => cell.RowIndex === i);

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
      <tr key="StreamID">
        <td colSpan={2}>STREAM IDENTIFICATION</td>
      </tr>
    );
    return table;
  };

  return (
    <div className={styles.StreamBox}>
      {findTable ? (
        <table className={styles.myTable}>
          <tbody> {findTable} </tbody>{" "}
        </table>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default StreamID;
