"use client";
import { useState } from "react";
// import { verified } from "./verified";
// import { useFormState } from "react-dom";
import style from "./VerifiedFile.module.css";
const VerifiedFile = ({ folderName, fileName, verified }) => {
  //   const [state, formAction] = useFormState(verified, {
  //     status: null,
  //     message: null,
  //   });
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
      setIsSuccess(true);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onClickHandler(e);
      }}
    >
      <input
        type="hidden"
        id="folderName"
        name="folderName"
        value={folderName}
      />
      <input type="hidden" id="fileName" name="fileName" value={fileName} />
      <input type="hidden" id="verified" name="verified" value="true" />
      {isSuccess && <p className={style.success}>Submit Successfully</p>}
      {!isSuccess && !verified && <button type="submit">Verified File</button>}
    </form>
  );
};

export default VerifiedFile;
