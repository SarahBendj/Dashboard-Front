'use client'

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useAuth } from '@/context/useAuth';
import { FETCH_REQUEST } from '@/lib/fetching';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import CurrentState from '@/hook/CurrentState';
import Details from './details';
import WarningStats from '../../Stats/warningState';
import Pagination from '@/hook/Pagination';
import { WarningITC } from '@/TYPES.ts/creationData';
import { Button } from '@/components/ui/button';
import parseAndFormatDate from '@/hook/dateFormat';


export default function ReceptionTable({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const [warnings, setWarnings] = useState<WarningITC[]>([]);
  const [legendIsOpen, setLegendIsOpen] = useState<boolean>(false);
  const { auth } = useAuth();

  console.log(warnings)
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: WarningITC[] = await FETCH_REQUEST('warnings/infos', 'GET', auth.token);
        setWarnings(data);
        console.log(data)

      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [auth.token]);
  //*pagination

  const page = searchParams['page'] ?? '1'
  const perPage = page === '1' ? (searchParams['per_page'] ?? '5') : (searchParams['per_page'] ?? '10')

  const start = (Number(page) - 1) * Number(perPage)
  const end = start + Number(perPage)

  const dataToDisplayPerPage: WarningITC[] = warnings.slice(start, end)

  const toggleLegend = (): void => {
    setLegendIsOpen(!legendIsOpen)
  }


  return (
    <div className="h-screen">

      <div className="flex flex-col ">
      {page === '1' && (
        <div className="flex justify-between bg-gray-900 m-4 p-4 ">
          <div className="bg-gray-900 m-4 p-4 shadow-md shadow-cyan-700 max-h-content w-3/4">

            <CurrentState state={warnings.map((warn) => warn.warning_status)} />
            {legendIsOpen && (
              <p className="text-white">
                In this section, you can manage warnings related to both your reception processes and fridge section. Take charge and provide feedback or evaluations concerning the services and products delivered by your supplier. Attribute warnings to the relevant categories, and specify the temperature associated with received items in the fridge. Additionally, this section includes fixed warnings that require your attention to ensure the overall stability and safety of your processes.
                Warnings are automatically registered when issues occur

              </p>
            )}

            <Button className="bg-inherit hover:text-white text-cyan-700 text-md rounded-none shadow-sm shadow-cyan-700 mt-2 " onClick={toggleLegend}>
              {legendIsOpen ? 'Close Legend' : 'Open Legend'}
            </Button>

          </div>

          <div className="w-3/4 ">
            


              <WarningStats />

          
          </div>
        </div>
        )}


        <div className="bg-gray-900 m-4 p-4 w-full shadow-md shadow-cyan-700 ">
          <div className="flex justify-between">
            <h2 className='text-xl text-white pb-4'>Warnings</h2>
            <Pagination url={'warning'} nextPage={end < warnings.length}
              prevPage={start > 0} />
          </div>


          <Table >
            <TableCaption> Warnings</TableCaption>
            <TableHeader>
              <TableRow>

                <TableHead> REFERENCE</TableHead>
                <TableHead> STATE </TableHead>
                <TableHead> WARNING MESSAGE </TableHead>
                <TableHead> FIXED MESSAGE </TableHead>
                <TableHead> DATE </TableHead>
                <TableHead className='flex justify-center items-center'> OPTIONS </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="text-white cursor-pointer">
              {dataToDisplayPerPage.map((warning) => (
                <TableRow key={warning.id}>
                  <TableCell>{warning.fridgeId ? warning.fridgeId : warning.receptionId} </TableCell>
                  <TableCell>
                    <FontAwesomeIcon icon={warning.warning_status ? faTimesCircle : faCheckCircle}
                      className={`scale-150 ${warning.warning_status ? 'text-yellow-700' : 'text-cyan-500'}`}
                    />
                  </TableCell>
                  <TableCell> {warning.warning_status ? warning.description : 'FIXED'} </TableCell>
                  <TableCell> {warning.warning_status ? 'UNFIXED YET': warning.description} </TableCell>
                  <TableCell>{parseAndFormatDate(warning.createdat)}</TableCell>
                  <TableCell> <Details data={warning} /></TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>

        </div>
      </div>

    </div>

  )
}
