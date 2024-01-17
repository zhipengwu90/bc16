"use client";
import React from "react";
import { verified } from "./verified";
import { useFormState } from "react-dom";
const VerifiedFile = ({ folderName, fileName }) => {
  const [state, formAction] = useFormState(verified, {
    status: null,
    message: null,
  });
  return (
    <form action={formAction}>
      <input
        type="hidden"
        id="folderName"
        name="folderName"
        value={folderName}
      />
      <input type="hidden" id="fileName" name="fileName" value={fileName} />
      <input type="hidden" id="verified" name="verified" value="true" />
      <button type="submit"> Verified File</button>
    </form>
  );
};

export default VerifiedFile;
