'use client'
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

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setPatients([])
        setTotalPatients(0)
    }
    return (
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
                        className="w-full pl-10 pr-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                </form>
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
                            <Link href={'/patients/details'} className='rounded-md shadow p-2 px-5 cursor-pointer hover:scale-[1.01] transition-all duration-300 justify-between flex bg-gray-200 items-center gap-2'>
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
    )
}
