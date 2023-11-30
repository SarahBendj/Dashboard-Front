'use client'
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useAuth } from '@/context/useAuth';
import { FETCH_REQUEST } from '@/lib/fetching';
import React, { useEffect, useState } from 'react';
import Create from '../../CRUD/CreateforReception';
import useDecodeAuthToken from '@/context/useDecodeAuthToken';
import { JwtPayloadITC, ReceptionITC } from '@/TYPES.ts/creationData';
import ReceptionStats from '../../Stats/receptionStats';
import CurrentState from '@/hook/CurrentState';
import parseAndFormatDate from '@/hook/dateFormat';


export default function ReceptionTable() {
  const [receptions , setReceptions ]= useState<ReceptionITC[]>([])
  const [ expandedRow , setExpandedRow ] = useState<ReceptionITC | null>(null);
  const [ legendIsOpen , setLegendIsOpen ] = useState<boolean>(false);

  const user: JwtPayloadITC | null = useDecodeAuthToken();
  const { auth } = useAuth();
  console.log(user)


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

const toggleInformations = (reception : ReceptionITC)=> {
  
  if(expandedRow === reception )
   { setExpandedRow(null);
} else {
  setExpandedRow(reception);
}
}

const toggleLegend = () :void => {
  setLegendIsOpen(!legendIsOpen)
}

  return (
  <div className=" h-screen ">
    <div className="flex flex-col ">
      <div className="flex justify-between bg-gray-900 m-4 p-4 ">
      
      <div className="bg-gray-900 m-4 p-4 shadow-md shadow-cyan-700 max-h-content">
            
              <CurrentState state={receptions.map((rep) => rep.warning_status ?? false)} />
              {legendIsOpen  && (
              <p className="text-white">
                In this section, you have the ability to manage your reception processes in relation
                to your supplier. Take control and provide feedback or evaluations regarding the
                services and products delivered by your supplier, attribute the reception to the
                relevant category and specify the temperature associated with the received items.
              </p>
            )}

<Button className="bg-inherit hover:text-white text-cyan-700 text-md rounded-none shadow-sm shadow-cyan-700 mt-2 " onClick={toggleLegend}>
            {legendIsOpen ? 'Close Legend' : 'Open Legend'}
          </Button>
     
      </div>
      <div className="w-50"> <ReceptionStats  status={receptions.map((rep)=> rep.warning_status ??  false)}/></div>
      </div>
   <div className='bg-gray-900 shadow-md shadow-cyan-700 m-4 p-4 h-full '>
    <h2 className='text-2xl text-white pb-4'>RECEPTIONS</h2>
    <div className='text-xl text-white w-full rounded-none'> 
    <Create  
         preFilledData={{
          app_user_id : user ? parseInt(user.id) : null,
        }} 
        dataName='receptioncontrols' 
        fields ={["temperature", "description"]} createPath='receptioncontrols' 
        checkboxes={['vehicle_compliance','packaging_condition', 'expiration_date']}
       
        /> </div>
            <div className="overflow-y-auto h-80">


    <Table className=""> 
        <TableCaption> LAST RECEPTIONS</TableCaption>
        <TableHeader>
        <TableRow>
         
            <TableHead> SUPPLIER</TableHead>
            <TableHead> STATUS</TableHead>
            <TableHead> DATE</TableHead>
        </TableRow>
        </TableHeader>

        <TableBody className="text-white cursor-pointer">
          {receptions.map((reception) => (
            <TableRow  className= { !reception.warning_status ? 'bg-gradient-to-r from-cyan-900 to-rose-850' : 'bg-gradient-to-l from-yellow-800 to-sky-850' } key={reception.id} onClick={() => toggleInformations(reception)}>
              {expandedRow === reception ? (
                <>
                <TableCell>
                  <p>Supplier: {reception.supplierName}</p>
                  <p>Goods Name: {reception.goodsName}</p>
                  <p>
              
                  </p>
                  <p>Temperature: {reception.temperature}</p>
                  <p>
                    Vehicle Compliance: {reception.vehicle_compliance ? 'Compliant' : 'Non-Compliant'}
                  </p>
                  <p>
                    Packaging Condition: {reception.packaging_condition ? 'Good' : 'Not Good'}
                  </p>
                  <p>
                    Expiration Date: {reception.expiration_date ? 'Valid' : 'Expired'}
                  </p>
                 
                  <p>Reception Description: {reception.receptionDESC}</p>
                  </TableCell>
                  <TableCell 
                 
                  > {reception.warning_status ? 'warning' : 'NTS'}</TableCell>
                  <TableCell>{reception.createdat}</TableCell>
               
                 
                </>
              ) : (
                <>
                  <TableCell>{reception.supplierName}</TableCell>
                  <TableCell>{reception.warning_status ? 'warning' : 'NTS'}</TableCell>
                  <TableCell>{parseAndFormatDate(reception.createdat)}</TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
        </Table>
        </div>
     
        </div>
        </div>
    </div>
    
  )
              }