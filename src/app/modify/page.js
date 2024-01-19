import React from "react";
import fs from "fs/promises";
import styles from "./page.module.css";
import ModifyForm from "./ModifyForm";

const page = async ({ searchParams }) => {
  const { folderName, fileName } = searchParams;
  try {
    const filePath =
      process.cwd() + `/src/app/bc16Data/${folderName}/${fileName}`;
    const fileContent = await fs.readFile(filePath, "utf8");
    const jsonData = JSON.parse(fileContent);

    return (
      <div>
        <ModifyForm jsonData={jsonData} folderName ={folderName} fileName={fileName} />
      </div>
    );
  } catch (error) {
    return <div>error</div>;
  }
};
export default page;
