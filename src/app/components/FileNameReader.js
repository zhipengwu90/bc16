import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import styles from "./FileNameReader.module.css";
import FileNameList from "./FileNameList";
const FileNameReader = async () => {
  try {
    const folderPath = process.cwd() + "/src/app/bc16Data/";
    const folderNames = await fs.readdir(folderPath);

    const filesByFolder = [];

    for (const folderName of folderNames) {
      const directoryPath = path.join(folderPath, folderName);
      const files = await fs.readdir(directoryPath);
      filesByFolder.push(
        ...files.map((fileName) => ({
          folderName: folderName,
          fileName: fileName,
        }))
      );
    }
    filesByFolder.sort((a, b) => a.fileName.localeCompare(b.fileName));

    return <FileNameList filesByFolder={filesByFolder} />;
  } catch (error) {
    console.error("Error reading file names:", error);
    throw error;
  }
};

export default FileNameReader;
