import Link from "next/link";
import FormRender from "../componentsV2/FormRender";
import styles from "./page.module.css";

import { promises as fs } from "fs";
import LogoHeader from "../componentsV2/LogoHeader";
const File = async ({ searchParams }) => {
  console.log(searchParams);
  const fileName = searchParams.fileName;
  try {
    const filePath = process.cwd() + `/src/app/dataStorage/${fileName}.json`;
    const fileContent = await fs.readFile(filePath, "utf8");
    const jsonData = JSON.parse(fileContent);
    console.log(jsonData);

    return (
      <div>
        <title>BC16</title>
        <LogoHeader />
        <Link className={styles.backButton} href="/">
          Back
        </Link>
        <h5>File Name: {fileName}</h5>

        <FormRender items={jsonData} />
      </div>
    );
  } catch (error) {
    console.error(error);
  }
};

export default File;
