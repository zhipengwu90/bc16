import React, { useState, useEffect } from "react";
import checkTable from "../../func/checkTable";
import styles from "./StreamID.module.css";
import findIndex from "../../func/findIndex";

const StreamID = ({ items }) => {
  const [findTable, setFindTable] = useState(null);
  const [streamTableRender, setStreamTableRender] = useState(null);
  useEffect(() => {
    const tableIndex = checkTable(
      items,
      "WATER SHED CODE",
      "GAZETTED",
      "LOCATION NAME"
    );
    if (tableIndex !== undefined && tableIndex !== null) {
      setFindTable(renderTable(items.Tables[tableIndex]));
    } else {
      const findItem = items.Pages[0].Lines;
      const { beginIndex, endIndex } = findIndex(
        findItem,
        "Watershed Code",
        "Flows into"
      );

      const streamId = items.Pages[0].Lines.slice(beginIndex, endIndex + 2);
      const findContentIndex = (word) => {
        return (
          streamId.findIndex((item) =>
            item.LineContent.toLowerCase().includes(word)
          ) + 1
        );
      };
      const waterShed = findContentIndex
        ? streamId[findContentIndex("watershed")].LineContent
        : "";
      const gazettedName = findContentIndex
        ? streamId[findContentIndex("gazetted")].LineContent
        : "";
      const localName = findContentIndex
        ? streamId[findContentIndex("local name")].LineContent
        : "";
      const flowsInto = findContentIndex
        ? streamId[findContentIndex("flows into")].LineContent
        : "";

      const streamIdTable = {
        "Watershed Code": waterShed,
        "Gazetted Name": gazettedName,
        "Local Name": localName,
        "Flows Into": flowsInto,
      };

      // const renderTable2 = (item) => {

      //   {Object.keys(item).map((key) => (
      //     <tr key={key}>
      //       <td>{key}</td>
      //       <td>{item[key]}</td>
      //     </tr>
      //   ))}
      //   return (
      //     <table className={styles.myTable}>
      //       <tbody>
      //         <tr key="StreamID">
      //           <td colSpan={2}>STREAM IDENTIFICATION</td>
      //         </tr>
  
      //       </tbody>
      //     </table>
      //   );
      // };

      // setStreamTableRender(renderTable2(streamIdTable));
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
          <tbody> {findTable} </tbody>
        </table>
      ) : (
 " Loading...    "
      )}
    </div>
  );
};

export default StreamID;
