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
      console.log("success");
      const reader = Response.body.getReader();

      const readData = async () => {
        try {
          while (true) {
            const { done, value } = await reader.read();

            if (done) {
              break;
            }

            // `value` contains the chunk of data as a Uint8Array
            const jsonString = new TextDecoder().decode(value);
            // Parse the JSON string into an object
            const dataObject = JSON.parse(jsonString);

            console.log("Received chunk:", dataObject);
          }
        } catch (error) {
          console.error("Error reading response:", error);
        } finally {
          reader.releaseLock(); // Release the reader's lock when done
        }
      };

      readData();
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
