"use client"
import { LoginLink, LogoutLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button";

const Header = () => {
    const Menu = [
        {
        id: 1,
        name: "Home",
        path: '/'
        },
          {
        id: 2,
        name: "Explore",
        path: '/Explore'
        
        },
        {
        id: 3,
        name: "Contact",
        path: '/Contact'
        
        },
    ]
    const { user } = useKindeBrowserClient();

    useEffect(() => {
    },[user])
    return (<div className="flex items-center justify-between p-4 shadow-sm">
        <div className="flex items-center gap-10">
             <Image src='/logo.svg' alt="logo" width={180} height={80} />
        <ul className="md:flex gap-8 hidden"> 
                {Menu.map((item, index) => 
                    <Link href={item.path}  key={index}>
                    <li className="hover:text-primary cursor-pointer hover:scale-75 transition-all ease-in-out" >{item.name}</li>
                    </Link>
                    )}
        </ul>
        </div>
        {user ?
            <>
                <Popover>
                        <PopoverTrigger>
                            <Image src={user?.picture} alt="profile-image" width={50} height={50} className="rounded-full" />
                        <PopoverContent className="w-44">
                            <ul className="flex flex-col gap-2">
                                <li className="cursor-pointer hover:bg-slate-100 p-2 rounded-md">Profile</li>
                                <li className="cursor-pointer hover:bg-slate-100 p-2 rounded-md">My booking</li>
                                <li className="cursor-pointer hover:bg-slate-100 p-2 rounded-md"><LogoutLink>Logout</LogoutLink></li>
                            </ul>
                </PopoverContent>
                </PopoverTrigger>
                </Popover>
                {/* <Button variant="outline">Logout</Button> */}

            </>
            : 
        <LoginLink>
        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Login</button>
        </LoginLink>}
        
    </div>);
}
 
export default Header;