import { GetServerSidePropsContext } from "next";
import axios from "./api/axios";
import { User } from "./types";

export default async function getSession<User>(
  context: GetServerSidePropsContext
) {
  const { req } = context;

  let session: User = {} as User;

  const headers: HeadersInit = {
    cookie: req.headers.cookie ?? "",
  };

  try {
    const { data } = await axios.get(`/session`, { headers });
    session = data as User;
  } catch {
    console.error();
  }

  return session;
}
