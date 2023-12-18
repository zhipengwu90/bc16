import Image from "next/image";
import styles from "./page.module.css";
import FormRender from "./components/FormRender";
import FileNameReader from "./components/FileNameReader";
import logo from "../../public/images/sig-blk-en.svg";
export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.dfoHeader}>
        <Image height={40} src={logo} alt="Logo" />
      </div>
      <FileNameReader />
    </div>
  );
}
