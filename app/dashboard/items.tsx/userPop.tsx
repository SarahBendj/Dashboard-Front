'use client' 
import { useRouter } from 'next/navigation';

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
  } from "@/components/ui/navigation-menu"

  import { useAuth } from "@/context/useAuth"
  import { jwtDecode } from "jwt-decode"
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
  
  interface UserITC {
    id: string;
    identificant: string; 
    role: string;

  }
  
  export default function UserPop() {

    const { auth , logout } = useAuth();
    const [ user , setUser] = useState<UserITC>() 
    
    useEffect(() => {
        if (auth && auth.token ) {
          const userDataDecoded: UserITC = jwtDecode(auth.token);
          setUser(userDataDecoded)
         
        }
      }, [auth]); 
      

    const router = useRouter();
    
    const handleLogout = () => {
         logout();
        router.push('/auth/login'); 
      };
    return (
        <div className='' >
        <NavigationMenu >
        <NavigationMenuList >
          <NavigationMenuItem>
            {user &&  (
                <div key={user.id}>
                 <NavigationMenuTrigger  
                 className=" rounded-none p-4 bg-gray-900 shadow-md shadow-cyan-700 font-bold text-l text-white w-full ">{user.identificant}</NavigationMenuTrigger>
                 <NavigationMenuContent className='w-full rounded-none ' >
                     <div className=" w-full text-l"  >
                     <div className=" w-full p-auto p-4 font-bold"> {user.role}</div>
                     <Button onClick={handleLogout} className=" rounded-none p-4 cursor-pointer hover:bg-gray-200 hover:text-gray-900 w-full"> Logout</Button>
                </div>
                </NavigationMenuContent>
                </div>)
            }
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      </div>
      
    )
  }
  
  
  