import { createContext } from "react";
import useFirebase from "../hooks/useFirebase.js";
import useServices from "../hooks/useServices.js";


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // hooks
  const AllContexts = useFirebase();
  const { services } = useServices();

  const data = {
    AllContexts,
    services
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
