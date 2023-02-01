import { useContext, useEffect } from "react";
import { NavbarAdmin } from "../../components/adminNav";
import LayoutAdmin from "../../layout/admin";
import styles from "../../styles/Home.module.css";
import { AuthContext } from "../../lib/auth-context";
import { useRouter } from "next/router";

export default function Home() {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (authContext.user.user?.admin === false) {
      router.push("/access-denied");
    }
  }, [authContext.user]);

  return (
    <LayoutAdmin>
      <div className={styles.container}>
        <a>Name</a>
        <a>Email</a>
        <a>id</a>
      </div>
    </LayoutAdmin>
  );
}
