"use client";

import StreamID from "../components/SingleFormPart/StreamID";
import styles from "./SingleForm.module.css";
import Area from "../components/SingleFormPart/Area";
import Dates from "../components/SingleFormPart/Dates";
import SpawningTable from "./SingleFormPart/SpawningTable";
import UnusualCon from "../components/SingleFormPart/UnusualCon";

const SingleForm = ({ items, folderName }) => {
  const format6e = folderName == "6eresultocr";
  const format4c = folderName == "4cresultocr";
  const format4h = folderName == "4hresultocr";
  const format5a = folderName == "5aresultocr";
  const format7e = folderName == "7eresultocr";

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.header1}>DEPARTMENT OF FISHERIES AND OCEANS</div>
        <div className={styles.header2}>
          ANNUAL REPORT OF SALMON STREAMS AND SPAWNING POPULATION
        </div>
      </div>
      <div className={styles.headerBox}>
        <div className={styles.streamID}>
          <StreamID folderName={folderName} items={items} />
        </div>
        <div className={styles.areaDates}>
          <Area items={items} folderName={folderName} />
          <Dates items={items} folderName={folderName} />
        </div>
      </div>
      <SpawningTable items={items} folderName={folderName} />
      {(format4c || format6e || format7e) && (
        <UnusualCon items={items} folderName={folderName} />
      )}
    </div>
  );
};

export default SingleForm;
