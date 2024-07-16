"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import GlobalApi from "../_utils/GlobalApi";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const CategorySearch = () => {
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
  getCategoryList()
},[])
  const getCategoryList = () => {
    GlobalApi.getCategory().then(resp => {
      setCategoryList(resp.data.data)
    })
  }
    return (<div className="mb-10 items-center flex flex-col gap-2">
        <h2 className="font-bold text-4xl tracking-wide">Search <span className="text-primary
        ">Doctors</span></h2>
        <h2 className="text-gray-400 text-xl">Search your Doctor ad Book Appointment in one click</h2>
      
    <div className="flex w-full mt-3 max-w-sm items-center space-x-2">
      <Input type="text" placeholder="Search" />
      <Button type="submit"><Search className="h-4 w-4"/></Button>
      </div>
      
      Display list of category
      <div  className="grid grid-cols-3 mt-5 px-5 md:grid-cols-4 lg:grid-cols-6">
          {categoryList.length >0 ? categoryList.map((item,index) =>index<6 && 
       ( <Link href={'/search/'+item.attributes.Name} key={index} className="flex flex-col text-center items-center gap-2 p-5 bg-blue-50 m-2 rounded cursor-pointer hover:scale-105 transition-all ease-in-out" > 
          <Image src={item.attributes?.Icon?.data.attributes.url} alt="icon"
          width={40} height={40}
        />
        <label className="text-blue-600 text-sm">{item.attributes?.Name}</label>
          </Link>)
        ) :
           [1,2,3,4,5,6].map((item, index) => (
             <div className="h-[130px] m-2 bg-slate-200 w-[130px] rounded-lg animate-pulse">
                </div>
                ))}
    </div>
    </div>);
}
 
export default CategorySearch;