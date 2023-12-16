"use client";
import StreamID from "./SingleFormPart.js/StreamID";
import YearArea from "./SingleFormPart.js/YearArea";
import styles from "./SingleForm.module.css";
import SpawningTable from "./SingleFormPart.js/SpawningTable";
import DateInspection from "./SingleFormPart.js/DateInspection";
const SingleForm = ({ items }) => {
  const length = items.Tables.length - 1;

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.header1}>DEPARTMENT of FISHERIES and OCEANS</div>
        <div className={styles.header2}>ANNUAL REPORT of SALMON STREAMS and SPAWNING POPULATION</div>
      </div>

      <div className={styles.headerBox}>
        <StreamID items={items.Tables[0]} />
        <div>
          <YearArea items={items.Tables[1]} />
          <DateInspection items={items.Pages} />
        </div>
      </div>
      <div>
        <SpawningTable items={items.Tables[length]} />
      </div>
    </div>
  );
};

export default SingleForm;
