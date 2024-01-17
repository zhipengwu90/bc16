"use client";
import { useState, useEffect, use } from "react";
import Image from "next/image";
import verified from "../../../public/images/verified.svg";
import Link from "next/link";
import FileSearch from "./FileSearch";
import styles from "./FileNameList.module.css";

const FileNameList = ({ filesByFolder }) => {
  const [fileSearch, setFileSearch] = useState(filesByFolder);
  const [pageNumber, setPageNumber] = useState(1);
  const [verifiedFilejson, setVerifiedFilejson] = useState([]);
  const pageSize = 25;
  const totalPages = Math.ceil(fileSearch.length / pageSize);
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const [newfilesByFolder, setNewfilesByFolder] = useState(filesByFolder);


  // Extract unique folder names
  const uniqueFolderNames = [
    ...new Set(filesByFolder.map((item) => item.folderName)),
  ];

  const asyncFetch = async () => {
    const Response = await fetch("/api/verifiedFile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(uniqueFolderNames),
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

            setVerifiedFilejson(dataObject);
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

  useEffect(() => {
    // Create a map from verifiedFilejson for efficient lookup based on fileName
    const verifiedMap = new Map(
      verifiedFilejson.map(({ fileName, verified }) => [fileName, verified])
    );

    // Iterate over filesByFolder and inject 'verified' property if matching fileName is found
    const updatedFilesByFolder = filesByFolder.map((file) => {
      const verifiedValue = verifiedMap.get(file.fileName);
      return verifiedValue ? { ...file, verified: verifiedValue } : file;
    });
    setNewfilesByFolder(updatedFilesByFolder);
  }, [verifiedFilejson]);

  const areas = newfilesByFolder
    .map((item) => {
      const match = item.fileName.match(/Area_(\d+[A-Z]?)/);
      return match ? match[0] : null;
    })
    .filter((value, index, self) => {
      return value && self.indexOf(value) === index;
    });

  const currentPageFiles = newfilesByFolder.slice(startIndex, endIndex);

  const onSearchHandler = (searchResults) => {
    const { area, waterbody, year, format } = searchResults;

    let filteredFiles = newfilesByFolder;

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
                  verified: file.verified,
                },
              }}
            >
              {file.fileName.replace(/_/g, " ").replace(".json", "")}{file.verified &&  <Image src={verified} alt="verified" height={25} width={25} />}
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
