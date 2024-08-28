import { createContext, useContext, useState, useEffect } from "react";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState();
  

  const storeTokenInLs = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };
  const isLoggedin = !!token;

  const LogoutUser = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  //Authenticate current logged-in User
  const userverification = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/auth/userverification`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUser(data.userdata);
      } else {
        console.log(`Error: ${response.statusText}`);
      }
    } catch (error) {
      console.log(`Error: while fetching user data ${error}`);
    }
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  useEffect(() => {
    if (token) {
      userverification();
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ user, isLoggedin, storeTokenInLs, token, LogoutUser , updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContextValue;
};
