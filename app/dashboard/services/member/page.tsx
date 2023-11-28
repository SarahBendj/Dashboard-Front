'use client'
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useAuth } from '@/context/useAuth';
import { FETCH_REQUEST } from '@/lib/fetching';
import React, { useEffect, useState } from 'react';
import Create from '../../CRUD/Create';
import Delete from '../../CRUD/Delete';
import Update from '../../CRUD/Update';
import SupplierStats from '../../Stats/supplier';


interface MemberITC {
  id: number;
  lastname : string;
  firstname : string;
  identificant : string;
  role : string;
 
}
// interface NewMemberITC {
//     name : string;
//    contact : string;
//   }

export default function ReceptionTable() {
  const [ members , setMembers ]= useState<MemberITC[]>([])
  const { auth } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
        try {
            const data :MemberITC[]  = await FETCH_REQUEST('users/info', 'GET', auth.token);
            setMembers(data);
        } catch (error) {
            console.error(error);
        }
    };
    fetchData();
}, [auth.token]);


  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex-col items-center  justify-center w-full ">
      <div className='h-48 w-full'>
      
      </div>
  <div className="bg-gray-900 m-4 p-4 w-full rounded-lg ">
    
    <h2 className='text-xl text-white pb-4'>Suppliers</h2>
    <div className='text-xl text-white w-full'> <Create  dataName='Supplier' fields ={["name", "contact"]} createPath='suppliers'/> </div>
    

    <Table > 
        <TableCaption> Members</TableCaption>
        <TableHeader>
        <TableRow>
         
            <TableHead> NAME </TableHead>
            <TableHead> CONTACT </TableHead>
            <TableHead> ROLE </TableHead>
             <TableHead className='flex justify-center items-center'> OPTIONS </TableHead> 
        </TableRow>
        </TableHeader>

        <TableBody className="text-white cursor-pointer">
          {members.map((member) => (
            <TableRow key={member.id}>
                  <TableCell>{member.identificant}</TableCell>
                  <TableCell> {member.lastname} <span className='text-gray-200'> {member.firstname}</span> </TableCell>
                  <TableCell>{member.role}</TableCell>
                  {/* <TableCell className='flex justify-around'> 
                    <Update updatePath={`member/${member.id}`}  dataTarget={member.name} fields ={["name", "contact"]}/>
                   <Delete deletePath={`member/${member.id}`}  dataTarget={member.name}/>
                   </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
        </Table>

    </div></div>
    </div>
  )
}
