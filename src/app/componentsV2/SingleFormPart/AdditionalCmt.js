import React, { useState, useEffect } from "react";
import findIndex from "../../func/findIndex";
import styles from "./AdditionalCmt.module.css";
export const AdditionalCmt = ({items}) => {
    const [contentElements, setContentElements] = useState([]);
    const findItem = items[0].Lines;
    useEffect(() => {
      const result = findIndex(
        findItem,
        "ADDITIONAL COMMENTS",
        "ANY OTHER CONDITIONS AFFECTING"
      );
  
      const beginIn = result.beginIndex + 1;
      const endIn = result.endIndex ;
  
      const renderedElements = findItem
        .slice(beginIn, endIn)
        .map((item, index) => {
          // // Return a div element for each LineContent
          return <li key={index}>{item.LineContent}</li>;
        });
      setContentElements(renderedElements);
    }, [items]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>ADDITIONAL COMMENTS</div>
      <div>
        <ul className={styles.myList}>{contentElements}</ul>
      </div>
    </div>
  )
}
