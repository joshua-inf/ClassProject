'use client'
import { PlusIcon } from '@heroicons/react/16/solid'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaArrowRight, FaSearch, FaUser } from 'react-icons/fa'

export const Patients = () => {
    const [search, setSearch] = useState('')
    const [patients, setPatients] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [totalPatients, setTotalPatients] = useState(0)
    const [popup, setPopup] = useState(false)


    const [first_name, setFirstname] = useState<string>('')
    const [last_name, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [position, setPosition] = useState<string>('')
    const [phonenummber, setPhoneNumber] = useState<string>('')
    const [DOB, setDOB] = useState<string>('')
    const [patientType, setPatientType] = useState<string>('')
    const [address, setAddress] = useState<string>('')


    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setPatients([])
        setTotalPatients(0)
    }
    return (
        <>
            {
                popup ?
                    <div className='fixed top-0 flex left-0 justify-center items-center bottom-0 w-full z-[999]'>
                        <div className='absolute top-0 left-0 bottom-0 w-full  bg-[#00000050] '>
                        </div>
                        <div className='bg-white md:w-1/2 w-3/4 rounded-md  absolute p-4 z-[9999]'>
                            <form className="text-sm space-y-5">
                            <div className='flex gap-2'>
                                <div className="flex grow flex-col">
                                    <label className="text-gray-600">First name</label>
                                    <div className="border border-gray-300 rounded-lg">
                                        <input
                                            name="firstname"
                                            onChange={(e: any) => setFirstname(e.target.value)}
                                            type="text"
                                            required
                                            placeholder="Add first name here"
                                            className="p-2 w-full text-gray-600 outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="flex grow flex-col">
                                    <label className="text-gray-600">Last name</label>
                                    <div className="border border-gray-300 rounded-lg">
                                        <input
                                            name="lastname"
                                            onChange={(e: any) => setLastName(e.target.value)}
                                            type="text"
                                            required
                                            placeholder="Add last name here"
                                            className="p-2 w-full text-gray-600 outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                                <div className='flex gap-2'>
                                    <div className="flex grow flex-col">
                                        <label className="text-gray-600">Gender</label>
                                        <div className="border border-gray-300 rounded-lg">
                                            <select onChange={(e: any) => setPosition(e.target.value)} name="position" className="p-2 w-full text-gray-600 outline-none">
                                                <option value="">Select a Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Femle</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex grow flex-col">
                                        <label className="text-gray-600">Patient Type</label>
                                        <div className="border border-gray-300 rounded-lg">
                                            <select value={patientType} onChange={(e: any) => setPatientType(e.target.value)} name="position" className="p-2 w-full text-gray-600 outline-none">
                                                <option value=""></option>
                                                <option value="Student">Student</option>
                                                <option value="other">other</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <div className="flex grow flex-col">
                                        <label className="text-gray-600">Phone number</label>
                                        <div className="border border-gray-300 rounded-lg">
                                            <input
                                                name="phonenumber"
                                                type="number"
                                                maxLength={12}
                                                onChange={(e: any) => setPhoneNumber(e.target.value)}
                                                required
                                                placeholder="Add phone number here"
                                                className="p-2 w-full text-gray-600 outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex grow flex-col">
                                        <label className="text-gray-600">Email</label>
                                        <div className="border border-gray-300 rounded-lg">
                                            <input
                                                name="email"
                                                type="email"
                                                onChange={(e: any) => setEmail(e.target.value)}
                                                required
                                                placeholder="Add email here"
                                                className="p-2 w-full text-gray-600 outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-gray-600">Date of birth</label>
                                    <div className="border border-gray-300 rounded-lg">
                                        <input
                                            name="date"
                                            type="date"
                                            value={DOB}
                                            onChange={(e: any) => setDOB(e.target.value)}
                                            required
                                            placeholder="Add email here"
                                            className="p-2 w-full text-gray-600 outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="flex grow flex-col">
                                        <label className="text-gray-600">address</label>
                                        <div className="border border-gray-300 rounded-lg">
                                            <input
                                                name="address"
                                                type="text"
                                                onChange={(e: any) => setAddress(e.target.value)}
                                                required
                                                value={address}
                                                placeholder="Add address here"
                                                className="p-2 w-full text-gray-600 outline-none"
                                            />
                                        </div>
                                    </div>

                                <div className="flex gap-3">
                                    <button type="submit" className="grow bg-green-600 p-2 rounded-md text-white">
                                        Save
                                    </button>
                                    <button onClick={() => setPopup(false)} type="button" className="grow bg-blue-600 p-2 rounded-md text-white">
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    :
                    <></>

            }
            <div className='flex flex-col  p-5'>

                <div className='flex justify-center'>
                    <form onSubmit={onFormSubmit} className="relative w-50">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <FaSearch className="text-gray-500" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search users..."
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                    </form>
                </div>
                <div className='flex justify-end'>
                    <button onClick={() => setPopup(true)} className='flex hover:scale-[1.01] transition-all duration-300 items-center bg-blue-600 p-2 px-5 text-white rounded-md shadow-md '> <PlusIcon className='size-5' /> add members</button>
                </div>

                <div>
                    {loading ? (
                        <div className='text-gray-800 '>
                            <div className='flex justify-center items-center'>
                                <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                            </div>
                            <div className='text-center'>
                                fetching data....please wait..
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className='flex flex-col gap-2 py-5'>
                                <Link href={'/patients/details'} className='rounded-md shadow p-2 px-5 cursor-pointer hover:scale-[1.01] transition-all duration-300 justify-between flex bg-white items-center gap-2'>
                                    <div className='flex items-center gap-2'>
                                        <FaUser className='text-gray-500 size-7' />
                                        <div className='flex flex-col'>
                                            <div className='text-sm font-bold'>name</div>
                                            <div className='text-sm font-light'>id</div>
                                        </div>
                                    </div>
                                    <FaArrowRight className='text-gray-500 size-5' />
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
