'use client'
import { visits } from '@/modals/visit';
import Link from 'next/link';
import React, { useState } from 'react'
import { BiArrowBack } from 'react-icons/bi';
import { FaUser } from 'react-icons/fa'

    export const PatientDetails = () => {
    const [visits, setVisits] = useState<visits[]>([]);
  return (
    <div className='flex flex-col gap-5 p-5'>
        <div className='flex justify-between '>
            <Link href="/patients" className='bg-gray-200 items-center flex hover:scale-[1.01] transition-all duration-300 p-2 px-5 rounded-md'>
                <BiArrowBack className='' />
            </Link>
            <button className='bg-gray-200 hover:scale-[1.01] transition-all duration-300 p-2 px-5 rounded-md'>
                Add visit
            </button>
        </div>
        <div>
            <div className='flex flex-wrap items-center gap-2'>
                <div  className='flex grow-0 p-3 shadow-md rounded-md bg-gray-200  cursor-pointer flex-col gap-2'> 
                <div>
                        User Details
                    </div>
                    <div className='flex items-center gap-2'>
                        <FaUser className='text-gray-500 size-10'/>
                        <div className='flex flex-col text-sm font-light'>
                            <div>user name</div>
                            <div>user id</div>  
                            <div>user email</div>  
                        </div>
                    </div>
                </div>

                {/* visit history */}
                <div className='flex flex-col grow gap-2 shadow-md rounded-md bg-gray-200 p-3  cursor-pointer'>
                    <div>
                        Visit History
                    </div>
                    <hr className='border-gray-300' />   
                    {visits ? 
                        <div>
                            <div>
                                <table className=' w-full border-spacing-1 border '>
                                    <thead>
                                        <tr className=''>
                                            <th className='px-3'>Visit Date</th>
                                            <th className='px-3'>Visit Type</th>
                                            <th className='px-3'>Reason for Visit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        
                                        {visits.map((visit) => (
                                            <tr className='border-b border-gray-300 bg-gray-500'>
                                                <td className='text-center text-white'>{visit.created_at}</td>
                                                <td className='text-center text-white'>{visit.visit_type}</td>
                                                <td className='text-center text-white'>{visit.visit_type}</td>
                                            </tr>
                                        ))}
                                        <tr className='border-b border-gray-300 bg-gray-300'>
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
  )
}
