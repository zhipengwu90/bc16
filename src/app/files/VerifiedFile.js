"use client";
import React from "react";
import { verified } from "./verified";
import { useFormState } from "react-dom";
const VerifiedFile = ({ folderName, fileName }) => {
  const [state, formAction] = useFormState(verified, {
    status: null,
    message: null,
  });

  const onClickHandler = async (e) => {
    const submitData = {
      folderName: e.target.folderName.value,
      fileName: e.target.fileName.value,
      verified: e.target.verified.value,
    };

    const Respone = await fetch("/api/verified", {
      method: "POST",
      body: JSON.stringify(submitData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!Respone.ok) {
      throw new Error(Respone.statusText);
    } else {
      console.log("Success");
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
      <button type="submit">Verified File</button>
    </form>
  );
};

export default VerifiedFile;
