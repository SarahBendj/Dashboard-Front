'use client'
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useAuth } from '@/context/useAuth';
import { FETCH_REQUEST } from '@/lib/fetching';
import React, { useEffect, useState } from 'react';
import Create from '../../CRUD/Create';
import Delete from '../../CRUD/Delete';
import Update from '../../CRUD/Update';


interface SupplierITC {
  id: number;
  name : string;
 contact : string;
}


export default function ReceptionTable() {
  const [ suppliers , setSuppliers ]= useState<SupplierITC[]>([])
  const { auth } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
        try {
            const data :SupplierITC[]  = await FETCH_REQUEST('suppliers', 'GET', auth.token);
            setSuppliers(data);
        } catch (error) {
            console.error(error);
        }
    };
    fetchData();
}, [auth.token]);


  return (
    <div className="flex justify-center items-start h-screen">
   
      <div className="flex flex-col  justify-center w-full ">
      
  <div>
  <div className="w-full  bg-gray-900 m-4 p-4  shadow-md shadow-cyan-700 text-white py-4" >
    <h2 className='border-b text-xl mb-4 pb-4'> Supplier Overview</h2>
        <p>Efficiently manage your suppliers in this section, overseeing and organizing their information. Additionally, track and review the details of their latest deliveries for comprehensive supply chain management.</p>

      </div>
      <div className="bg-gray-900 m-4 p-4 w-full shadow-md shadow-cyan-700">
    <h2 className='text-xl text-white pb-4'>Suppliers</h2>
    <div className='text-xl text-white w-full'> <Create  dataName='Supplier' fields ={["name", "contact"]} createPath='suppliers'/> </div>
    

    <Table > 
        <TableCaption> Suppliers</TableCaption>
        <TableHeader>
        <TableRow>
         
            <TableHead> NAME </TableHead>
            <TableHead> CONTACT </TableHead>
             <TableHead className='flex justify-center items-center'> OPTIONS </TableHead> 
        </TableRow>
        </TableHeader>

        <TableBody className="text-white cursor-pointer">
          {suppliers.map((suppliers) => (
            <TableRow key={suppliers.id}>
                  <TableCell>{suppliers.name}</TableCell>
                  <TableCell>{suppliers.contact}</TableCell>
                  <TableCell className='flex justify-around'> 
                    <Update updatePath={`suppliers/${suppliers.id}`}  dataTarget={suppliers.name} fields ={["name", "contact"]}/>
                   <Delete deletePath={`suppliers/${suppliers.id}`}  dataTarget={suppliers.name}/>
                   </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>

    </div></div>
    </div></div>
  )
}
