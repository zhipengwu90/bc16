import React, { useState, useEffect } from "react";
import findIndex from "../../func/findIndex";
import styles from "./Footer.module.css";

const Footer = ({ items }) => {
  const [contentElements, setContentElements] = useState([]);
  const findItem = items[0].Lines;
  useEffect(() => {
    const result = findIndex(
      findItem,
      "CONDITIONS AFFECTING THIS STREAM",
      "CONDITIONS AFFECTING THIS STREAM"
    );

    const beginIn = result.beginIndex + 2;
    const endIn = findItem.length;

    const renderedElements = findItem
      .slice(beginIn, endIn)
      .map((item, index) => {
        // // Return a div element for each LineContent
        return <div key={index} >{item.LineContent}</div>;
      });
    setContentElements(renderedElements);
  }, [items]);
  return (
    <div className={styles.wrapper}>
      {contentElements}
    </div>
  );
};

export default Footer;
