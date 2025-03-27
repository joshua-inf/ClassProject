import { Clinician } from '@/modals/clinicians'
import { PlusIcon } from '@heroicons/react/16/solid'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const StuffPage = () => {
    const [loading, setLoading] = useState(false)
    const [clinicianData, setClinicianData] = useState<Clinician[]>([])

    // function to get data from api
    const getClinicianData = () => {
        console.log("getting data")
        setLoading(true)
        axios.get('http://localhost:8000/api/clinicians')
            .then((res) => {
                if (res.data) {
                    console.log("success: ",res.data)
                    setClinicianData(res.data)
                }
            })
            .catch((err) => {
                console.log("err")
            })
            .finally(() => {
                setLoading(false)
            })
    }


    useEffect(() => {
        getClinicianData()
    }, [])  


    return (
        <>
            <div className='flex flex-col gap-5 p-5'>
                <div className='text-center font-bold text-2xl'>
                    List of stuff members
                </div>
                <div className='flex justify-end'>
                    <button className='flex hover:scale-[1.01] transition-all duration-300 items-center bg-blue-600 py-3 px-5 text-white rounded-md shadow-md '> <PlusIcon className='size-5' /> add members</button>
                </div>
                {
                    loading ?
                        <>
                            <div className='text-gray-800 '>
                                <div className='flex justify-center items-center'>
                                    <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                                </div>
                                <div className='text-center'>
                                    fetching data....please wait..
                                </div>
                            </div>
                        </>
                        :
                        <div>
                            <table className='w-full'>
                                <thead className='bg-gray-300'>
                                    <tr>
                                        <th>first name</th>
                                        <th>last name</th>
                                        <th>position</th>
                                        <th>email</th>
                                        <th>phone number</th>
                                        <th>actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clinicianData.map((e)=> 
                                        <tr key={e.id} className='border-b border-gray-300 hover:bg-gray-200 transition-all duration-300 cursor-pointer hover:scale-[1.01]'> 
                                            <td className='text-center'>{e.first_name}</td>
                                            <td className='text-center'>{e.last_name}</td>
                                            <td className='text-center'>{e.specialty}</td>
                                            <td className='text-center'>{e.email}</td>
                                            <td className='text-center'>{e.phone_number}</td>
                                            <td className='flex p-2 gap-2 justify-center'>
                                                <button className='bg-blue-600 py-2 px-3 text-sm flex  items-center gap-2 text-white rounded-md shadow-md '> <PlusIcon className='size-5' /> add members</button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                        </div>

                }
            </div>
        </>
    )
}
