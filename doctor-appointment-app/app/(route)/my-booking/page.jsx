"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BookingList from "./_components/BookingList";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useEffect, useState } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
const Mybooking = () => {
  const { user } = useKindeBrowserClient();
  const [bookingList, setBookingList] = useState([]);
  useEffect(() => {
       user&& getUserBookingList()
  }, [user])
  const getUserBookingList = () => {
    GlobalApi.getUserBookingList(user?.email).then(res => {
      setBookingList(res.data.data)
    })
  }
/**
 * Used to Filter User Booking
 * @param {} type 
 * @returns 
 */
  const filterUserBooking = (type) => {
    const result = bookingList.filter(item => 
      type == 'upcoming' ? new Date(item.attributes.Date) >= new Date :
        new Date(item.attributes.Date) <= new Date
    )
    return result
  }
    return (<div className="px-4 sm:px-10 mt-10">
        <h2 className="font-bold text-2xl">Mybooking</h2>
        <Tabs defaultValue="account" className="w-full mt-5">
  <TabsList className="w-full justify-start">
    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
    <TabsTrigger value="expired">Expired</TabsTrigger>
  </TabsList>
        <TabsContent value="upcoming" ><BookingList bookingList={filterUserBooking('upcoming')} expired={false} updateRecord={() => getUserBookingList()} /></TabsContent>
  <TabsContent value="expired" ><BookingList  bookingList={filterUserBooking('expired')} expired={true} updateRecord={() => getUserBookingList()}/></TabsContent>
</Tabs>

        </div>);
}
 
export default  Mybooking;