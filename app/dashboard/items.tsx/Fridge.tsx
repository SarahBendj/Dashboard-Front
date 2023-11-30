'use client' 
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useState, useEffect } from 'react';
import  { useAuth } from '@/context/useAuth';
import { FETCH_REQUEST } from '@/lib/fetching';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { TooltipDemo } from '@/hook/LegendOnHover';
import Options from './Fridge/options';
import Link from 'next/link';
import {  FridgeITC, Fridge_controledITC} from '@/TYPES.ts/creationData';




export default function Fridge() {
  const { auth } = useAuth();
  const [fridges, setFridges] = useState<FridgeITC[]>([]);
  const [fridgeControlled , setfridgeControlled ] = useState<Fridge_controledITC[]>([]);
  const commonClasses = 'bg-inherit w-32 h-40 b-4 text-white border-none rounded-none mb-4 hover:shadow-md hover:shadow-cyan-600 hover:cursor-pointer';

  useEffect(() => {
    const fetchData = async () => {
        try {
            const data :  FridgeITC[]= await FETCH_REQUEST('fridges', 'GET', auth.token);
            setFridges(data);

             const allControlsData = await Promise.all(
               data.map(async (fridge) => {
              const controlData: Fridge_controledITC = await FETCH_REQUEST(`fridgecontrols/${fridge.id}`, 'GET', auth.token) 
              return controlData
             
            }));
            setfridgeControlled(allControlsData)
           
        } catch (error) {
            console.error(error);
        }
    };

    fetchData();
}, [auth.token]);

   return (
    <div className='bg-gray-900 m-4 p-4 shadow-md shadow-cyan-700 max-w-content' >
      <TooltipDemo 
      legend='This section empowers you to regulate your machine temperatures in comparison to standards. It provides detailed insights into the statistics of each individual machine for thorough monitoring.'>
      <h2 className="text-xl text-white py-2 border-b mb-4 ">FRIDGES</h2>
      </TooltipDemo>
      <div className="flex items-start overflow-x-auto h-64  ">
        {fridges.map((fridge) => (
          <div className='mx-3' key={fridge.id}   >
             <div className='w-full shadow-md shadow-cyan-700 '>
             
              <Options 
              fridge_id={fridge.id}/>
              </div>
              <Card
                  className={`${commonClasses} ${fridgeControlled.some((control) => control?.temperature === Number(fridge.temperature_required))
                      ? 'bg-gradient-to-r from-cyan-700 to-sky-850 '
                      : 'bg-gradient-to-r from-yellow-800 to-sky-850 '
                    }`}>

                  <CardHeader>{fridge.name}</CardHeader>

                  <Link href={`dashboard/services/fridge/${fridge.id}`} >
                    <CardContent>
                    {fridgeControlled.map((i) => (
                      i?.fridge_id === Number(fridge.id) && (
                        <CardTitle className='pb-2' key={fridge.id}>
                          {i.temperature !== undefined
                            ? `${i.temperature}°C`
                            : 'start'}
                        </CardTitle>
                      )
                    ))}

                    <CardDescription className='border-t my-2 text-slate-300 italic'>Should be {fridge.temperature_required}°C</CardDescription>
                  </CardContent>
                  </Link>
                  


                </Card>
                  </div>
                ))}
              
       
      </div>
      <div className="mr-4 p-2 ">
    <Link href={'dashboard/services/fridge'}  className='text-cyan-700 hover:text-white mr-4'> View <FontAwesomeIcon icon={faArrowRight} /></Link>
    </div>
    </div>
  );
        }