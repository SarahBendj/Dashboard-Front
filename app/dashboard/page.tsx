'use client'
import React, { useEffect, useState } from 'react';
import ReceptionTable from './items.tsx/ReceptionTable';
import DisplayAlert from './items.tsx/Warnings';
import Fridge from './items.tsx/Fridge';
import WarningState from './Stats/warningState';
import CurrentState from '@/hook/CurrentState';
import ReceptionStats from './Stats/receptionStats';
import Link from 'next/link';
import { FETCH_REQUEST } from '@/lib/fetching';
import { useAuth } from '@/context/useAuth';
import { ReceptionITC, WarningITC } from '@/TYPES.ts/creationData';
import UserPop from './items.tsx/userPop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { TooltipDemo } from '@/hook/LegendOnHover';
import MemberStats from './Stats/memberStats';

export default function Dashboard() {
  const [receptions, setReceptions] = useState<ReceptionITC[]>([]);
  const [warnings, setWarnings] = useState<WarningITC[]>([])
  const { auth } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Recptdata: ReceptionITC[] = await FETCH_REQUEST('receptioncontrols/info', 'GET', auth.token);
        const warnData: WarningITC[] = await FETCH_REQUEST('warnings/infos', 'GET', auth.token);
        setWarnings(warnData);

        setReceptions(Recptdata);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [auth.token]);
  return (

    <div className="h-screen max-h-screen w-full">
      <div className="flex flex-col w-full">
        <div className="bg-gray-900 mx-2  px-4 shadow-md shadow-cyan-700 w-full flex flex-row justify-between items-center ">
          <div className='text-2xl text-white m-4 w-full'>
            <div className='flex '>
              <TooltipDemo legend={'This dashboard provides you with an overview of the status of your business.'}>
                <h1 className='mr-4'>DASHBOARD</h1>
              </TooltipDemo>
              <TooltipDemo legend={'this allow to warn you about the thatd occued withung 24hours '}>
                < DisplayAlert />
              </TooltipDemo>

            </div>
          </div>

          <UserPop />
        </div>


        <div className=''>
          <div className="flex flex-row w-full ">
            <div className="bg-gray-900 m-4 p-4 shadow-md shadow-cyan-700 min-h-full w-2/4 ">

              <CurrentState state={warnings.map((warn) => warn.warning_status)} />

            </div>
            <div className="w-full">
              <ReceptionTable />
            </div>
            <div className="bg-gray-900 m-4 px-4 shadow-md shadow-cyan-700 w-1/4  ">

            <TooltipDemo 
            legend={'This diagram illustrates all the issues that have occurred, allowing you to also observe those that have been resolved.'}>
             <h1 className='text-xl text-white py-2 border-b mb-4  '>WARN STATE</h1>
            </TooltipDemo>
            <WarningState />

<Link href={'dashboard/services/receptions'} className='text-cyan-700 hover:text-white mr-4'> View <FontAwesomeIcon icon={faArrowRight} /></Link>
           </div>
          </div>
        </div>

        <div className=''>
          <div className="flex flex-row w-full h-100">
             <div className="bg-gray-900 m-4 px-4 shadow-md shadow-cyan-700 w-full  ">

                <TooltipDemo
                  legend={"Explore the latest activities of our members through an insightful diagram. Expand for more details."}>
              < h1 className='text-xl text-white py-2 border-b mb-4'>MEMBERS ACTIVITY</h1>
               </TooltipDemo>
                <MemberStats />
              
                <Link href={'dashboard/services/member'} className='my-2 py-2 text-cyan-700 hover:text-white mr-4'> View <FontAwesomeIcon icon={faArrowRight} /></Link>
              
              </div>

            <div className=' w-2/5 m-0 p-0  '>
              <Fridge />
            </div>

              <div className="bg-gray-900 m-4 px-4 shadow-md shadow-cyan-700  ">

                <TooltipDemo
                  legend={"This diagram focuses on your incoming deliveries. You can observe the stability versus potential disturbances that may arise from not adhering to standards."}>
              < h1 className='text-xl text-white py-2 border-b mb-4'>RECEPTION STABILITY</h1>
               </TooltipDemo>
                <ReceptionStats status={receptions.map((rep) => rep.warning_status ?? false)} />
                <Link href={'dashboard/services/receptions'} className=' mb-2 text-cyan-700 hover:text-white mr-4'> View <FontAwesomeIcon icon={faArrowRight} /></Link>
              </div>

          </div>
        </div>
      </div>
    </div>
  );


}
