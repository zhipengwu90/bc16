"use client";
import { useState } from "react";
import Link from "next/link";
import FileSearch from "./FileSearch";
import styles from "./FileNameList.module.css";

const FileNameList = ({ fileNameList }) => {
  const [fileSearch, setFileSearch] = useState(fileNameList);
  const onSearchHandler = (searchResults) => {
    console.log(searchResults);
    const { area, waterbody, year } = searchResults;
    let filteredFiles = fileNameList;
    if (area !== "") {
      filteredFiles = filteredFiles.filter((file) =>
        file.replace(/_/g, " ").toLowerCase().includes(area)
      );
    }
    if (waterbody !== "") {
      filteredFiles = filteredFiles.filter((file) =>
        file.replace(/_/g, " ").toLowerCase().includes(waterbody.toLowerCase())
      );
    }
    if (year !== "") {
      filteredFiles = filteredFiles.filter((file) => file.includes(year));
    }

    setFileSearch(filteredFiles);
  };

  return (
    <div className={styles.container}>
      <FileSearch onSearch={onSearchHandler} />
      <div className={styles.listWrapper}>
        {fileSearch?.length === 0 && (
          <div className={styles.noFiles}>No files found!</div>
        )}
        {fileSearch.map((file, index) => (
          <div key={index}>
            <Link className={styles.linkStyle}
              href={{
                pathname: "/file/",
                query: { fileName: file },
              }}
            >
              {file.replace(/_/g, " ")}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileNameList;
