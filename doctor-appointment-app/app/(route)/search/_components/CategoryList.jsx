"use client"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import GlobalApi from "@/app/_utils/GlobalApi";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const CategoryList = () => {
    const [categoryList, setCategoryList] = useState([]);
    const params = usePathname();
    const category = params.split("/")[2];
    useEffect(() => {
        getCategoryList();
        console.log(params)
    },[]);

    const getCategoryList = () => {
      GlobalApi.getCategory().then(resp => {
          setCategoryList(resp.data.data);
      });
    };

    return (
        <div className="h-screen mt-5 flex flex-col">
            <Command>
              <CommandInput placeholder="Type a command or search..." />
              <CommandList className="overflow-visible">
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                  {categoryList && categoryList.map((item, index) => (
                    <CommandItem key={index}>
                          <Link href={'/search/'+item?.attributes?.Name} className={`p-2 cursor-pointer flex gap-2 items-center text-[16px] text-blue-600 rounded-md w-full ${category == item.attributes.Name && 'bg-blue-100'}`}>
                              <Image src={item.attributes?.Icon?.data.attributes?.url} alt="icon" width={25} height={25}/>
                        <label>{item.attributes.Name}</label>
                      </Link>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
        </div>
    );
}

export default CategoryList;
