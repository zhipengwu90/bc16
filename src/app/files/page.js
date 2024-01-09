import Link from "next/link";
import FormRender from "../components/FormRender";
import styles from "./page.module.css";

import { promises as fs } from "fs";
import LogoHeader from "../componentsV2/LogoHeader";
const File = async ({ searchParams }) => {
  const fileName = searchParams.fileName;
  const folderName = searchParams.folderName;

  const format6e = folderName == "6eresultocr";
  const format4c = folderName == "4cresultocr";
  const format4h = folderName == "4hresultocr";
  const format5a = folderName == "5aresultocr";
  const format7e = folderName == "7eresultocr";
  const pdfFolderName = format6e
    ? "6etest"
    : format4c
    ? "4ctest"
    : format4h
    ? "4hrun"
    : format5a
    ? "5atest"
    : format7e
    ? "7etest"
    : "";

  try {
    const filePath =
      process.cwd() + `/src/app/bc16Data/${folderName}/${fileName}`;
    const fileContent = await fs.readFile(filePath, "utf8");
    const jsonData = JSON.parse(fileContent);

    return (
      <div>
        <title>{folderName}</title>
        {/* <title>{fileName.replace(".json", "").replace(/_/g, " ").replace(/BC16-\d+ /g, '')}</title> */}
        <LogoHeader />
        {/* <Link className={styles.backButton} href="/">
          Back
        </Link> */}
        <h5>File Name: {fileName.replace(/_/g, " ").replace(".json", "")}</h5>
        <Link
          className={styles.linkStyle}
          rel="noopener noreferrer"
          target="_blank"
          href={`https://bc16teststorage.blob.core.windows.net/${pdfFolderName}/${fileName.replace(
            ".json",
            ".pdf"
          )}`}
        >
          PDF Version
        </Link>
        <div className={styles.container}>
          <FormRender folderName={folderName} items={jsonData} />
          <iframe className={styles.iframe}
            src={`https://bc16teststorage.blob.core.windows.net/${pdfFolderName}/${fileName.replace(
              ".json",
              ".pdf"
            )}`}
    
            frameborder="0"
          >
            This browser does not support PDFs. Please download the PDF to view
            it.
          </iframe>
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
  }
};

export default File;
