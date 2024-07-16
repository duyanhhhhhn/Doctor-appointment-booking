"use client"
import Hero from "./_components/Hero";
import CategorySearch from "./_components/CategorySearch";
import DoctorList from "./_components/DoctorList";
import GlobalApi from "./_utils/GlobalApi";
import { useEffect, useState } from "react";

export default function Home() {
  const [doctorList, setDoctorList] = useState([]);
  useEffect(() => {
    getDoctorList();
  },[])

  const getDoctorList = () => {
    GlobalApi.getDoctorList().then((resp) => {
        setDoctorList(resp.data.data)
    })
  }
  return (
    <>
    {/* Hero Section */}
      <Hero />
      {/* Seach bar +category */}
      <CategorySearch />
      {/* Popular doctor List */}
      <DoctorList doctorList={doctorList} />
    </>
  );
}
