'use client' 
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/useAuth"
import { FETCH_REQUEST } from "@/lib/fetching"
import { FormEvent, useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import useNotification from "@/hook/useNotification"


export default function YourComponent({ dataName ,fields ,createPath , display = true , preFilledData , checkboxes , selectData }:
   { dataName : string ,fields: (string| number)[] ,createPath:string , display? :boolean ,preFilledData? :any ,checkboxes ? : string[] , selectData? : string}) {
  const [formData, setFormData] = useState({...preFilledData});
  const { showError, showSucess } = useNotification();
  const { auth } = useAuth();
  
  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormData({
      ...formData,
      [name]: value,

    });
  };

  const handleOnSave = async () => {
    try {
        await FETCH_REQUEST(createPath, 'POST', auth.token, formData);
        showSucess('Successfully filled')
   
    } catch (error) {
        console.error(error);
        showError('Something went wrong,please try again')
    }
};

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button  className="bg-gradient-to-r from from-gray-800 to-sky-700  w-full text-white rounded-none "> {display ?  ` + New ${dataName}` : '+' }</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle >  New  <span className="text-green-800">{dataName}</span></DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
      
        {fields.map((field : any) => (
        <div key={field}>
            {!field.includes('_id') && (
                <>
             <Label htmlFor="name" className="text-right">
              {field}
            </Label>
            <Input 
      type={field.includes('temperature') ? 'number' : 'text'}
      name={field}
      value={field.includes('temperature') ? parseInt(formData[field] as string) : formData[field]}
      onChange={handleInputChange}
      
          />
          </>
)}
        </div>
      ))
       
       }
        {/* //*IS THERE SOME CHECKBOX ? */}
        {checkboxes && checkboxes.length > 0 && checkboxes.map((checkbox) => (
  <div className="flex items-center space-x-2" key={checkbox}>
    <Checkbox
      id={checkbox}
      name={checkbox}
      checked={formData[checkbox]}
      onCheckedChange={(checked) => {
        setFormData((prevData : any) => ({
          ...prevData,
          [checkbox]: checked,
        }));
      }}
    />
    <label
      htmlFor={checkbox}
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      Does {checkbox} correspond to the indications?
    </label>
  </div>
))}


        </div>

        <DialogClose>
            <Button onClick={handleOnSave}> Save </Button>
        </DialogClose>
    
      </DialogContent>
    </Dialog>
  );
}



  