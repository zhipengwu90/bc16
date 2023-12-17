import { promises as fs } from "fs";
import Link from "next/link";

const FileNameReader = async () => {
  try {
    const directoryPath = process.cwd() + "/src/app/dataStorage/";
    const files = await fs.readdir(directoryPath);
    // Filter out only JSON files
    const jsonFiles = files
      .filter((file) => file.endsWith(".json"))
      .map((file) => file.replace(".json", ""));

    return (
      <div>
        {jsonFiles.map((file, index) => (
          <div key={index}>
            <Link
              href={{
                pathname: "/file/",
                query: { fileName: file },
              }}
            >
              {file}
            </Link>
          </div>
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error reading file names:", error);
    throw error;
  }
};

export default FileNameReader;
