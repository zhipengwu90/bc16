"use client";
import { useState, useRef } from "react";
import styles from "./ErrorReport.module.css";

const ErrorReport = ({ folderName, fileName }) => {
  const [isError, setIsError] = useState(false);
  const [isToggled, setIsToggled] = useState(false);

  const errorFieldRef = useRef(null);
  const errorDescriptionRef = useRef(null);
  const [submitData, setSubmitData] = useState({
    fileName: fileName,
    folderName: folderName,
    errorField: "Stream Identification",
    errorDescription: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    const trimmedValue = value.trim();
    setSubmitData({
      ...submitData,
      [name]: trimmedValue,
    });
  };
  const onClickHandler = async () => {
    const Respone = await fetch("/api", {
      method: "POST",
      body: JSON.stringify(submitData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!Respone.ok) {
      setIsError(true);
    } else {
      setIsError(false);
      setIsToggled(false);
      setSubmitData({
        fileName: fileName,
        folderName: folderName,
        errorField: "Stream Identification",
        errorDescription: "",
      });
      errorFieldRef.current.value = "";
      errorDescriptionRef.current.value = "";
    }
  };

  return (
    <>
      <button onClick={() => setIsToggled(!isToggled)}>Report Errors</button>
      {isToggled && (
        <>
          <div
            className={styles.backdrop}
            onClick={() => setIsToggled(!isToggled)}
          ></div>
          <div className={styles.errorWindow}>
            <div className={styles.title}>Report Errors</div>
            <div className={styles.formWrapper}>
              <label htmlFor="errorField">Error Field: </label>
              <select
                id="errorField"
                name="errorField"
                onChange={handleChange}
                ref={errorFieldRef}
              >
                <option defaultValue value="Stream Identification">
                  Stream Identification
                </option>
                <option value="yearArea">Year/Area</option>
                <option value="spawningTable">Spawning Table</option>
                <option value="unusualCondition">Unusual Condition</option>
                <option value="physicalCondition">Physical Condition</option>
                <option value="habitatCondition">Biological Condition</option>
                <option value="comments">Comments</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="errorDescription">Error Description</label>
              <br />
              <textarea
                className={styles.errorDescription}
                type="text"
                name="errorDescription"
                onChange={handleChange}
                ref={errorDescriptionRef}
              />
            </div>
            <div className={styles.buttonWrapper}>
              <button
                className={styles.submit}
                onClick={() => onClickHandler()}
              >
                Submit
              </button>
              <button
                className={styles.cancel}
                onClick={() => {
                  setIsToggled(false);
                  setSubmitData({
                    fileName: fileName,
                    folderName: folderName,
                    errorField: "Stream Identification",
                    errorDescription: "",
                  });
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ErrorReport;
