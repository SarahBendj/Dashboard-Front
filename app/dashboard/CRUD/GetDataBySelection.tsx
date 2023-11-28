'use client'
import React, { useEffect, useState } from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FETCH_REQUEST } from "@/lib/fetching"
import { useAuth } from "@/context/useAuth"
import { GoodsITC, SupplierITC } from "@/TYPES.ts/creationData"

export interface SelectionDataItc {
  supplier_id: number;
  goods_id: number;
}

interface SelectDataProps {
  onDataSelected: (selectedItems: SelectionDataItc) => void;
}

export default function SelectData({ onDataSelected }: SelectDataProps) {
  const { auth } = useAuth();
  const [goods, setGoods] = useState<GoodsITC[]>([]);
  const [suppliers, setSuppliers] = useState<SupplierITC[]>([]);
  const [selectedItems, setSelectedItems] = useState<SelectionDataItc>({
    supplier_id: 0,
    goods_id: 0,
  });

  console.log("Selected Items:", selectedItems);

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


  return (
    <div className="flex flex-col">
      <div className="my-2">
      <Select onValueChange={(value) => setSelectedItems((prevItems) => ({ ...prevItems, supplier_id: Number(value) }))}>
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
        <Select
          onValueChange={(value) =>  setSelectedItems((prevItems) => ({ ...prevItems, goods_id: Number(value) }));
          onDataSelected({ selectedItems.goods_id: Number(value) });
          }
         >
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
  );
}
