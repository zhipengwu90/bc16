"use client";
import { useState, useEffect } from "react";

import Link from "next/link";
import FileSearch from "./FileSearch";
import styles from "./FileNameList.module.css";

const FileNameList = ({ filesByFolder }) => {
  const [fileSearch, setFileSearch] = useState(filesByFolder);
  const [pageNumber, setPageNumber] = useState(1);

  const pageSize = 25;
  const totalPages = Math.ceil(fileSearch.length / pageSize);
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const areas = filesByFolder
    .map((item) => {
      const match = item.fileName.match(/Area_(\d+[A-Z]?)/);
      return match ? match[0] : null;
    })
    .filter((value, index, self) => {
      return value && self.indexOf(value) === index;
    });

  const currentPageFiles = fileSearch.slice(startIndex, endIndex);

  const onSearchHandler = (searchResults) => {
    const { area, waterbody, year, format } = searchResults;

    let filteredFiles = filesByFolder;

    if (area !== "") {
      filteredFiles = filteredFiles.filter((file) =>
        file.fileName.toLowerCase().includes(area.toLowerCase() + "_")
      );
    }
    if (waterbody !== "") {
      filteredFiles = filteredFiles.filter((file) =>
        file.fileName
          .replace(/_/g, " ")
          .toLowerCase()
          .includes(waterbody.toLowerCase())
      );
    }
    if (year !== "") {
      filteredFiles = filteredFiles.filter((file) =>
        file.fileName.includes("_" + year + "_")
      );
    }
    if (format !== "") {
      filteredFiles = filteredFiles.filter((file) =>
        file.fileName.includes(format)
      );
    }

    setFileSearch(filteredFiles);
    setPageNumber(1);
  };

  const handleNextPage = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  const handlePrevPage = () => {
    setPageNumber((prevPageNumber) => prevPageNumber - 1);
  };

  const handleGoToPage = () => {
    const inputPageNumber = parseInt(
      document.getElementById("pageNumberInput").value
    );
    if (inputPageNumber >= 1 && inputPageNumber <= totalPages) {
      setPageNumber(inputPageNumber);
    }
  };

  return (
    <div className={styles.container}>
      <FileSearch areas={areas} onSearch={onSearchHandler} />

      <div className={styles.listWrapper}>
        {currentPageFiles?.length === 0 && (
          <div className={styles.noFiles}>No files found!</div>
        )}

        {currentPageFiles.map((file, index) => (
          <div key={index}>
            <Link
              className={styles.linkStyle}
              rel="noopener noreferrer"
              target="_blank"
              href={{
                pathname: "/files/",
                query: {
                  folderName: file.folderName,
                  fileName: file.fileName,
                },
              }}
            >
              {file.fileName.replace(/_/g, " ").replace(".json", "")}
            </Link>
          </div>
        ))}
        <div className={styles.pagination}>
          <div className={styles.prevNext}>
            <button onClick={handlePrevPage} disabled={pageNumber === 1}>
              Prev
            </button>
            <span>{`${pageNumber} of ${totalPages}`}</span>
            <button
              onClick={handleNextPage}
              disabled={pageNumber === totalPages}
            >
              Next
            </button>
          </div>
          <div>
            <input
              type="number"
              id="pageNumberInput"
              min="1"
              max={totalPages}
              placeholder="Page"
            />
            <button className={styles["go-btn"]} onClick={handleGoToPage}>
              Go
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileNameList;
