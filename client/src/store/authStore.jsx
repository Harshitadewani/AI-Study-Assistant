import { createContext, useContext, useState, useEffect } from "react";
import { getMe } from "../api/authApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const [token, setToken] = useState(() =>
    localStorage.getItem("token")
  );

  const [loading, setLoading] = useState(true);


  // Fetch user when token exists
  useEffect(() => {

    if (!token) {
      setLoading(false);
      return;
    }

    getMe()
      .then(({ data }) => {
        setUser(data.user);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setToken(null);
      })
      .finally(() => {
        setLoading(false);
      });

  }, [token]);


  // Login / Register
  const setAuth = (userData, newToken) => {

    if (newToken) {
      localStorage.setItem("token", newToken);
    }

    setToken(newToken);
    setUser(userData);
  };


  // Logout
  const logout = () => {

    localStorage.removeItem("token");

    setToken(null);
    setUser(null);
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        setAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuthStore = () => {
  return useContext(AuthContext);
};