import React, { useCallback, useState } from "react";
import { useRouter } from "next/router";
import axios from "../lib/api/axios";
import { User } from "./types";

interface UserState {
  user: User | null;
}

type AuthContextType = {
  session: UserState;
  fetchSession: () => void;
};

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);
const { Provider } = AuthContext;

interface childrenProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: childrenProps) => {
  const [session, setSession] = useState<UserState>({
    user: null,
  });

  const fetchSession = async () => {
    try {
      const { data } = await axios.get(`/session`);

      const responseUser = data as User;
      if (!(Object.keys(responseUser).length === 0)) {
        setSession({
          user: responseUser,
        });
      }
    } catch {
      console.log("something went wrong");
    }
  };

  React.useEffect(() => {
    fetchSession();
  }, []);

  return (
    <Provider
      value={{
        session,
        fetchSession,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
