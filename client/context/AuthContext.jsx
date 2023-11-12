import { createContext, useEffect, useState } from "react";
import { useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [configAuth, setAuthConfig] = useState({
    user: null,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    user
      ? setAuthConfig((prevState) => ({ ...prevState, user: user }))
      : setAuthConfig((prevState) => ({ ...prevState, user: null }));
  }, []);

  const updateUser = (currentUser) => {
    setAuthConfig((prevState) => ({ ...prevState, user: currentUser }));
    localStorage.setItem("user", JSON.stringify(currentUser));
  };

  return (
    <AuthContext.Provider value={{ configAuth, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
