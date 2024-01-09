import { promises as fs } from "fs";
import path from "path";
const LogFile = async () => {
  const folderPath = process.cwd() + "/src/app/log/";
  const files = await fs.readdir(folderPath);
  console.log(files);
  return (
    <div>
      <h1>About</h1>
    </div>
  );
};

export default LogFile;
