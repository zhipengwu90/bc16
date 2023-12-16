"use client";
import StreamID from "./SingleFormPart.js/StreamID";
import YearArea from "./SingleFormPart.js/YearArea";
import styles from "./SingleForm.module.css";
import SpawningTable from "./SingleFormPart.js/SpawningTable";
const SingleForm = ({ items }) => {
  const length = items.Tables.length -1;
  
  return (
    <div>
      <div className={styles.headerBox}>
        <StreamID items={items.Tables[0]} />
        <YearArea items={items.Tables[1]} />
      </div>
      <div>
        <SpawningTable items={items.Tables[length]} />
      </div>
    </div>
  );
};

export default SingleForm;
