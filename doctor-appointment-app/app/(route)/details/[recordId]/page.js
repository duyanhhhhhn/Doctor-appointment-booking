"use client"
import GlobalApi from "@/app/_utils/GlobalApi"
import { useEffect, useState } from "react"
import DoctorDetails from "../_components/DoctorDetails";
import DoctorSuggestionList from "../_components/DoctorSuggestionList";

const Details = ({ params }) => {
    const [doctor, setDoctor] = useState();
    useEffect(() => {
        getDoctorById();
    },[])
    const getDoctorById = () => {
        GlobalApi.getDoctorbyId(params.recordId).then(resp => 
            setDoctor(resp.data.data)
        )
    }
    return (<div className="p-5 md:px-20">
        <h2 className="font-bold text-[2 2px]">
        Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4">
            {/* Doctor detail */}
            <div className="col-span-3">
                {doctor && <DoctorDetails doctor={doctor} />}
            </div>
            <div>
                {/* Doctor Suggestion */}
                <DoctorSuggestionList/>
            </div>

        </div>
    </div>
    );
}
 
export default Details;