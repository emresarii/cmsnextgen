import React from "react";
import { NavbarAdmin } from "../components/adminNav";
import styles from "../styles/admin.module.css";

const LayoutAdmin = ({ children }: any) => {
  return (
    <>
      <div className={styles.parent}>
        <div className="div1"> <NavbarAdmin /></div>
        <div className={styles.div2}>
          <article>{children}</article>{" "}
        </div>
      </div>
    </>
  );
};

export default LayoutAdmin;
