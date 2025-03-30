'use client'
import { Clinician } from '@/modals/clinicians'
import { PlusIcon } from '@heroicons/react/16/solid'
import axios from 'axios'
import React, { FormEvent, use, useEffect, useState } from 'react'

export const StuffPage = () => {
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [clinicianData, setClinicianData] = useState<Clinician[]>([])
    const [popup, setPopup] = useState(false)
    const [success, setSuccess] = useState(false)

    const [first_name, setFirstname] = useState<string>('')
    const [last_name, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [position, setPosition] = useState<string>('')
    const [phonenummber, setPhoneNumber] = useState<string>('')
    const [passwprd, setPasswprd] = useState<string>('')


    // function to get data from api
    const getClinicianData = () => {
        console.log("getting data")
        setLoading(true)
        axios.get('http://localhost:8000/api/api/user-count/')
            .then((res) => {
                if (res.data) {
                    console.log("success: ", res.data.users)
                    setClinicianData(res.data.users)
                    setSuccess(true)
                    getClinicianData()
                }
            })
            .catch((err) => {
                console.log("err")
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const clearField = () => {
        setPasswprd('')
        setLastName('')
        setFirstname('')
        setEmail('')
        setPhoneNumber('')
        setPosition('')
    }

    const addStuff = (e: React.FormEvent<HTMLFormElement>) => {
        setLoading2(true)
        e.preventDefault();
        axios.post('http://localhost:8000/api/register-clinician/', {
            username: `${first_name}_${last_name}`,
            first_name: first_name,
            last_name: last_name,
            email: email,
            specialty: position,
            phone_number: phonenummber,
            password: passwprd
        })
            .then((res) => {
                if (res.data) {
                    console.log("success: ", res.data)
                    setPopup(false)
                    getClinicianData()
                    clearField()
                }
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setLoading2(false)
            })
    };

    useEffect(() => {
        getClinicianData()
    }, [])


    return (
        <>
            {
                popup && (
                    <>
                        <div className='fixed top-0 flex left-0 justify-center  bg-[#00000050]  items-center bottom-0 w-full z-[999]'>
                            {
                                loading2 ?
                                    <div className='flex justify-center items-center'>
                                        <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                                    </div>
                                    :
                                    <div className='bg-white md:w-1/2 w-3/4 rounded-md  absolute p-4 z-[9999]'>
                                        <form onSubmit={addStuff} className="text-sm space-y-5">
                                            {
                                                success ?
                                                    <div className='text-green-600 text-center'>
                                                        Successfully added
                                                    </div>
                                                    :
                                                    <></>
                                            }
                                            <div className="flex flex-col">
                                                <label className="text-gray-600">First name</label>
                                                <div className="border border-gray-300 rounded-lg">
                                                    <input
                                                        name="firstname"
                                                        onChange={(e: any) => setFirstname(e.target.value)}
                                                        value={first_name}
                                                        type="text"
                                                        required
                                                        placeholder="Add first name here"
                                                        className="p-2 w-full text-gray-600 outline-none"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex flex-col">
                                                <label className="text-gray-600">Last name</label>
                                                <div className="border border-gray-300 rounded-lg">
                                                    <input
                                                        name="lastname"
                                                        onChange={(e: any) => setLastName(e.target.value)}
                                                        value={last_name}
                                                        type="text"
                                                        required
                                                        placeholder="Add last name here"
                                                        className="p-2 w-full text-gray-600 outline-none"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex flex-col">
                                                <label className="text-gray-600">Specialty</label>
                                                <div className="border border-gray-300 rounded-lg">
                                                    <select onChange={(e: any) => setPosition(e.target.value)} name="position" className="p-2 w-full text-gray-600 outline-none">
                                                        <option value="">Select a role</option>
                                                        <option value="doctor">Doctor</option>
                                                        <option value="nurse">Nurse</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="flex flex-col">
                                                <label className="text-gray-600">Phone number</label>
                                                <div className="border border-gray-300 rounded-lg">
                                                    <input
                                                        name="phonenumber"
                                                        type="text" // Changed to "text" since maxLength doesn't work with "number"
                                                        maxLength={12} // Works now
                                                        value={phonenummber} // Fixed variable name
                                                        onChange={(e) => {
                                                            const input = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
                                                            if (input.length <= 12) setPhoneNumber(input);
                                                        }}
                                                        required
                                                        placeholder="Add phone number here"
                                                        className="p-2 w-full text-gray-600 outline-none"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex flex-col">
                                                <label className="text-gray-600">Email</label>
                                                <div className="border border-gray-300 rounded-lg">
                                                    <input
                                                        name="email"
                                                        type="email"
                                                        value={email}
                                                        onChange={(e: any) => setEmail(e.target.value)}
                                                        required
                                                        placeholder="Add email here"
                                                        className="p-2 w-full text-gray-600 outline-none"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex flex-col">
                                                <label className="text-gray-600">Password</label>
                                                <div className="border border-gray-300 rounded-lg">
                                                    <input
                                                        name="password"
                                                        type="password"
                                                        value={passwprd}
                                                        onChange={(e: any) => setPasswprd(e.target.value)}
                                                        required
                                                        placeholder="Add email here"
                                                        className="p-2 w-full text-gray-600 outline-none"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex gap-3">
                                                <button type="submit" className="grow bg-green-600 p-2 rounded-md text-white">
                                                    Save
                                                </button>
                                                <button onClick={() => { setPopup(false); clearField() }} type="button" className="grow bg-blue-600 p-2 rounded-md text-white">
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                            }
                        </div>

                    </>
                )
            }

            <div className='flex flex-col gap-5 p-5'>
                <div className='text-center font-bold text-2xl'>
                    List of stuff members
                </div>
                <div className='flex justify-end'>
                    <button onClick={() => setPopup(true)} className='flex hover:scale-[1.01] transition-all duration-300 items-center bg-blue-600 p-2 px-5 text-white rounded-md shadow-md '> <PlusIcon className='size-5' /> add members</button>
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
                            {
                                clinicianData.length > 0 ?
                                    <table className='w-full'>
                                        <thead className='bg-white'>
                                            <tr>
                                                <th className='text-left p-2'>name</th>
                                                <th className='text-left p-2'>position</th>
                                                <th className='text-left p-2'>id</th>
                                                <th className='text-left p-2'>email</th>
                                                <th className='text-left p-2'>contact</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {clinicianData.map((e) =>
                                                <tr key={e.id} className='border-b border-gray-300 hover:bg-gray-200 transition-all duration-300 cursor-pointer hover:scale-[1.01]'>
                                                    <td className='p-2'>{e.first_name} {e.last_name}</td>
                                                    <td className='p-2'>{e.specialty}</td>
                                                    <td className='p-2'>{e.id}</td>
                                                    <td className='p-2'>{e.email}</td>
                                                    <td className='p-2'>{e.phone_number}</td>
                                                    
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                    :
                                    <>
                                        <div className='text-center'>
                                            Couldn't pull data...
                                        </div>
                                    </>

                            }

                        </div>

                }
            </div>
        </>
    )
}
