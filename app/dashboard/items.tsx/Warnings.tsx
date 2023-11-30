'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { NotifyAlarmITC} from '@/TYPES.ts/creationData';
import { useAuth } from '@/context/useAuth';
import { useEffect, useState } from 'react';
import { FETCH_REQUEST } from '@/lib/fetching';
import { TooltipDemo } from '@/hook/LegendOnHover';
import Link from 'next/link';


export default function WarningTable() {
  const { auth } = useAuth();
  const [warning, setWarning] = useState<NotifyAlarmITC[]>([]);
  const [warningWithinOneDay, setWarningWithinOneDay] = useState<NotifyAlarmITC[]>([]);
  const [counter, setCounter] = useState<number>(0);

  console.log(warning)

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const data: NotifyAlarmITC[] = await FETCH_REQUEST('warnings/notifyalarms', 'GET', auth.token);

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

      const filteredWarnings: NotifyAlarmITC[] = warning
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
          <TooltipDemo legend='This section alerts you to warnings that have occurred in the past 24 hours.' >
          <NavigationMenuTrigger className="relative rounded-none p-4 bg-gray-900 shadow-md shadow-cyan-700 font-bold text-l text-white w-full">
            <FontAwesomeIcon icon={faBell} />
            <div className='counter'> {counter}</div>
          </NavigationMenuTrigger>
          </TooltipDemo>
          <NavigationMenuContent className="min-w-32 px-5 py-1 rounded-none">
            <div className="border-b border-gray-200 mx-auto pl-4 pb-2 text-lg font-bold"> Daily alarms</div>
            {warningWithinOneDay.map((warn) => (
              <div key={warn.id} className="w-80 text-sm p-auto p-4 font-bold border-b border-gray-100 hover:shadow-sm hover:shadow-cyan-700 ">

                <Link href={
                  warn.fridge_controle_id
                    ? `/dashboard/services/fridge/${warn.fridgeid}`
                    : '/dashboard/services/receptions'
                } className='text-cyan-700 hover:text-black mr-0'>
                  {warn.fridge_controle_id ? 'Issue concern Fridge section ' : 'Issue concern Reception section'}
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
