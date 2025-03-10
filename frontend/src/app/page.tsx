'use client'
import { Dashboard } from "@/components/Dashboard/Dashboard";
import NavigationLayout from "@/components/Navigation/NavigationLayout";
import axios from "axios";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  // useEffect(()=>{
  //   axios.get('http://localhost:5000/')
  //   .then((res)=>{
  //     console.log('cool')
  //   })
  //   .catch((err)=> {
  //     console.log(err)
  //   })
  //   .finally(()=>{

  //   })
  // },[])
  return (
    <>
      <div>
      <NavigationLayout>
        <Dashboard/>
      </NavigationLayout> 
      </div>
    </>
  );
}
