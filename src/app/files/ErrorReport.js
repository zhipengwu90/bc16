"use client";
import { useState, useRef, useEffect } from "react";

import styles from "./ErrorReport.module.css";
import { logData } from "./action.js";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
const ErrorReport = ({ folderName, fileName }) => {
  const router = useRouter();
  const [isError, setIsError] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const [state, formAction] = useFormState(logData, {
    status: null,
    message: null,
  });

  // useEffect(() => {
  //   if (state.status === 200) {
  //     setIsToggled(false);
  //     setSubmitData({
  //       fileName: fileName,
  //       folderName: folderName,
  //       errorField: "Stream Identification",
  //       errorDescription: "",
  //     });
  //     errorFieldRef.current.value = "";
  //     errorDescriptionRef.current.value = "";
  //   }

  //   if (state.status === 500) {
  //     setIsError(true);
  //   }
  // }, [state.status]);

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
  // const onClickHandler = async () => {
  //   const Respone = await fetch("/api", {
  //     method: "POST",
  //     body: JSON.stringify(submitData),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   if (!Respone.ok) {
  //     setIsError(true);
  //   } else {
  //     setIsError(false);
  //     setIsToggled(false);
  //     setSubmitData({
  //       fileName: fileName,
  //       folderName: folderName,
  //       errorField: "Stream Identification",
  //       errorDescription: "",
  //     });
  //     errorFieldRef.current.value = "";
  //     errorDescriptionRef.current.value = "";
  //   }
  // };

  return (
    <>
      <button onClick={() => setIsToggled(!isToggled)}>Report Errors</button>
      {isToggled && (
        <>
          <div
            className={styles.backdrop}
            onClick={() => setIsToggled(!isToggled)}
          ></div>
          <form
            className={styles.errorWindow}
            action={formAction}
            onSubmit={() => setIsToggled(false)}
          >
            <div className={styles.title}>Report Errors</div>
            <div className={styles.formField}>
              <input
                type="hidden"
                id="folderName"
                name="folderName"
                value={folderName}
              />
              <input
                type="hidden"
                id="fileName"
                name="fileName"
                value={fileName}
              />
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
            <div className={styles.formField}>
              <label htmlFor="errorDescription">Error Description</label>
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
                type="submit"

                // onClick={() => onClickHandler()}
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
          </form>
        </>
      )}
    </>
  );
};

export default ErrorReport;
