import React from 'react'
import Image from "next/image";
import logo from "../../../public/images/sig-blk-en.svg";
import styles from './LogoHeader.module.css'
const LogoHeader = () => {
  return (
    <div className={styles.dfoHeader}>
    <Image height={33} src={logo} alt="Logo" />
  </div>
  )
}

export default LogoHeader