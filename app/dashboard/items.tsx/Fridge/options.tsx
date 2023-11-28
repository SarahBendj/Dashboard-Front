'use client'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faGears } from '@fortawesome/free-solid-svg-icons';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";


import Create from '../../CRUD/Create';
import useDecodeAuthToken from '@/context/useDecodeAuthToken';
import { JwtPayloadITC } from '@/TYPES.ts/creationData';
import Link from 'next/link';


export default function Settings({ fridge_id }: { fridge_id?: string }) {

  const user: JwtPayloadITC | null = useDecodeAuthToken();

  return (
    <NavigationMenu className='w-full '>
      <NavigationMenuList >
        <NavigationMenuItem >
          <div key="tata">
            <NavigationMenuTrigger
              className="w-32
            bg-gray-900 shadow-md shadow-cyan-700 font-bold text-l text-white  px-2 border border-none rounded-none "
            ><FontAwesomeIcon icon={faGears} /></NavigationMenuTrigger>
            <NavigationMenuContent className=" bg-gray-850 ">

              <div className="w-full p-auto p-4 font-bold border-b  bg-inherit">
                <Create dataName='Control '
                  fields={["temperature", "description"]}
                  preFilledData={{
                    app_user_id: user ? parseInt(user.id) : null,
                    fridge_id: fridge_id
                  }}
                  createPath={`fridgecontrols`} />

              </div>

            </NavigationMenuContent>
          </div>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>

  )
}
