'use client'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@/context/useAuth';
import { FETCH_REQUEST } from '@/lib/fetching'
import Link from 'next/link';
import { TooltipDemo } from '@/hook/LegendOnHover';
import React, { useEffect, useState } from 'react';
import parseAndFormatDate from '@/hook/dateFormat';
import { ReceptionITC } from '@/TYPES.ts/creationData';


export default function ReceptionTable() {
  const [receptions , setReceptions ]= useState<ReceptionITC[]>([])
  const { auth } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
        try {
            const data :ReceptionITC[]  = await FETCH_REQUEST('receptioncontrols/info', 'GET', auth.token);

            setReceptions(data);
        } catch (error) {
            console.error(error);
        }
    };

    fetchData();
}, [auth.token]);


  return (
  <div className="bg-gray-900 m-4 p-4  shadow-md shadow-cyan-700">
    <TooltipDemo legend="This section provides information about the latest deliveries,
     including the supplier's name, delivery condition, and delivery time.">
    <h2 className='text-xl text-white '>LAST RECEPTIONS</h2>
    </TooltipDemo>
    <div className="overflow-y-auto h-48">
    <Table > 
        <TableCaption> LAST RECEPTIONS</TableCaption>
        
        <TableHeader>
      
        <TableRow>
         
            <TableHead> SUPPLIER</TableHead>
            <TableHead> STATUS</TableHead>
            <TableHead> DATE</TableHead>
        </TableRow>
        </TableHeader>
  
        <TableBody className="text-white">
        {receptions.map((reception) => (
      <TableRow key={reception.id}>
        <TableCell>{reception.supplierName}</TableCell>
        <TableCell>{reception.warning_status ?  'warning' : 'NTS'}</TableCell>
        <TableCell>{parseAndFormatDate(reception.createdat)}</TableCell>
      </TableRow>
   
    ))}
        </TableBody>
    
    </Table>
    </div>
    <div className="mr-4">
    <Link href={'dashboard/services/reception'}  className='text-cyan-700 hover:text-white mr-4'> View <FontAwesomeIcon icon={faArrowRight} /></Link>
    </div>
   
    </div>
    
  )
}
