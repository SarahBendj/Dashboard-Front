'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
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
import useDecodeAuthToken from "@/context/useDecodeAuthToken"


export default function YourComponent({ 
  dataTarget,
   fields,
   updatePath,
   signOrCheck,
   status,
   preFilledData,
   METHOD = 'PUT' ,
   PWD,
   children,
  
  }: { dataTarget: string,
     fields: string[],
     updatePath: string,
     signOrCheck?: boolean,
     preFilledData?: any,
     METHOD?: string; status?: string ,
     PWD? : boolean,
    children ?: React.ReactNode}) {
  const [formData, setFormData] = useState<any>({ ...preFilledData });
  const user = useDecodeAuthToken();


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
      const response = await FETCH_REQUEST(updatePath, status ? 'PATCH' : METHOD, auth.token, formData);
      console.log(response)
      if (response) {
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
       {!PWD ? ( <Button
          disabled={status === 'Inactive' || (user?.role === 'member' && updatePath.includes('users/delete')) || updatePath.includes('suppliers')}

          className={
            status === 'Active'
              ? 'bg-gradient-to-r from-cyan-900 to-sky-850 w-full text-white rounded-none'
              : 'bg-gradient-to-r from-yellow-900 to-sky-850 w-full text-white rounded-none'
          }
        >
          {status ?? 'Edit'}
        </Button>
        ) : (
      
        <Button className="bg-inherit font-bold rounded-none text-gray-950 hover:bg-gray-200"> Change password</Button> 
        )
     }

      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{status ? "Disabeling the " : "Editing"} <span className="font-bold text-blue-700">{dataTarget}</span></DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {status && (
            <p> You are about to revoke this member rights. This member will no longer have access to the application.

            </p>
          )}

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
            <Button type="submit" onClick={handleOnSave}> {status ? 'Drop off rights' : 'Save'}</Button>
          </DialogClose>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}



