"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

const ErrorLog = ({ searchParams }) => {
  const folderNames = JSON.parse(searchParams.folderNames);
  const [errorArray, setErrorArray] = useState([]);

  const asyncFetch = async () => {
    const Response = await fetch("/api/errorLog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(folderNames),
    });
    if (!Response.ok) {
      throw new Error(Response.statusText);
    } else if (Response.status === 203) {
      console.log("No data");
    } else {
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

            dataObject
              .sort((a, b) => {
                a.folderName.localeCompare(b.folderName);
              })
              .sort((a, b) => {
                a.fileName.localeCompare(b.fileName);
              });
            setErrorArray(dataObject);
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

  useEffect(() => {
    asyncFetch();
  }, []);
  return (
    <div className={styles.container}>
      <h3>Error Log</h3>
      <div className={styles.errorContainer}>
        {errorArray.map((error, index) => {
          return (
            <div key={index} className={styles.eachError}>
              <div>{error.folderName}</div>
              <div>{error.fileName}</div>
              <div>
                {error.errorInfo.map((errorInfo, index) => {
                  return (
                    <div key={index} className={styles.errorInfo}>
                      <div>Error Field: {errorInfo.errorField}</div>
                      <div>Error Description: {errorInfo.errorDescription}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ErrorLog;
