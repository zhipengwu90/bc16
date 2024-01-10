import { promises as fs } from "fs";
import path from "path";

export default async function Page({ params: { fileName } }) {
  const folderPath = process.cwd() + "/src/app/mylog/";
  const fileContent = await fs.readFile(`${folderPath}/${fileName}`, "utf8");
  // Replace line breaks with <br> tags
  const contentWithLineBreaks = fileContent.split(";").map((line, index) => (
    <div key={index}>
      {line}
      <br />
    </div>
  ));
  return (
    <div>
      <h3>{fileName}</h3>
      <div>{contentWithLineBreaks}</div>
    </div>
  );
}
