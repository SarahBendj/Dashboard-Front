'use client'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGears } from '@fortawesome/free-solid-svg-icons';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
  } from "@/components/ui/navigation-menu";
  
  import Delete from '../../CRUD/Delete';
  import Update from '../../CRUD/Update';
  import Create from '../../CRUD/Create';
  import useDecodeAuthToken from '@/context/useDecodeAuthToken';
import { JwtPayloadITC } from '@/TYPES.ts/creationData';


export default function Settings( {fridge_id, fridge_name } : { fridge_id ?: string, fridge_name ?: string  }) {

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
              <div className="">
              <div className="w-full p-auto p-4 font-bold border-b"> 
              <Create dataName='Control' 
            fields ={["temperature","description"]} 
             preFilledData={{
              app_user_id : user ? parseInt(user.id) : null,
              fridge_id: fridge_id
            }} 
            createPath={`fridgecontrols`}/>
            </div>
                <div className="w-full p-auto p-4 font-bold"> <Update updatePath={`fridges/${fridge_id}`}  dataTarget={fridge_name} fields ={["name", "temperature_required"]}/></div>
                <div className="w-full p-auto p-4 font-bold"> <Delete deletePath={`fridges/${fridge_id}`}  dataTarget={fridge_name}/></div>
             
              </div>
            </NavigationMenuContent>
          </div>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>

  )
}
