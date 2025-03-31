'use client'
import { patients } from '@/modals/patients'
import { PlusIcon } from '@heroicons/react/16/solid'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaArrowRight, FaSearch, FaUser } from 'react-icons/fa'
import { PatientDetails } from './details/PatientDetails'

export const Patients = () => {
    const [search, setSearch] = useState('')
    const [patients, setPatients] = useState([])
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [error, setError] = useState(null)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [totalPatients, setTotalPatients] = useState<any>()
    const [popup, setPopup] = useState(false)
    const [success, setSuccess] = useState(false)

    const [pageNumber, setPageNuber] = useState(1)


    const [first_name, setFirstname] = useState<string>('')
    const [last_name, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [phonenummber, setPhoneNumber] = useState<string>('')
    const [DOB, setDOB] = useState<string>('')
    const [patientType, setPatientType] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [gender, setGender] = useState('')

    const [searchData, setSearchData] = useState('')
    const [seachResult, setSeachResult] = useState<patients>()

    const [parsedData, setParsedData] = useState<patients>();


    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        serchUser()
    }

    const serchUser = () => {
        setLoading(true)
        axios.get('http://localhost:8000/api/patient/' + searchData)
            .then((res) => {
                console.log("Seccess: ", res.data)
                setSeachResult(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const clearFields = () => {
        setFirstname('');
        setLastName('');
        setEmail('');
        setPhoneNumber('');
        setDOB('');
        setPatientType('');
        setAddress('');
        setGender('');
    };


    const addUSer = () => {
        setLoading2(true)
        axios.post('http://localhost:8000/api/patients/', {
            first_name: first_name,
            last_name: last_name,
            dob: DOB,
            gender: gender,
            phone_number: phonenummber,
            email: email,
            patient_type: patientType,
            address: address,
            emergency_contact_name: "Peter Mwale",
            emergency_contact_phone: "+260977654321"
        })
            .then((res) => {
                console.log(res)
                if (res) {
                    setSuccess(true)
                    clearFields()
                    getUser()
                }
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setLoading2(false)
            })
    }

    const getUser = () => {
        setLoading(true)
        axios.get('http://localhost:8000/api/patients/')
        .then((res)=> {
            console.log(res.data)
            setTotalPatients(res.data)
        })
        .catch((err)=> {
            console.log(err)
        })
        .finally(()=>{
            setLoading(false)
        })
    }

 

    useEffect(()=>{
        getUser()
    },[])

    if (pageNumber == 1) {
        return (
            <>
                {
                    popup ?
                        <div className='fixed top-0 flex left-0 justify-center bg-[#00000050] items-center bottom-0 w-full z-[999]'>
                            {
                                loading2 ?
                                    <div className='flex justify-center items-center'>
                                        <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                                    </div>
                                    :
                                    <div className='bg-white md:w-1/2 w-3/4 rounded-md  absolute p-4 z-[9999]'>
                                        <form onSubmit={addUSer} className="text-sm space-y-5">
                                            {
                                                success ?
                                                    <div className='text-green-600 text-center'>
                                                        Successfully added
                                                    </div>
                                                    :
                                                    <></>
                                            }
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
                                                        <select onChange={(e: any) => setGender(e.target.value)} name="position" className="p-2 w-full text-gray-600 outline-none">
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
                                                            <option value="Student">student</option>
                                                            <option value="otheInpatient">other</option>
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
                                                <button onClick={() => { setPopup(false); clearFields() }} type="button" className="grow bg-blue-600 p-2 rounded-md text-white">
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                            }
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
                                onChange={(e) => setSearchData(e.target.value)}
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
                                    {/* <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div> */}
                                </div>
                                <div className='text-center'>
                                    fetching data....please wait..
                                </div>
                            </div>
                        ) 
                        :
                            <>
                                {
                                    seachResult ? (
                                        <div>
                                            <div className='flex flex-col gap-2 py-5'>
                                                <div onClick={() => setPageNuber(2)} className='rounded-md shadow p-2 px-5 cursor-pointer hover:scale-[1.01] transition-all duration-300 justify-between flex bg-white items-center gap-2'>
                                                    <div className='flex items-center gap-2'>
                                                        <FaUser className='text-gray-500 size-7' />
                                                        <div className='flex flex-col'>

                                                            <div className='text-sm font-bold'>{seachResult?.first_name} {seachResult?.last_name}</div>
                                                            <div className='text-sm font-light'>{seachResult?.patient_id}</div>
                                                        </div>
                                                    </div>
                                                    <FaArrowRight className='text-gray-500 size-5' />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                    :
                                    totalPatients ? 
                                        <>
                                         <div>
                                            <div className='flex flex-col gap-2 py-5'>
                                                {totalPatients.map((e:patients)=>
                                                    <div key={e.patient_id} onClick={() => {setParsedData(e);setPageNuber(2)}} className='rounded-md shadow p-2 px-5 cursor-pointer hover:scale-[1.01] transition-all duration-300 justify-between flex bg-white items-center gap-2'>
                                                        <div className='flex items-center gap-2'>
                                                            <FaUser className='text-gray-500 size-7' />
                                                            <div className='flex flex-col'>
                                                                <div className='text-sm font-bold'>{e.first_name} {e.last_name}</div>
                                                                <div className='text-sm font-light'>{e.patient_id}</div>
                                                            </div>
                                                        </div>
                                                        <FaArrowRight className='text-gray-500 size-5' />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        </>
                                    :
                                    <></>
                                }
                            </>
                        }
                    </div>
                </div>
            </>
        )
    } else if (pageNumber == 2) {
        return (
            <PatientDetails setSeachResult={setParsedData} func={setPageNuber} data={parsedData} />
        )

    }

}
