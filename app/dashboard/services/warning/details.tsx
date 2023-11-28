'use client' 
import { Button } from "@/components/ui/button"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGears } from '@fortawesome/free-solid-svg-icons';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import Update from '../../CRUD/Update';
import { WarningFridgeITC, WarningITC, WarningRecepetionITC } from "@/TYPES.ts/creationData";

export default function YourComponent({data} : { data : WarningITC }) {

    const customFridgeDescriptions: Record<keyof  WarningFridgeITC, string | boolean> = {
        id : 'Warning Reference',
        createdat: 'Date of Issue',
        description: 'Description reported on the reception section',
        fridgeId: 'Fridge controle file',
        updatedat: 'Issue fixed date',
      };
      const customReceptionDescriptions: Record<keyof  WarningRecepetionITC, string | boolean> = {
        id : 'Warning Reference',
        createdat: 'Date of Issue',
        description: 'Description reported on the reception section',
        rcptreception: 'Description reported on the reception section',
        receptionId: 'Reception Identifier',
        updatedat: 'Issue fixed date',
        
      };

      const section: string = data.fridgeId ? 'THE FRIDGE SECTION'  : 'THE RECEPTION SECTION'

  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button  className="bg-gradient-to-r from-yellow-900 to-sky-850  w-full text-white rounded-none "> Details<FontAwesomeIcon icon={faGears} /> </Button>
      </DialogTrigger>
      <DialogContent className="w-full bg-gray-900 text-white ">
        <DialogHeader>
          <DialogTitle>  You are currently encountering an issue with  <span className="italic text-cyan-700 my-4">{`${section}` } </span>
                         </DialogTitle>    </DialogHeader>
      <div className=" py-4">
      {Object.keys(data).map((key) => (
            <div className="border-b-2 border-gray-800" key={key}>
              <p className="italic">
                {data.fridgeId ? customFridgeDescriptions[key as keyof WarningFridgeITC] : customReceptionDescriptions[key as keyof WarningRecepetionITC]}:{' '}
                <span className="font-bold">{data[key as keyof WarningITC]}</span>
              </p>
            </div>
          ))}
{ data.warning_status && (
  <div className="w-full m-auto py-4">
  <Update updatePath={`warnings/${data.id}`} METHOD ='PATCH'
  dataTarget={'warning'} fields={["description"]} 
  signOrCheck={true} preFilledData={ { warning_status: !data.warning_status }} />
</div>

)}

     
         </div>
         
        <DialogClose>
            <Button className='rounded-none bg-white text-gray-900 '> Close </Button>
        </DialogClose>
        </DialogContent>
    </Dialog>
  );
}