import React from "react";
import styles from "./SpawningTable.module.css";
function SpawningTable({ items }) {
  const renderTable = () => {
    const table = [];

    // console.log(items.Cells.RowIndex(0));
    const rowData = items.Cells.filter((cell) => cell.RowIndex === 0);

    for (let i = 2; i < items.RowCount; i++) {
      const row = [];
      const rowData = items.Cells.filter((cell) => cell.RowIndex === i);
      for (let j = 0; j < items.ColumnCount; j++) {
        if (j === 0) {
          switch (i) {
            case 2:
              row.push(
                <td rowSpan="2" className={styles.rowOne} key={j}>
                  SOCKEYE 1 <br /> 2{" "}
                </td>
              );
              break;

            case 4:
              row.push(
                <td rowSpan="2" className={styles.rowOne} key={j}>
                  COHO 1<br /> 2
                </td>
              );
              break;

            case 6:
              row.push(
                <td rowSpan="2" className={styles.rowOne} key={j}>
                  PINK 1 <br /> 2
                </td>
              );
              break;

            case 8:
              row.push(
                <td rowSpan="2" className={styles.rowOne} key={j}>
                  CHUM 1 <br /> 2
                </td>
              );
              break;

            case 10:
              row.push(
                <td rowSpan="2" className={styles.rowOne} key={j}>
                  CHINOOK 1 <br /> 2
                </td>
              );
              break;

            default:
              break;
          }
        } else {
          const cellData = rowData.find((cell) => cell.ColumnIndex === j);
          const content = cellData ? cellData.Content : "";

          // const colspan = content.toUpperCase().includes('ARRIVAL IN STREAM')? "2": "1";
          row.push(<td key={j}>{content}</td>);
        }
      }
      table.push(<tr key={i}>{row}</tr>);
    }
    return table;
  };
  return (
    <div className={styles.wrap}>
      <div className={styles.title}>SPAWNING RUN TIMING and ESTIMATED NUMBER</div>
      <table className={styles.myTable}>
        <tbody>
          <tr className={styles.tableHeader}>
            <td rowSpan={2}>(1)  <br/>SPECIES</td>
            <td colSpan="2">(2)  <br/>ARRIVAL IN STREAM</td>
            <td colSpan="6">
              <div>(3)  <br/>DATES of SPAWNING </div>
              <div className={styles.columThree}>
                <span>START</span>
                <span>PEAK</span>
                <span>END</span>
              </div>
            </td>
            <td rowSpan={2}>(4) <br/> # of OBS.</td>
            <td rowSpan={2}>(5) <br/> MTH</td>
            <td rowSpan={2}>(6) <br/> REL.</td>
            <td rowSpan={2}>(7)  <br/>TOT. ON GROUNDS</td>
            <td rowSpan={2}>(8)  <br/>TARGET ESCAPE.</td>
          </tr>
          <tr className={styles.secondRow}>
            <td>mth.</td>
            <td>day</td>
            <td>mth.</td>
            <td>day</td>
            <td>mth.</td>
            <td>day</td>
            <td>mth.</td>
            <td>day</td>
          </tr>

          {renderTable()}
        </tbody>
      </table>
    </div>
  );
}

export default SpawningTable;
