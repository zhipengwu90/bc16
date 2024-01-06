
import styles from "./page.module.css";
import FileNameReader from "./componentsV2/FileNameReader";
import LogoHeader from "./componentsV2/LogoHeader";

export default function Home() {
  return (
    <div className={styles.container}>

        <title>BC16</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="description" content="BC16 Project"></meta>
      <LogoHeader />
      <FileNameReader />
    </div>
  );
}
