'use client' 
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/useAuth"
import { FETCH_REQUEST } from "@/lib/fetching"
import { FormEvent, useState } from "react"
import useNotification from "@/hook/useNotification"


export default function YourComponent({  dataTarget,fields ,updatePath , signOrCheck , preFilledData , METHOD ='PUT'}:
   { dataTarget: string ,fields: string[] ,updatePath:string , signOrCheck? : boolean ,  preFilledData? :any , METHOD ?:string }) {
  const [formData, setFormData] = useState<any>({ ...preFilledData })

 
  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

console.log(formData)
  const { showError, showSucess } = useNotification();
  const { auth } = useAuth();
  
  const handleOnSave = async () => {
    try {
       const response = await FETCH_REQUEST(updatePath, METHOD, auth.token, formData);
       console.log(response)
       if( response) {
        showSucess('Successfully filled')
       } else {
        showError('Something went wrong,please try again')

       }
    
   
    } catch (error) {
      console.error(error);
      showError('Something went wrong,please try again')
    }
};
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-yellow-900 to-sky-850  w-full text-white rounded-none"> Edit </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editing  <span className="font-bold text-blue-700">{dataTarget}</span></DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
      
        {fields.map((field) => (
        <div key={field}>
             <Label htmlFor="name" className="text-right">
              {field}
            </Label>
            <Input 
      
            type="text"
            name={field}
            value={formData[field]}
            onChange={handleInputChange}
          />
        </div>
      ))
        }
        </div>
        
        {signOrCheck && (
  <div>
    <div>You are about to change the {dataTarget} state</div>
    <Checkbox>I assume changing the state</Checkbox>
  </div>
)}

       
        <DialogFooter>
        <DialogClose asChild>
        <Button type="submit" onClick={handleOnSave}>Save</Button>
          </DialogClose>
       
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}



  