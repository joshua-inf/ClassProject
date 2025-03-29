'use client'
import { visits } from '@/modals/visit';
import { Diagnosis } from '@/modals/Diagnosis';
import React, { useState } from 'react'
import { BiArrowBack } from 'react-icons/bi';
import axios from 'axios';

export const PatientDetails = ({ data, setSeachResult, func }: { data: any, setSeachResult: any, func: (any: any) => any }) => {
    const [visits, setVisits] = useState<visits[]>([]);
    const [medicalHistory, setMedicalHistory] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);


    const deleteData = () => {
        setLoading2(true)
        axios.delete('http://localhost:8000/api/patient/' + data.patient_id + '/')
            .then((res) => {
                console.log(data.patient_id)
                func(1)
                setSeachResult()
                if (res) {
                }
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setLoading2(false)
            })
    }


    const getVisits = () => {
        axios.get('')
    }
    return (
        <>
            {/* user medical history */}
            {
                medicalHistory && (
                    <div className='fixed top-0 left-0 flex justify-center items-center w-full h-full bg-black bg-opacity-50 z-50'>
                        <div className='bg-white md:w-1/2 w-3/4 p-5 flex flex-col gap-5  rounded-md'>
                            <div>
                                User Medical History
                                <hr className='border-gray-300' />
                            </div>
                            <div>
                                <div>
                                    Visit details:
                                </div>
                                <div>
                                    {diagnosis.map((diagnosis) => (
                                        <div>
                                            <i>
                                                {diagnosis.diagnosis}
                                            </i>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div>
                                    Diagnosis:
                                </div>
                                <div>
                                    {diagnosis.map((diagnosis) => (
                                        <div>
                                            <i>
                                                {diagnosis.diagnosis}
                                            </i>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div>
                                    Prescription:
                                </div>
                                <div>

                                </div>
                            </div>
                            <div>

                                <button onClick={() => setMedicalHistory(false)} className='bg-gray-200 w-full hover:scale-[1.01] transition-all duration-300 p-2 px-2 rounded-md'>close</button>
                            </div>
                        </div>
                    </div>
                )
            }
            <div className='flex flex-col gap-5 p-5'>
                <div className='flex justify-between '>
                    <div onClick={() => func(1)} className='bg-white items-center flex hover:scale-[1.01] transition-all duration-300 p-2 px-5 rounded-md'>
                        <BiArrowBack className='' />
                    </div>
                    <button onClick={() => deleteData()} className='bg-red-300 hover:scale-[1.01] transition-all duration-300 p-2 px-5 rounded-md'>
                        delete
                    </button>
                </div>
                <div>
                    <div className='space-y-2'>
                        <div className='flex grow-0 p-3    cursor-pointer flex-col gap-2'>
                            <div>
                                User Details
                            </div>
                            <hr className='border-gray-300' />
                            <div className='flex items-center gap-2'>
                                <div className="p-4 border rounded-lg shadow-md bg-white text-sm font-light">
            {/* Patient Name and ID */}
            <div className="font-medium text-base mb-2">
                {data.first_name} {data.last_name}
            </div>

            {/* Grid Layout for Details */}
            <div className="grid grid-cols-2 gap-4">
                {/* Left Column */}
                <div className="space-y-1">
                    <div className="text-gray-600">Patient ID: {data.patient_id}</div>
                    <div className="text-gray-600">Date of Birth: {data.dob}</div>
                    <div className="text-gray-600">Gender: {data.gender}</div>
                    <div className="text-gray-600">Patient Type: {data.patient_type}</div>
                </div>

                {/* Right Column */}
                <div className="space-y-1">
                    <div className="text-gray-600">Email: {data.email}</div>
                    <div className="text-gray-600">Phone: {data.phone_number}</div>
                    <div className="text-gray-600">Address: {data.address}</div>
                </div>
            </div>
        </div>
                            </div>
                        </div>

                        {/* visit history */}
                        <div className='flex hidden flex-col grow gap-2 shadow-md rounded-md bg-white p-3  cursor-pointer'>
                            <div>
                                Visit History
                            </div>
                            <hr className='border-gray-300' />
                            {visits ?
                                <div>
                                    <div>
                                        <table className=' w-full '>
                                            <thead>
                                                <tr className=''>
                                                    <th className='px-3'>Visit Date</th>
                                                    <th className='px-3'>Visit Type</th>
                                                    <th className='px-3'>Reason for Visit</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {visits.map((visit) => (
                                                    <tr onClick={() => setMedicalHistory(true)} className=''>
                                                        <td className='text-center text-white'>{visit.created_at}</td>
                                                        <td className='text-center text-white'>{visit.visit_type}</td>
                                                        <td className='text-center text-white'>{visit.visit_type}</td>
                                                    </tr>
                                                ))}
                                                <tr onClick={() => setMedicalHistory(true)} className=' bg-gray-100'>
                                                    <td className='text-center '>data</td>
                                                    <td className='text-center '>data</td>
                                                    <td className='text-center '>data</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                :
                                <>
                                    <div className='text-center text-gray-500'>
                                        No visits yet
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
