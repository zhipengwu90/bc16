"use client";
import StreamID from "./SingleFormPart.js/StreamID";
import YearArea from "./SingleFormPart.js/YearArea";
import styles from "./SingleForm.module.css";
import SpawningTable from "./SingleFormPart.js/SpawningTable";
import DateInspection from "./SingleFormPart.js/DateInspection";
import UnusualCon from "./SingleFormPart.js/UnusualCon";
const SingleForm = ({ items }) => {





  return (
    <div>
      <div className={styles.header}>
        <div className={styles.header1}>DEPARTMENT of FISHERIES and OCEANS</div>
        <div className={styles.header2}>
          ANNUAL REPORT of SALMON STREAMS and SPAWNING POPULATION
        </div>
      </div>

      <div className={styles.headerBox}>
        <StreamID items={items} />
        <div>
          <YearArea items={items} />
          <DateInspection items={items.Pages} />
        </div>
      </div>
      <div>
        <SpawningTable items={items} />
      </div>
      <UnusualCon items={items.Pages}/>
    </div>
  );
};

export default SingleForm;
