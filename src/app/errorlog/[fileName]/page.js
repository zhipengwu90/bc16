import { promises as fs } from "fs";
import path from "path";


export default async function Page({params: {fileName}}) {
    const folderPath = process.cwd() + "/src/app/log/";
    const fileContent = await fs.readFile(`${folderPath}/${fileName}`, "utf8");
    console.log(fileContent);
  return (
    <div>
      <h3>{fileName}</h3>
        <div>{fileContent}</div>
    </div>
  );
}