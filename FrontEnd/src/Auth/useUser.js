// import { useEffect, useState } from "react";
// import { useToken } from "./useToken"

// export const useUser=()=>{
//     const [token ]=useToken();

//     const getPayLoadFromToken=token=>{
//     const encodedPayload = token.split('.')[1];
//     return JSON.parse(atob(encodedPayload));
//     }
//     const [user,setUser] = useState(()=>{
//         if(!token) return null;
//         return getPayLoadFromToken(token);
//     });
//     useEffect(()=>{
//         if(!token){
//             console.log('Token Not Found')
//             setUser(null);
//         }else{
//             setUser(getPayLoadFromToken(token))
//             console.log('Token has been set for user:',token);
//         }
//     },[token]);
//     console.log("This is user!!",user);
//     return user;
// }

import { useEffect, useState } from "react";
import { useToken } from "./useToken";

const decodeToken = (token) => {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) {
    console.error("Invalid token format:", token);
    return null;
  }
  try {
    // Get the payload part of the JWT
    const encodedPayload = parts[1];
    // Replace URL-safe characters with standard Base64 characters
    const base64 = encodedPayload.replace(/-/g, '+').replace(/_/g, '/');
    // Decode Base64 string safely handling special characters
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const useUser = () => {
  const [token] = useToken();
  const [user, setUser] = useState(() => {
    if (!token) return null;
    return decodeToken(token);
  });

  useEffect(() => {
    if (!token) {
      console.log("Token Not Found");
      setUser(null);
    } else {
      const decoded = decodeToken(token);
      setUser(decoded);
      console.log("Token has been set for user:", token);
    }
  }, [token]);

  console.log("This is user!!", user);
  return user;
};
