'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell,faArrowRight } from '@fortawesome/free-solid-svg-icons';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { WarningOnlyITC } from '@/TYPES.ts/creationData';
import { useAuth } from '@/context/useAuth';
import { useEffect, useState } from 'react';
import { FETCH_REQUEST } from '@/lib/fetching';
import Link from 'next/link';


export default function WarningTable() {
  const { auth } = useAuth();
  const [warning, setWarning] = useState<WarningOnlyITC[]>([]);
  const [warningWithinOneDay, setWarningWithinOneDay] = useState<WarningOnlyITC[]>([]);
  const [ counter , setCounter ] = useState<number>(0);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const data: WarningOnlyITC[] = await FETCH_REQUEST('warnings', 'GET', auth.token);

        if (isMounted) {
          setWarning(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    return () => {
     
      isMounted = false;
    };
  }, [auth.token]);

  useEffect(() => {
    const alert = () => {
      const twentyFourHoursAgo = new Date();
      twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

      const filteredWarnings: WarningOnlyITC[] = warning
        .filter((warn) => {
          const warningDate = new Date(warn.createdat);
          return warningDate >= twentyFourHoursAgo && warningDate <= new Date();
        });

      const i = filteredWarnings.length;
      setWarningWithinOneDay(filteredWarnings);
      setCounter(i);
    };

    alert();
  }, [warning]);
  
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="relative rounded-none p-4 bg-gray-900 shadow-md shadow-cyan-700 font-bold text-l text-white w-full">
            <FontAwesomeIcon icon={faBell} />
            <div className='counter'> {counter}</div>
          </NavigationMenuTrigger>
          <NavigationMenuContent className="min-w-content rounded-none"> 
          <div className="border-b border-gray-200 mx-auto pl-4 pb-2 text-lg font-bold"> Recent alarms</div> 
           {warningWithinOneDay.map((warn) => (
              <div key={warn.id} className="w-80 text-sm p-auto p-4 font-bold border-b border-gray-100 hover:shadow-sm hover:shadow-cyan-700 ">
                <Link href={'dashboard/services/fridge/${}'}  className='text-cyan-700 hover:text-black mr-0'> 
                 {warn.fridge_controle_id ? 'Issue concern Fridge section ' :'Issue concern Reception section' }
                <span>REF :{warn.fridge_controle_id ?? warn.reception_controle_id}  </span>   <FontAwesomeIcon icon={faArrowRight} /></Link></div>
            ))}
          
 
            <div className="w-full text-l">
             
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
