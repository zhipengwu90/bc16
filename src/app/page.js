import Image from "next/image";
import styles from "./page.module.css";
import FormRender from "./components/FormRender";
import FileNameReader from "./components/FileNameReader";
export default function Home() {
  return (
    <div className={styles.container}>
      <FileNameReader />
    </div>
  );
}
