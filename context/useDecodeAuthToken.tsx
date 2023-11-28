import { useEffect, useState } from 'react';
import { jwtDecode} from 'jwt-decode';
import { useAuth } from './useAuth';
import { JwtPayloadITC } from '@/TYPES.ts/creationData';


export default function useDecodeAuthToken () {

  const [ user , setUser ] = useState<JwtPayloadITC | null>(null);
  const { auth } = useAuth();

  useEffect(() => {
    if (auth && auth.token) {
      const userDataDecoded : JwtPayloadITC = jwtDecode(auth.token);
      setUser(userDataDecoded );
    }
  }, [auth, setUser]);
  return user;
};


