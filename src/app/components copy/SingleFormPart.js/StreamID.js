import React, { useState, useEffect } from "react";
import findIndex from "../../func/findIndex";
import styles from "./StreamID.module.css";

const StreamID = ({ item }) => {
  const [beginIndex, setBeginIndex] = useState(null);
  const [endIndex, SetEndIndex] = useState(null);
  const [contentElements, setContentElements] = useState([]);
  useEffect(() => {
    const result = findIndex(item, "STREAM IDENTIFICATION", "YEAR:");

    setBeginIndex(result.beginIndex);
    SetEndIndex(result.adjustedEndIndex);
    const beginIn = result.beginIndex;
    const endIn = result.adjustedEndIndex;
    ContentPosition({ item, beginIn, endIn });

    const renderedElements = item
      .slice(result.beginIndex, result.adjustedEndIndex)
      .map((item, index) => {
        // console.log(item.BoundingBox);
        // Extracting coordinates from the BoundingBox array
        //parsing the string to array
        const coordinates = JSON.parse(`[${item.BoundingBox}]`);

        const [x1, y1] = coordinates[0];
        const [x2, y2] = coordinates[2];

        // // Calculate width and height
        const width = x2 - x1;
        const height = y2 - y1;

        // // Set styles for positioning
        const style = {
          position: "absolute",
          left: x1 * 30 + "%", // Assuming 100% width of the container
          top: y1 * 50 - 60 + "%", // Assuming 100% height of the container
          width: width * 100 + "%", // Assuming 100% width of the container
          height: height * 100 + "%", // Assuming 100% height of the container
        };

        // // Return a div element for each LineContent
        return (
          <div key={index} style={style}>
            {item.LineContent}
          </div>
        );
      });
    setContentElements(renderedElements);
  }, [item]);

  return <div className={styles.StreamBox}>{contentElements}</div>;
};

export default StreamID;
