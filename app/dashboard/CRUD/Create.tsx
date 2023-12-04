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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import useDecodeAuthToken from "@/context/useDecodeAuthToken"



export default function YourComponent({ dataName ,
fields ,
createPath ,
 display = true ,
 preFilledData ,
 checkboxes ,
 children,
radio, resetPassword }:
   { dataName : string ,
  fields: (string| number)[] ,
  createPath:string ,
   display? :boolean ,
  preFilledData? :any ,
  checkboxes ? : string[] ,
   radio?: string | string [] ,
   children? :React.ReactNode,
   resetPassword ? : boolean }) {
  const [formData, setFormData] = useState({...preFilledData});
  const { auth } = useAuth();
  const user = useDecodeAuthToken();
  
  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormData({
      ...formData,
      [name]: value,

    });
  };
 console.log(formData)
  const handleOnSave = async () => {
    try {
        await FETCH_REQUEST(createPath, 'POST', auth.token, formData);
  
   
    } catch (error) {
        console.error(error);

    }
};

  return (
    <Dialog>
      <DialogTrigger asChild>
        { resetPassword ? (
          <Button className="bg-inherit text-gray-950 hover:bg-cyan-900 hover:text-white"> forget password ?</Button>
        ) : (
            <Button    disabled={user?.role === 'member' && createPath === 'users'}   
            className="bg-gradient-to-r from from-gray-800 to-sky-700  w-full text-white rounded-none "> {display ?  ` + New ${dataName}` : '+' }</Button>

        )}
      
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
      required={true}
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
        {/* //* This section sint quite dynamic , it concerns only the fact of adding a user */}
        {radio && (
  <RadioGroup defaultValue="member" onValueChange={(picked) => {
    setFormData((prevData: any) => ({
      ...prevData,
      role: picked ?? 'member',
    }));
  }}>
    <div className="flex flex-row justify-around">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="member" id="r1" />
        <Label htmlFor="r1">Member</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="admin" id="r2" />
        <Label htmlFor="r2">Admin</Label>
      </div>
    </div>
  </RadioGroup>
)}


        <DialogClose>

            <Button onClick={handleOnSave}> {resetPassword ? 'Reset password ' : 'Save'}  </Button>
        </DialogClose>
    
      </DialogContent>
    </Dialog>
  );
}



  