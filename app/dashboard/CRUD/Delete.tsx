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
import { useAuth } from "@/context/useAuth"
import { FETCH_REQUEST } from "@/lib/fetching"
import useNotification from "@/hook/useNotification"


export default function YourComponent({ dataTarget  ,deletePath }: {  dataTarget : string ,deletePath:string }) {
  const { showError, showSucess } = useNotification();
  const { auth } = useAuth();

  const handleOnDelete = async () => {
    try {
        await FETCH_REQUEST(deletePath, 'DELETE', auth.token);
        showSucess('Successfully deleted')
    } catch (error) {
        console.error(error);
        showError('Something went wrong,please try again')
    }
};

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button  className="bg-gradient-to-r from-orange-900 to-sky-850  w-full text-white rounded-none "> Delete </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle> <p>You are about to delete : <span className="font-bold text-red-700">{dataTarget}</span>  </p> </DialogTitle>
        </DialogHeader>
        <DialogClose>
            <Button onClick={handleOnDelete}> Delete </Button>
        </DialogClose>
    
      </DialogContent>
    </Dialog>
  );
}