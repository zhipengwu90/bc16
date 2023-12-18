import FormRender from "../components/FormRender";

import { promises as fs } from "fs";
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
        <h5>File Name: {fileName}</h5>

        <FormRender items={jsonData} />
      </div>
    );
  } catch (error) {
    console.error(error);
  }
};

export default File;
