import React, { useCallback, useState } from "react";
import { useRouter } from "next/router";
import axios from "../lib/api/axios";
import { User } from "./types";

interface AuthState {
  token: string | null;
}

interface UserState {
  user: User | null;
}

type AuthContextType = {
  authState: AuthState;
  setAuthState: (userAuthInfo: { data: string }) => void;
  isUserAuthenticated: () => boolean;
  logOut: () => void;
  isAdmin: () => boolean;
  user: UserState;
};

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);
const { Provider } = AuthContext;

interface childrenProps {
  children: React.ReactNode;
}

function setToken(data: string) {
  window.localStorage.setItem("token", data);
}

function logOut() {
  localStorage.removeItem("token");
}

const AuthProvider = ({ children }: childrenProps) => {
  const [authState, setAuthState] = React.useState<AuthState>({
    token: "",
  });

  const [user, setUser] = useState<UserState>({
    user: null,
  });

  const getData = async () => {
    try {
      const { data } = await axios.get(`/user`);

      const responseUser = data as User;
      setUser({
        user: responseUser,
      });
    } catch {
      console.log("something went wrong");
    }
  };

  const isAdmin = useCallback(() => {
    return user?.user?.admin ?? false;
  }, [user]);

  const setUserAuthInfo = ({ data }: { data: string }) => {
    setToken(data);

    setAuthState({
      token: data,
    });
  };

  const isUserAuthenticated = (): boolean => {
    return !authState.token ? false : true;
  };

  React.useEffect(() => {
    if (typeof window !== undefined && window.localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      setAuthState({ token });
    }
  }, []);

  React.useEffect(() => {
    if (authState.token) {
      const user = getData();
    }
  }, [authState]);

  return (
    <Provider
      value={{
        authState,
        setAuthState: (userAuthInfo: { data: string }) =>
          setUserAuthInfo(userAuthInfo),
        isUserAuthenticated,
        logOut,
        isAdmin,
        user,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider, logOut };
