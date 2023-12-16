import React from "react";
import styles from "./SpawningTable.module.css";
function SpawningTable({ items }) {
  const renderTable = () => {
    const table = [];

    // console.log(items.Cells.RowIndex(0));
    const rowData = items.Cells.filter((cell) => cell.RowIndex === 0);
    const rowHeader = [];
    // let colspan;
    // switch (true) {
    //   case content?.toUpperCase().includes('DATES OF SPAWNING'):
    //     colspan = "6";
    //     break;
    //   case content.toUpperCase().includes('ARRIVAL IN STREAM'):
    //     colspan = "2";
    //     break;
    //   default:
    //     null;
    //     break;
    // }
    rowData.map((cell) => {
      const content = cell.Content;
      let colspan;
      switch (true) {
        case content?.toUpperCase().includes("DATES OF SPAWNING"):
          colspan = "6";
          break;
        case content?.toUpperCase().includes("ARRIVAL IN STREAM"):
          colspan = "2";
          break;
        default:
          null;
          break;
      }

      
      rowHeader.push(
        <td colSpan={colspan} key={cell.Content}>
        {colspan === '6' ? (
          <>
            <div>{cell.Content.substring(0, cell.Content.indexOf('START'))}</div>
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
              {cell.Content
                .substring(cell.Content.indexOf('START'), cell.Content.length)
                .split(' ')
                .map((part, index) => (
                  <span key={index}>{part}</span>
                ))}
            </div>
          </>
        ) : (
          cell.Content
        )}
      </td>
      );
    });
    // rowHeader.push(<td  key={rowData.Content}>{rowData.Content}</td>);
    table.push(<tr key={rowHeader}>{rowHeader}</tr>);

    for (let i = 1; i < items.RowCount; i++) {
      const row = [];
      const rowData = items.Cells.filter((cell) => cell.RowIndex === i);
      for (let j = 0; j < items.ColumnCount; j++) {
        const cellData = rowData.find((cell) => cell.ColumnIndex === j);

        const content = cellData ? cellData.Content : "";

        // const colspan = content.toUpperCase().includes('ARRIVAL IN STREAM')? "2": "1";
        row.push(<td key={j}>{content}</td>);
      }
      table.push(<tr key={i}>{row}</tr>);
    }
    return table;
  };
  return (
    <div className={styles.wrap}>
      <p>SPAWNING RUN TIMING and ESTIMATED NUMBER</p>
      <table className={styles.myTable}>
        <tbody>{renderTable()}</tbody>
      </table>
    </div>
  );
}

export default SpawningTable;
