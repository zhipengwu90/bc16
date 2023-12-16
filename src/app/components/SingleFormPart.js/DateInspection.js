import React, { useState, useEffect, use } from "react";
import styles from "./DateInspection.module.css";
import findIndex from "../../func/findIndex";
const DateInspection = ({ items }) => {
  const [beginIndex, setBeginIndex] = useState(null);
  const [endIndex, SetEndIndex] = useState(null);
  const [contentElements, setContentElements] = useState([]);
  const findItem = items[0].Lines;
  useEffect(() => {
    const result = findIndex(
      findItem,
      "DATES of INSPECTION",
      "SPAWNING RUN TIMING"
    );
    setBeginIndex(result.beginIndex);
    SetEndIndex(result.adjustedEndIndex);

    const beginIn = result.beginIndex + 1;
    const endIn = result.adjustedEndIndex;
    const renderedElements = findItem
      .slice(beginIn, endIn)
      .map((item, index) => {
        // // Return a div element for each LineContent
        return <span className = {styles.dateText} key= {index}>{item.LineContent} </span>;
      });
    setContentElements(renderedElements);
  }, [items]);

  return (
    <div className={styles.wrapper}>
      <div>DATES of INSPECTION</div>
     {contentElements}
    </div>
  );
};

export default DateInspection;
