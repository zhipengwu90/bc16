import React, { useState, useEffect } from "react";
import findIndex from "../../func/findIndex";
import styles from "./CmtOnOther.module.css";
const CmtOnOther = ({ items }) => {
  const [contentElements, setContentElements] = useState([]);
  const findItem = items[0].Lines;
  useEffect(() => {
    const result = findIndex(
      findItem,
      "CONDITIONS AFFECTING THIS STREAM",
      "CONDITIONS AFFECTING THIS STREAM"
    );

    const beginIn = result.beginIndex + 1;
    const endIn = result.endIndex + 2;

    const renderedElements = () => {
      // // Return a div element for each LineContent
      return <div className={styles.context}>{findItem[beginIn].LineContent}</div>;
    };
    setContentElements(renderedElements);
  }, [items]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        COMMENTS ON ANY OTHER CONDITIONS AFFECTING THIS STREAM
      </div>

      {contentElements}
    </div>
  );
};

export default CmtOnOther;
