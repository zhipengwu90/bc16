import { promises as fs } from "fs";
import Link from "next/link";
import styles from "./FileNameReader.module.css";
import FileSearch from "./FileSearch";
import FileNameList from "./FileNameList";
const FileNameReader = async () => {
  try {
    const directoryPath = process.cwd() + "/src/app/dataStorage/";
    const files = await fs.readdir(directoryPath);
    // Filter out only JSON files
    const jsonFiles = files
      .filter((file) => file.endsWith(".json"))
      .map((file) => file.replace(".json", ""));

    return <FileNameList fileNameList={jsonFiles} />;
  } catch (error) {
    console.error("Error reading file names:", error);
    throw error;
  }
};

export default FileNameReader;
