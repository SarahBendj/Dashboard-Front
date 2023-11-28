'use client'
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/useAuth';
import { FETCH_REQUEST } from '@/lib/fetching';
import { FridgeITC, Fridge_controledITC } from '@/TYPES.ts/creationData';
import Link from 'next/link';
import Create from '../../CRUD/Create';
import Options from '../../items.tsx/Fridge/options';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const FridgePage: React.FC = () => {
  const { auth } = useAuth();
  const [fridges, setFridges] = useState<FridgeITC[]>([]);
  const [fridgeControlled, setFridgeControlled] = useState<Fridge_controledITC[]>([]);
  const commonClasses = 'bg-inherit w-32 h-40 b-4 text-white border-none rounded-none mb-4 hover:shadow-md hover:shadow-cyan-600';
  console.log(fridgeControlled)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: FridgeITC[] = await FETCH_REQUEST('fridges', 'GET', auth.token);
        if (data) {
          setFridges(data);
  
          const allControlsData = await Promise.all(
            data.map(async (fridge) => {
              const controlData: Fridge_controledITC = await FETCH_REQUEST(`fridgecontrols/${fridge.id}`, 'GET', auth.token);
              return controlData;
            })
          );
          setFridgeControlled(allControlsData);
        } else {
          setFridges([]);
          setFridgeControlled([]);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, [auth.token]);
  

  return (
    <div className='m-4 '>
      <div className="w-full bg-gray-900  shadow-md shadow-cyan-700 text-white p-4">
        <h2 className="border-b text-xl mb-4 pb-4">Fridges Overview</h2>
        <p>
          Efficiently control your fridges in this section, overseeing and organizing their information. Additionally, track and review the details of
          their latest controls for comprehensive supply chain management.
        </p>
      </div>

      <div className="bg-gray-900  my-4 p-4 shadow-md shadow-cyan-700">
        <h2 className="text-xl text-white py-2 border-b mb-4">FRIDGES</h2>
        <div className="w-full my-4 py-4 ">
          <Create dataName="Fridge" fields={['name', 'temperature_required']} display={true} createPath="fridges" />
        </div>

        <div className="flex flex-wrap items-start ">

          {fridges.map((fridge) => (
            <div className='mx-3' key={fridge.id}   >
              <div className='w-full shadow-md shadow-cyan-700 '>

                <Options
                  fridge_id={fridge.id} />
              </div>
              <Link href={`fridge/${fridge.id}`}>
                <Card
                  className={`${commonClasses} ${fridgeControlled.some((control) => control?.temperature === Number(fridge.temperature_required))
                      ? 'bg-gradient-to-r from-cyan-700 to-sky-850 '
                      : 'bg-gradient-to-r from-yellow-800 to-sky-850 '
                    }`}>

                  <CardHeader>{fridge.name}</CardHeader>

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


                </Card>
              </Link>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default FridgePage;