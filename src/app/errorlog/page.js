import { promises as fs } from "fs";
import Link from "next/link";
import path from "path";
const LogFile = async () => {
  const folderPath = process.cwd() + "/src/app/mylog/";
  const files = await fs.readdir(folderPath);
  console.log(files);
  return (
    <div>
      {files.map((file) => (
        <div>
          <Link href={`/errorlog/${file}`} key={file}>
            {file}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default LogFile;
