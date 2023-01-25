import React from "react";
import { useRouter } from "next/router";

interface AuthState {
  token: string;
}

type AuthContextType = {
  authState: AuthState;
  setAuthState: (userAuthInfo: { data: string }) => void;
  isUserAuthenticated: () => boolean;
};

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);
const { Provider } = AuthContext;

interface childrenProps {
  children: React.ReactNode;
}

function setToken(data: string) {
  window.localStorage.setItem("token", data);
}

const AuthProvider = ({ children }: childrenProps) => {
  const [authState, setAuthState] = React.useState<AuthState>({
    token: "",
  });

  const setUserAuthInfo = ({ data }: { data: string }) => {
    console.log(data);
    setToken(data);

    setAuthState({
      token: data,
    });
  };

  const isUserAuthenticated = (): boolean => {
    return !authState.token ? false : true;
  };

  return (
    <Provider
      value={{
        authState,
        setAuthState: (userAuthInfo: { data: string }) =>
          setUserAuthInfo(userAuthInfo),
        isUserAuthenticated,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
