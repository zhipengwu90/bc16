"use client";
import { useState } from "react";
// import { verified } from "./verified";
// import { useFormState } from "react-dom";
import styles from "./VerifiedFile.module.css";
const VerifiedFile = ({ folderName, fileName, verified }) => {
  //   const [state, formAction] = useFormState(verified, {
  //     status: null,
  //     message: null,
  //   });
  const [isToggled, setIsToggled] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const onClickHandler = async (e) => {
    const submitData = {
      folderName: e.target.folderName.value,
      fileName: e.target.fileName.value,
      verified: e.target.verified.value,
    };

    const Response = await fetch("/api/verified", {
      method: "POST",
      body: JSON.stringify(submitData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!Response.ok) {
      throw new Error(Response.statusText);
    } else {
      console.log("Success");
      alert("Success");
      setIsSuccess(true);
      setIsToggled(false);
    }
  };
  const onPasswordHandler = (e) => {
    const password = document.getElementById("password").value;
    if (password === "1234") {
      onClickHandler(e);
 
    } else {
      alert("Wrong Password");
    }
  };
  return (
    <>
      {isToggled && (
        <>
          <div
            className={styles.backdrop}
            onClick={() => setIsToggled(!isToggled)}
          ></div>
          <form
            className={styles.errorWindow}
            onSubmit={(e) => {
              e.preventDefault();
              onPasswordHandler(e);
            }}
          >
            <div className={styles.passwordWrap}>
              <label htmlFor="password">Password</label>

              <input type="password" id="password" name="password" />
            </div>

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
            <input type="hidden" id="verified" name="verified" value="true" />
            {isSuccess && <p className={styles.success}>Submit Successfully</p>}
            <div className={styles.buttonWrapper}>
              <button className={styles.submit} type="submit">
                Submit
              </button>
              <button
                className={styles.cancel}
                onClick={() => {
                  setIsToggled(false);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </>
      )}

      {!isSuccess && !verified && (
        <button type="submit" onClick={() => setIsToggled(true)}>
          Verified File
        </button>
      )}
    </>
  );
};

export default VerifiedFile;
