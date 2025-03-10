import React, { useState } from 'react'
import { ClockLoader } from 'react-spinners';
import { FaGraduationCap, FaChartLine, FaUsers, FaClock, FaCalendarCheck, FaCheckCircle, FaTimesCircle, FaStethoscope, FaHeartbeat } from 'react-icons/fa';
import { MdTrendingUp, MdTrendingDown } from 'react-icons/md';
import { FaPeopleGroup } from 'react-icons/fa6';

export const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    return (
        <div className='text-gray-800 flex flex-col gap-4 dark:text-gray-300'>
            <div className='flex gap-4 flex-wrap'>
                <div className='bg-gradient-to-r grow cursor-pointer from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition-all duration-200'>
                    <div className='flex justify-between items-center mb-4'>
                        <FaPeopleGroup className='text-4xl opacity-80' />
                        <div className='bg-blue-400 bg-opacity-30 dark:bg-blue-500 dark:bg-opacity-30 p-2 rounded-lg'>
                            <MdTrendingUp className='text-xl' />
                        </div>
                    </div>
                    <h3 className='text-lg opacity-80'>Total Patients</h3>
                    {!loading ? (
                        <ClockLoader size={20} color="white" />
                    ) : (
                        <p className='text-3xl font-bold'>0</p>
                    )}
                </div>


                {/* APointments */}
                <div className='bg-gradient-to-r grow cursor-pointer flex flex-col gap-2 from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition-all duration-200'>
                    <div className='flex justify-between items-center mb-4'>
                        <FaCalendarCheck className='text-4xl opacity-80' />
                    </div>
                    <h3 className='text-lg opacity-80'>Appointments</h3>
                    <div className='flex gap-3'>
                        <div className='flex flex-col justify-center items-center gap-1'>
                            <div className='flex items-center gap-2'>
                                <FaClock />
                                <p className='text-sm opacity-80'>Pending</p>
                            </div>
                            <p className='text-2xl font-bold  opacity-80'>0</p>
                        </div>
                        <div className='flex flex-col justify-center items-center gap-1'>
                            <div className='flex items-center gap-2'>
                                <FaCheckCircle />
                                <p className='text-sm opacity-80'>Completed</p>
                            </div>
                            <p className='text-2xl font-bold  opacity-80'>0</p>
                        </div>
                        <div className='flex  flex-col justify-center items-center gap-1'>
                            <div className='flex items-center gap-2'>
                                <FaTimesCircle className='' />
                                <p className='text-sm  opacity-80'>Cancelled</p>
                            </div>
                            <p className='text-2xl font-bold  opacity-80'>0</p>
                        </div>
                    </div>
                </div>

                {/* Total Diagnosis */}
                <div className='cursor-pointer grow bg-gradient-to-r from-orange-400 to-pink-500 dark:from-orange-600 dark:to-pink-700 rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition-all duration-200'>
                    <div className='flex justify-between items-center mb-4'>
                        <FaStethoscope className='text-4xl opacity-80' />
                        <div className='bg-blue-400 bg-opacity-30 dark:bg-blue-500 dark:bg-opacity-30 p-2 rounded-lg'>
                            <MdTrendingUp className='text-xl' />
                        </div>
                    </div>
                    <h3 className='text-lg opacity-80'>Total Diagnosis</h3>
                    {!loading ? (
                        <ClockLoader size={20} color="white" />
                    ) : (
                        <p className='text-3xl font-bold'>0</p>
                    )}
                </div>
            </div>
            <div className='flex flex-wrap gap-4'>
                {/* Common illnesses */}
                <div className='cursor-pointer grow bg-gradient-to-r from-purple-500 to-indigo-500 dark:from-purple-600 dark:to-indigo-700 rounded-xl p-6 text-white shadow-lg transform transition-all duration-200'>
                    <div className='flex justify-between items-center mb-4'>
                        <FaHeartbeat className='text-4xl opacity-80' />
                    </div>
                    <h3 className='text-lg opacity-80'>Common Illnesses</h3>
                    <div>
                        <div className='flex flex-col gap-2'>
                            {/* title */}
                            <div className='flex justify-between p-2 rounded-lg items-center gap-2'>
                                <p className='text-sm opacity-80'>Illness</p>
                                <p className='text-sm opacity-80'>Count</p>
                            </div>
                            <hr />
                            {/* illnesses */}
                            <div className='flex justify-between bg-white bg-opacity-20 p-2 rounded-lg items-center gap-2'>
                                <p className='text-2xl opacity-80'>Malaria</p>
                                <p className='text-2xl opacity-80'>300</p>
                            </div>
                            <div className='flex justify-between bg-white bg-opacity-20 p-2 rounded-lg items-center gap-2'>
                                <p className='text-sm opacity-80'>Cough</p>
                                <p className='text-sm opacity-80'>{Math.floor(Math.random() * 100) + 1}</p>
                            </div>
                            <div className='flex justify-between bg-white bg-opacity-20 p-2 rounded-lg items-center gap-2'>
                                <p className='text-sm opacity-80'>Cold</p>
                                <p className='text-sm opacity-80'>{Math.floor(Math.random() * 100) + 1}</p>
                            </div>
                            <div className='flex justify-between bg-white bg-opacity-20 p-2 rounded-lg items-center gap-2'>
                                <p className='text-sm opacity-80'>Fever</p>
                                <p className='text-sm opacity-80'>{Math.floor(Math.random() * 100) + 1}</p>
                            </div>
                            <div className='flex justify-between bg-white bg-opacity-20 p-2 rounded-lg items-center gap-2'>
                                <p className='text-sm opacity-80'>Flu</p>
                                <p className='text-sm opacity-80'>{Math.floor(Math.random() * 100) + 1}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
