'use client'
import { Button } from '@/components/ui/button';
import { useSearchParams, useRouter} from 'next/navigation'
import React from 'react'
interface PaginationITC {
    prevPage: boolean;
    nextPage: boolean;
    url? : string;
  }
  
  export default function Pagination({ prevPage, nextPage, url }: PaginationITC) {


    const searchParams = useSearchParams();
    const router = useRouter();
    const page = searchParams.get('page') ?? '1';
    const perPage = page === '1' ? (searchParams.get('per_page') ?? '5') : (searchParams.get('per_page') ?? '10');

  return (
    <div className='flex text-white '>
        <Button className='text-cyan-500 bg-inherit'  disabled={!prevPage }
        onClick={()=> {router.push(`${url}/?page=${Number(page) - 1}&per_page=${perPage}`)} }
        > prev </Button>
        <div className='px-4'> {page}</div>

        <Button className='text-cyan-500 bg-inherit'
        disabled={!nextPage }
         onClick={()=> {router.push(`${url}/?page=${Number(page) + 1}&per_page=${perPage}`)} }
        > next </Button>
    </div>
  )
}
