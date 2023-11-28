'use client'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@/context/useAuth';
import { FETCH_REQUEST } from '@/lib/fetching'
import React, { useEffect, useState } from 'react'
import { FridgeITC, Fridge_controledITC } from '@/TYPES.ts/creationData';
import FridgeStats from '../../../Stats/fridgeStat';
import Link from 'next/link';
import Pagination from '@/hook/Pagination';
import Settings from '@/app/dashboard/items.tsx/Fridge/Settings';
import parseAndFormatDate from '@/hook/dateFormat';

export default function ReceptionTable({ params }: { params: { id: string }} ) {

    const { auth } = useAuth();
  
    const [ fridge, setFridge ] = useState<FridgeITC>()
    const [ fridgeControlledList , setfridgeControlledList ] = useState<Fridge_controledITC[]>([])

  useEffect(() => {
    const fetchData = async () => {
        try {
            const data : FridgeITC = await FETCH_REQUEST(`fridges/infos/${params.id}`, 'GET', auth.token);
            const dataControlled : Fridge_controledITC[] = await  FETCH_REQUEST(`fridgecontrols/${params.id}/list`, 'GET', auth.token);
            setFridge(data);
            setfridgeControlledList(dataControlled)
        } catch (error) {
            console.error(error);
        }
    };
    fetchData();
}, [auth.token , params]);



  return (
    <div className='h-screen '>
      <h1 className='text-xl text-white'>Overview -Fridge Section</h1>
    <div className="bg-gray-900 m-4 p-4  shadow-md shadow-cyan-700">
     
      <p className='text-white text-lg'>This page provides an overview of the current status of refrigerator reference [`${fridge?.name}`]. You can analyze a graph illustrating the temperature controls that have been recorded over time. Additionally, there is a table presenting a comprehensive list of all the controls that have been documented.</p>

    <h2 className=' py-4 text-xl text-cyan-700'>Technical sheet </h2>

    <Table className=""> 
        <TableCaption> Technical sheet </TableCaption>
        <TableHeader>
        <TableRow>
         
            <TableHead> Reference</TableHead>
            <TableHead> Temperature required</TableHead>
           
        </TableRow>
        </TableHeader>

        <TableBody className="text-white">
        {fridge &&
      <TableRow key={fridge.id}>
        <TableCell>{fridge.name}</TableCell>
        <TableCell>{fridge.temperature_required ? `${fridge.temperature_required} °Celsius` : 'Start'}</TableCell>
     
      </TableRow>
    }
        </TableBody>
    </Table>
    <Settings fridge_id={fridge?.id} fridge_name={fridge?.name}/> 
    <div className="mr-4">
    </div>
   
    </div>
    <div className="flex justify-between w-full">
<div className='w-1/3 bg-gray-900 m-4 p-4  shadow-md shadow-cyan-700'>
  <FridgeStats temperatures ={ fridgeControlledList.map((i)=> Number(i.temperature))} temperature_required={Number(fridge?.temperature_required)} />
</div>
<div className="w-2/3 bg-gray-900 m-4 p-4  shadow-md shadow-cyan-700">
<h2 className='text-xl text-white'>Last controls </h2>
<div className="overflow-y-auto h-80">
<Table className=""> 
    <TableCaption> Controls </TableCaption>
    <TableHeader>
    <TableRow>
     
        <TableHead> Temperature</TableHead>
        <TableHead> Description</TableHead>
        <TableHead> Control date </TableHead>
    </TableRow>
    </TableHeader>

    <TableBody className="text-white">
    {fridgeControlledList?.map((control)=> (
      <TableRow key={control.id} 
      className={ Number(control.temperature) === Number(fridge?.temperature_required)? 'bg-inherit bg-gradient-to-r from-cyan-900 to-rose-850' : 'bg-inherit bg-gradient-to-r from-yellow-800 to-sky-850 ' }>
        
      <TableCell  >{control.temperature}</TableCell>
      <TableCell>{control.description ?? (Number(control.temperature) === Number(fridge?.temperature_required) ? 'NTS' : 'Warning')}</TableCell>
      <TableCell>{parseAndFormatDate(control.createdat)}</TableCell>
    </TableRow>

    ))
  
}
    </TableBody>
</Table>

</div></div>
</div>

</div>
    
)
}