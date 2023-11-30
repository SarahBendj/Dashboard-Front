'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faHouse, faCircleInfo, faNewspaper, faUsers, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Reveal from '@/hook/reveal';
import './logo.scss';

export default function Menu() {
    const menuPathStyle: string = 
    'w-full text-2xl px-4 py-2 border-r-4 border-transparent hover:bg-cyan-700 hover:w-full  hover:bg-opacity-25 hover:border-r-4 hover:border-cyan-500';

    return (
        <div className='bg-gray-900 mt-4 pb-4 text-white flex flex-col h-screen  w-full min-h-content  rounded-none  shadow-md shadow-cyan-700 '>
           
            <div className='w-full mx-auto pb-4 '>
            <div className=" flex items-center justify-center pt-6 pb-2 mt-0 mx-auto shadow-md shadow-cyan-700">
            <span className='z-10 text-3xl py-2 mx-auto '>CUISTO</span> 
                </div>
             
            </div>
           
            <div className='w-full'>
                <ul className="flex flex-col items-start justify-center pt-4 text-xl">
                    
                    <li className={menuPathStyle}>
                        <Link href="/dashboard" >
                            <FontAwesomeIcon  className='mx-2' icon={faHouse} />Dashboard
                        </Link>
                    </li>
                    <li className={menuPathStyle}>
                        <Link href="/dashboard/services/about" >
                            <FontAwesomeIcon  className='mx-2' icon={faCircleInfo} /> <span> About</span>
                        </Link>
                    </li>
                    <li className={menuPathStyle}>
                        <Link href="/dashboard/services/fridge" >
                            <FontAwesomeIcon  className='mx-2' icon={faNewspaper} /> <span>Fridge</span>
                        </Link>
                    </li>
                     <li className={menuPathStyle}>
                        <Link href="/dashboard/services/reception" >
                            <FontAwesomeIcon  className='mx-2' icon={faNewspaper} /> <span>Reception</span>
                        </Link>
                    </li>
                    <li className={menuPathStyle}>
                        <Link href="/dashboard/services/member" >
                            
                            <FontAwesomeIcon  className='mx-2' icon={faUsers} /> <span>Member</span>
                        </Link>
                    </li>
                    <li className={menuPathStyle}>
                        <Link href="/dashboard/services/supplier" >
                            <FontAwesomeIcon  className='mx-2' icon={faNewspaper} /> <span>Supplier</span>
                        </Link>
                    </li>
                    <li className={menuPathStyle}>
                        <Link href="/dashboard/services/warning" >
                            <FontAwesomeIcon  className='mx-2' icon={faCircleExclamation} /> <span>Warning</span>
                        </Link>
                    </li>
                </ul>
              
            </div>
         
        </div>
    );
}
