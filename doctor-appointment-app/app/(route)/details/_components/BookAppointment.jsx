import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { useEffect, useState } from "react"
import { CalendarDays, Clock } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import GlobalApi from "@/app/_utils/GlobalApi"
import { toast } from "sonner"
const BookAppointment = ({ doctor }) => {
  const [date, setDate] = useState(new Date())
  const [timeSlot,setTimeSlot]=useState();
    const [selectedTimeSlot,setSelectedTimeSlot]=useState();
  const [note, setNote] = useState();
  const { user } = useKindeBrowserClient()
  useEffect(() => {
    getTime();
    },[])
    const getTime = () => {
      const timeList = [];
      for (let i = 10; i <= 12; i++) {
          timeList.push({
              time: i + ':00 AM'
          })
          timeList.push({
              time: i + ':30 AM'
          })
      }
      for (let i = 1; i <= 6; i++) {
          timeList.push({
              time: i + ':00 PM'
          })
          timeList.push({
              time: i + ':30 PM'
          })
      }

      setTimeSlot(timeList)
    }
 
  const isPastDay = (day) => {
    return day <= new Date()
  }
  //  const saveBooking = () =>{
  //    const data = {
  //      data:{
  //         Username:user.given_name+" "+user.family_name,
  //         Email:user.email,
  //         Time:selectedTimeSlot,
  //         Date:date.toISOString(),
  //         doctors:doctor.id,
  //         Note:note
  //     }
  //    }
  //    console.log(data)
  //    GlobalApi.bookAppointment(data).then(resp => {
  //      if (resp) {
  //        GlobalApi.sendEmail(data).then(resp =>
  //          console.log(resp)
  //        )
  //        toast("Booking Confirmation sent on Email")
  //      }
  //    })
  // }
  const saveBooking = () => {
    const data = {
        data: {
            Username: user.given_name + " " + user.family_name,
            Email: user.email,
            Time: selectedTimeSlot,
            Date: date.toISOString(),
            doctors: doctor.id,
            Note: note
        }
    };
    console.log('Booking data:', data); // Log dữ liệu gửi đi

    GlobalApi.bookAppointment(data).then(resp => {
        if (resp) {
            GlobalApi.sendEmail(data).then(resp => {
                console.log('Email response:', resp); // Log phản hồi từ API gửi email
                toast("Booking Confirmation sent on Email");
            }).catch(error => {
                console.error('Error sending email:', error); // Log lỗi nếu có
            });
        }
    }).catch(error => {
        console.error('Error booking appointment:', error); // Log lỗi nếu có
    });
};

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="rounded-full">Book Appointment</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-auto">
          <DialogHeader>
            <DialogTitle>Book Appointment</DialogTitle>
            <DialogDescription>
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 mt-5">
                  {/* Calendar */}
                  <div className="flex flex-col items-baseline gap-3">
                    <h2 className="flex gap-2 items-center">
                      <CalendarDays className="text-primary h-5 w-5"/> Select Date
                    </h2>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={isPastDay}
                      className="rounded-md border"
                    />
                  </div>
                  {/* Time Slot */}
                  <div className="mt-3 md:mt-0">
                    <h2 className="flex gap-2 items-center mb-3">
                      <Clock className="text-primary h-5 w-5" />
                      Select Time Slot
                    </h2>
                    <div className="grid grid-cols-3 gap-2 border rounded-lg p-5">
                     {timeSlot?.map((item, index) => (
                      <h2 className={`p-2 border hover:bg-primary cursor-pointer hover:text-white  rounded-full ${item.time == selectedTimeSlot && 'bg-primary text-white' }`} onClick={()=> setSelectedTimeSlot(item.time)}>{item.time}</h2>
                    ))}
                    {/* Add your time slot selection logic here */}
                    </div>
                  </div>
                </div>
                   <Textarea className="mt-3" placeholder="Note" onChange={(e)=>setNote(e.target.value)} />
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild >
              <>
              <Button type="button" 
            className="text-red-500 border-red-500"
            variant="outline">
              Close
            </Button>
            <Button type="button" disabled={!(date&&selectedTimeSlot)}
            onClick={()=>saveBooking()}
            >
              Submit
            </Button>
              </>
          </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default BookAppointment
