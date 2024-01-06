import React, { useState, useEffect } from "react";
import findIndex from "../../func/findIndex";
import styles from "./UnusualCon.module.css";
const UnusualCon = ({ items }) => {
  // Component logic goes here

  const [contentElements, setContentElements] = useState([]);
  const findItem = items[0].Lines;
  useEffect(() => {
    const result = findIndex(
      findItem,
      "UNUSUAL CONDITIONS",
      "flow level during spawning"
    );

    const beginIn = result.beginIndex + 1;
    const endIn = result.endIndex + 1;

    const renderedElements = findItem
      .slice(beginIn, endIn)
      .map((item, index) => {
        // // Return a div element for each LineContent
        return <li key={index}>{item.LineContent}</li>;
      });
    setContentElements(renderedElements);
  }, [items]);

  return (
    // JSX code goes here
    <div className={styles.wrapper}>
      <div className={styles.title}>UNUSUAL CONDITIONS</div>
      <div>
        <ul className={styles.myList}>{contentElements}</ul>
      </div>
    </div>
  );
};

export default UnusualCon;
