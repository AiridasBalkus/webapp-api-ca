import React, { createContext, useState } from "react";
import { login, signup} from "../api/users-api";

export const AuthContext = createContext(null); //eslint-disable-line

const AuthContextProvider = (props) => {
const existingToken = localStorage.getItem("token");
const [isAuthenticated, setIsAuthenticated] = useState(!!existingToken);
  const [authToken, setAuthToken] = useState(existingToken); //eslint-disable-line
  const [userName, setUserName] = useState("");


   //Function to put JWT token in local storage.
  const setToken = (data) => {
    localStorage.setItem("token", data);
    setAuthToken(data);
  }

 const authenticate = async (username, password) => {
    const result = await login(username, password);
    if (result.token) {
      setToken(result.token)
      setIsAuthenticated(true);
      setUserName(username);
    }
  };

  const register = async (username, password) => {
    const result = await signup(username, password);
    return result.success;
  };

  const signout = () => {
  localStorage.removeItem("token");
  setAuthToken(null);
  setUserName("");
  setIsAuthenticated(false);
  setTimeout(() => setIsAuthenticated(false), 100);
};


return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        register,
        signout,
        userName
      }}
    >
      {props.children} {}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;