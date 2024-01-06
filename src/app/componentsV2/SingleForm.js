"use client";
import StreamID from "./SingleFormPart/StreamID";
import YearArea from "./SingleFormPart/YearArea";
import styles from "./SingleForm.module.css";
import SpawningTable from "./SingleFormPart/SpawningTable";
import DateInspection from "./SingleFormPart/DateInspection";
import UnusualCon from "./SingleFormPart/UnusualCon";
import { AdditionalCmt } from "./SingleFormPart/AdditionalCmt";
import CmtOnOther from "./SingleFormPart/CmtOnOther";
import Footer from "./SingleFormPart/Footer";

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
      <AdditionalCmt items={items.Pages}/>
      <CmtOnOther items={items.Pages}/>
      <Footer items={items.Pages}/>
    </div>
  );
};

export default SingleForm;
