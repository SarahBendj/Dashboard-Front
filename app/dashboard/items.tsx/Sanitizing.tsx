import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'

export default function SanitizingTable() {
  return (
  <div className="bg-gray-900 m-4 p-4 rounded-lg">
    <h2 className='text-xl text-white'> SANITIZING</h2>

    <Table className=" "> 
        <TableCaption> LAST SANITIZING</TableCaption>
        <TableHeader>
        <TableRow>
            <TableHead> INDEX</TableHead>
            <TableHead> STATUS</TableHead>
          
        </TableRow>
        </TableHeader>

        <TableBody>
            <TableRow className='text-white'>
                <TableCell> Coming soon</TableCell>
            </TableRow>
        </TableBody>
    </Table>
    </div>
    
  )
}
