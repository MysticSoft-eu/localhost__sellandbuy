import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {data} from "autoprefixer";


export const UserContext = createContext({});

export function UserContextProvider({children}) {
  const [user,setUser] = useState(null);
  const [ready,setReady] = useState(false);
  useEffect( async() => {
    if (!user) {
     const {data}  = await axios.get('/profile' );
        setUser(data);
        
      
    }
  }, []);
  return (
    <UserContext.Provider value={{user,setUser}}>
      {children}
      
    </UserContext.Provider>
  );
}