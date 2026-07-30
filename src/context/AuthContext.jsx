import { createContext, useContext, useMemo, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [user, setUser] = useState({
    fullname: "",
    email: "",
    role: ""
  });

  // Restore login after page refresh
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsAuthenticated(true);

      setUser({
        fullname: localStorage.getItem("fullname") || "",
        email: localStorage.getItem("email") || "",
        role: localStorage.getItem("role") || ""
      });
    }
  }, []);

  // Called after successful login
  const login = (userData) => {

    localStorage.setItem("token", userData.access_token);
    localStorage.setItem("fullname", userData.fullname);
    localStorage.setItem("email", userData.email);
    localStorage.setItem("role", userData.role);

    setUser({
      fullname: userData.fullname,
      email: userData.email,
      role: userData.role
    });

    setIsAuthenticated(true);
  };

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("fullname");
    localStorage.removeItem("email");
    localStorage.removeItem("role");

    setUser({
      fullname: "",
      email: "",
      role: ""
    });

    setIsAuthenticated(false);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      login,
      logout
    }),
    [user, isAuthenticated]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}