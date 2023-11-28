'use client'
import React, { useEffect, useState } from 'react';
import ReceptionTable from './items.tsx/ReceptionTable';
import DisplayAlert from './items.tsx/Warnings';
import Fridge from './items.tsx/Fridge';
import ControleState from './Stats/controleState';
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
import {TooltipDemo} from '@/hook/LegendOnHover';

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
              <h1 className='mr-4'>DASHBOARD</h1>
              <TooltipDemo legend={'this allow to warn you about the thatd occued withung 24hours '}>
              < DisplayAlert />
              </TooltipDemo>
              
            </div>
          </div>

          <UserPop />
        </div>


        <div className=''>
          <div className="flex flex-row w-full ">
            <div className="bg-gray-900 m-4 p-4 shadow-md shadow-cyan-700 w-2/5 min-h-full">
            <TooltipDemo legend={'this allow to warn you about the thatd occued withung 24hours '}>
              <CurrentState state={warnings.map((warn) => warn.warning_status)} />
              </TooltipDemo>
            </div>
            <div className="w-full min-h-full">
              <ReceptionTable />
            </div>
          </div>
        </div>

        <div className=''>
          <div className="flex flex-row 'w-full">

            <div className=' w-1/2 min-h-full h-full '>
              <Fridge />
            </div>

            <div className='flex flex-row w-full '>

              <div className="bg-gray-900 m-4 px-4 shadow-md shadow-cyan-700  ">
                <h1 className='text-xl text-white py-2 border-b mb-4'>RECEPTION STABILITY</h1>
                <ReceptionStats status={receptions.map((rep) => rep.warning_status ?? false)} />
                <Link href={'dashboard/services/receptions'} className='text-cyan-700 hover:text-white mr-4'> View <FontAwesomeIcon icon={faArrowRight} /></Link>
              </div>

               <div className="bg-gray-900 m-4 px-4 shadow-md shadow-cyan-700  ">
                <h1 className='text-xl text-white py-2 border-b mb-4 '>WARN STATE</h1>
                <WarningState />
                <Link href={'dashboard/services/receptions'} className='text-cyan-700 hover:text-white mr-4'> View <FontAwesomeIcon icon={faArrowRight} /></Link>
              </div>

            </div>


          </div>
        </div>
      </div>
    </div>
  );


}
