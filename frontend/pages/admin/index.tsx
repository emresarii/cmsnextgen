import LayoutAdmin from "../../layout/admin";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import getSession from "../../lib/getSession";
import { useEffect } from "react";
import { User } from "../../lib/types";

export default function Home(props: any) {
  const { session } = props;
  const router = useRouter();

  useEffect(() => {
    if (!session.admin) router.push("/");
  }, []);

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

const redirect = {
  redirect: {
    destination: "/",
    permanent: false,
  },
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session: User = await getSession(context);

  if (!session) {
    return redirect;
  }

  if (!session.admin) {
    return redirect;
  }

  return {
    props: {},
  };
}
