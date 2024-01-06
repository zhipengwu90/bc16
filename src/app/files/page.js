import Link from "next/link";
import FormRender from "../components/FormRender";
import styles from "./page.module.css";

import { promises as fs } from "fs";
import LogoHeader from "../componentsV2/LogoHeader";
const File = async ({ searchParams }) => {
  const fileName = searchParams.fileName;
  const folderName = searchParams.folderName;

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
        <div className={styles.container}>
          <FormRender folderName={folderName} items={jsonData} />
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
  }
};

export default File;
