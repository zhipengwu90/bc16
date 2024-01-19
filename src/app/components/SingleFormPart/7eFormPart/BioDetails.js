import React from "react";
import styles from "./BioDetails.module.css";
const BioDetails = ({ items, folderName }) => {
  const partDetails = items["Biological details particulars"];

  //   "Present SK": "unselected",
  //   "Present CO": "unselected",
  //   "Present PK": "unselected",
  //   "Present CM": "unselected",
  //   "Present CN": "unselected",
  //   "Study SK": "unselected",
  //   "Study CO": "unselected",
  //   "Study PK": "unselected",
  //   "Study CM": "unselected",
  //   "Study CN": "unselected",

  const presentSK = items["Present SK"];
  const presentCO = items["Present CO"];
  const presentPK = items["Present PK"];
  const presentCM = items["Present CM"];
  const presentCN = items["Present CN"];
  const studySK = items["Study SK"];
  const studyCO = items["Study CO"];
  const studyPK = items["Study PK"];
  const studyCM = items["Study CM"];
  const studyCN = items["Study CN"];

  return (
    <>
      <div className={styles.title}>RECOMMENDATIONS</div>
      <div className={styles.wrapper}>
        <div className={styles.part}>
          <div className={styles.partDetailsTitle}>
            Particulars of distribution of spawning salmon over the stream bed:
          </div>
          <div className={styles.partDetails}>{partDetails}</div>
        </div>
        <div className={styles.part}>
          <div className={styles.partDetailsTitle}>Juvenile observations:</div>
          <div className={styles.juvenile}>
            <div>
              <div>Type</div>
              <div>Juveniles present?</div>
              <div>Juveniles studies performed?</div>
            </div>
            <div>
              <div>SK</div>
              <div className={styles[presentSK]}></div>
              <div className={styles[studySK]}></div>
            </div>
            <div>
              <div>CO</div>
              <div className={styles[presentCO]}></div>
              <div className={styles[studyCO]}></div>
            </div>
            <div>
              <div>PK</div>
              <div className={styles[presentPK]}></div>
              <div className={styles[studyPK]}></div>
            </div>
            <div>
              <div>CM</div>
              <div className={styles[presentCM]}></div>
              <div className={styles[studyCM]}></div>
            </div>
            <div>
              <div>CN</div>
              <div className={styles[presentCN]}></div>
              <div className={styles[studyCN]}></div>
            </div>
          </div>
        </div>
        <div className={styles.part}>
          <div className={styles.partDetailsTitle}>
            Evidence of digging up of redds or eggs by spawning fish:
          </div>
          <ul className={styles.myList}>
            <li>
                Pink:
            </li>
            <li>
                Sockeye:
            </li>
            <li>
                Chum:
            </li>

          </ul>
        </div>
      </div>
    </>
  );
};

export default BioDetails;
