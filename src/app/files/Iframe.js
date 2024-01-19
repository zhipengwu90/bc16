"use client";
import { useState } from "react";
import styles from "./Iframe.module.css";
const Iframe = ({ pdfFolderName, fileName }) => {
  const [showPdf, setShowPdf] = useState(true);

  const format7e = pdfFolderName == "7eresultocr";

  const iframeStyle = format7e ? "iframe7e" : "iframe";
  return (
    <>
      <button
        className={styles.showButton}
        onClick={() => setShowPdf(!showPdf)}
      >
        {showPdf ? "Hide PDF" : "Show PDF"}
      </button>
      {showPdf && (
        <iframe
          className={styles[iframeStyle]}
          src={`https://bc16teststorage.blob.core.windows.net/${pdfFolderName}/${fileName.replace(
            ".json",
            ".pdf"
          )}`}
        >
          This browser does not support PDFs. Please download the PDF to view
          it.
        </iframe>
      )}
    </>
  );
};

export default Iframe;
