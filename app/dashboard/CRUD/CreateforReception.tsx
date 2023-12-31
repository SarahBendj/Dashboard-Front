
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
import { FormEvent, useEffect, useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import useNotification from "@/hook/useNotification"
import { GoodsITC, SupplierITC } from "@/TYPES.ts/creationData";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

  

export default function YourComponent({ dataName ,fields ,createPath , display = true , preFilledData , checkboxes , selectData }:
   { dataName : string ,fields: (string| number)[] ,createPath:string , display? :boolean ,preFilledData? :any ,checkboxes ? : string[] , selectData? : string}) {

    const { showError, showSucess } = useNotification();
    const { auth } = useAuth();
    const [goods, setGoods] = useState<GoodsITC[]>([]);
    const [suppliers, setSuppliers] = useState<SupplierITC[]>([]);
    const [formData, setFormData] = useState({...preFilledData,
      supplier_id: 0 ,
      goods_id: 0 ,
     });

useEffect(() => {
        const fetchData = async () => {
          try {
            const goodsData = await FETCH_REQUEST('goods', 'GET', auth.token);
            const suppliersData = await FETCH_REQUEST('suppliers', 'GET', auth.token);
    
            setGoods(goodsData);
            setSuppliers(suppliersData);
          } catch (error) {
            console.error(error);
          }
        };
        fetchData();
      }, [auth.token]);

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
        showSucess('Successfully filled')
   
    } catch (error) {
        console.error(error);
        showError('Something went wrong,please try again')
    }
};

  return (
    <>
    <Dialog>
      <DialogTrigger asChild>
        <Button  className="bg-gradient-to-r from from-gray-800 to-sky-700  w-full text-white" > {display ?  ` + New ${dataName}` : '+' }</Button>
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
            
                <div className="flex flex-col">
              <div className="my-2">
              <Select onValueChange={(value) => setFormData((prev : any) => ({ ...prev, supplier_id: Number(value) }))}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Suppliers</SelectLabel>
                      {suppliers.map((supplier) => (
        
                        <SelectItem
                          key={supplier.id}
                          value={(supplier.id).toString()}
                        >
                          {supplier.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
        
              <div className="my-2">
                
              <Select onValueChange={(value) => setFormData((prev : any) => ({ ...prev, goods_id: Number(value) }))}>

                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Good" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Goods</SelectLabel>
                      {goods.map((good) => (
                        <SelectItem
                          key={good.id}
                          value={(good.id).toString()}
                        >
                          {good.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              </div>
      
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
    </>
  );
}



  
    