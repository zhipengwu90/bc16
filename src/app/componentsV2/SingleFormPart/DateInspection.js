import React, { useState, useEffect, use } from "react";
import styles from "./DateInspection.module.css";
import findIndex from "../../func/findIndex";
const DateInspection = ({ items }) => {

  const [contentElements, setContentElements] = useState([]);
  const findItem = items[0].Lines;
  useEffect(() => {
    const result = findIndex(
      findItem,
      "DATES of INSPECTION",
      "SPAWNING RUN TIMING"
    );


    const beginIn = result.beginIndex + 1;
    const endIn = result.endIndex;
    const renderedElements = findItem
      .slice(beginIn, endIn)
      .map((item, index) => {
        // // Return a div element for each LineContent
        return <div className = {styles.dateText} key= {index}>{item.LineContent} </div>;
      });
    setContentElements(renderedElements);
  }, [items]);

  return (
    <div className={styles.wrapper}>
      <div>DATES of INSPECTION</div>
     <div className = {styles.dateBox}>{contentElements}</div>
    </div>
  );
};

export default DateInspection;
