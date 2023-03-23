import {useState, useCallback, useEffect} from "react";

const storageName = "userData";

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  const login = useCallback(
    (jwtToken: string, refreshToken: string, name: string) => {
      setToken(jwtToken);
      setRefreshToken(refreshToken);
      setUserName(name);
      console.log("props", name);

      localStorage.setItem(
        storageName,
        JSON.stringify({
          name: name,
          token: jwtToken,
          refreshToken: refreshToken,
        })
      );
      console.log(localStorage);
    },
    []
  );

  const logout = useCallback(() => {
    setToken(null);
    setRefreshToken(null);
    setUserName(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    if (localStorage.getItem(storageName)) {
      const data = JSON.parse(localStorage.getItem(storageName) as string);
      console.log(data);
      if (data && data.token && data.refreshToken) {
        login(data.token, data.refreshToken, data.name);
      }
    }
    setReady(true);
  }, [login]);

  return {login, logout, token, refreshToken, userName, ready};
};
