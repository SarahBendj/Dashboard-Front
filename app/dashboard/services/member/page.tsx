'use client'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useAuth } from '@/context/useAuth';
import { FETCH_REQUEST } from '@/lib/fetching';
import React, { useEffect, useState } from 'react';
import Create from '../../CRUD/Create';
import Update from '../../CRUD/Update';
import { JwtPayloadITC, MemberITC } from '@/TYPES.ts/creationData';
import MemberStats from '../../Stats/memberStats';
import { Button } from '@/components/ui/button';
import useDecodeAuthToken from '@/context/useDecodeAuthToken';


export default function ReceptionTable() {
  const [ members , setMembers ]= useState<MemberITC[]>([])
  const { auth } = useAuth();
  const [ isExpanded ,setIsExpanded ] = useState<boolean>(false);
  const user = useDecodeAuthToken();
  console.log(user?.role)
  



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
const expandComponent =(): void => {
  setIsExpanded(!isExpanded)
}


  return (
    <div className="flex items-center justify-center h-screen">
   
      <div className="flex-col items-center h-full justify-around w-11/12 ">
        <div className="mb-4 w-80 bg-gray-900 mx-4 p-4 w-full  shadow-md shadow-cyan-700">
          
          <Button   onClick={expandComponent} className='shadow-sm shadow-cyan-700 bg-inherit text-white rounded-none text-xl'> {isExpanded ? 'Hide' : ' Expand'}</Button>
         
          <div className={ isExpanded ? 'hidden' :'py-2 mx-auto text-white italic'}>  Explore the latest activities of our members through an insightful diagram. Expand for more details.</div>
          <div className={ isExpanded ? 'w-4/5' :'hidden'}> 
        <MemberStats  />
        </div>
        </div>
    
      <div className="bg-gray-900 mx-4 p-4 w-full  shadow-md shadow-cyan-700">
        
        <h2 className='text-xl text-white pb-4'>Members</h2>
        <div className='text-xl text-white w-full'> <Create dataName='Member' fields ={["firstname","lastname","email"]} createPath='users' radio={"role"}/> </div>
        
   <div className={isExpanded ? "hidden" : "overflow-y-auto h-96"}>/
    <Table > 
        <TableCaption> Members</TableCaption>
        <TableHeader>
        <TableRow>
         
            <TableHead> IDE </TableHead>
            <TableHead> FULLNAME </TableHead>
            <TableHead> ROLE </TableHead>
             <TableHead > STATUS </TableHead> 
        </TableRow>
        </TableHeader>

        <TableBody className="text-white cursor-pointer">
          {members.map((member) => (
            <TableRow key={member.id}>
                  <TableCell>{member.identificant}</TableCell>
                  <TableCell> {member.lastname} <span className='text-gray-200'> {member.firstname}</span> </TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>  <Update dataTarget={"member"}  status={member.user_status ? "Active" : "Inactive"} fields={[]} updatePath={`users/delete/${member.id}`}  /> </TableCell>
                
                 
            </TableRow>
          ))}
        </TableBody>
        </Table>
        </div>

    </div></div>
    </div>
  )
}
