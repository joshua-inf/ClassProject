import React, { useEffect, useState } from 'react'
import { ClockLoader } from 'react-spinners';
import { FaGraduationCap, FaChartLine, FaUsers, FaClock, FaCalendarCheck, FaCheckCircle, FaTimesCircle, FaStethoscope, FaHeartbeat, FaLungs, FaVirus } from 'react-icons/fa';
import { MdTrendingUp, MdTrendingDown } from 'react-icons/md';
import { FaPeopleGroup, FaVirusCovid } from 'react-icons/fa6';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, Typography, useTheme, Stack, Box } from '@mui/material';
import axios from 'axios';

type DayData = {
    male: number;
    female: number;
};

type WeekData = {
    [key in 'Sat' | 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri']: DayData;
};

type Data = {
    total_patients: number,
    total_visits: number,
    total_prescriptions: number
}

export const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<Data>({
        total_patients: 0,
        total_visits: 0,
        total_prescriptions: 0,
    })
    const theme = useTheme();

    const admissionData: WeekData = {
        'Sat': { male: 450, female: 220 },
        'Sun': { male: 320, female: 100 },
        'Mon': { male: 300, female: 220 },
        'Tue': { male: 450, female: 350 },
        'Wed': { male: 150, female: 220 },
        'Thu': { male: 380, female: 220 },
        'Fri': { male: 400, female: 320 },
    };

    const fetchData = async () => {
         axios.get('http://localhost:8000/api/statistics/')
         .then((res) => {
            setData(res.data)
            console.log(res.data)
         })
         .catch((err) => {
            console.log(err)
         })
    }

    // Transform data for Recharts
    const chartData = Object.entries(admissionData).map(([day, data]) => ({
        day,
        Male: data.male,
        Female: data.female
    }));

    useEffect(()=>{
        fetchData()
    },[])

    return (
        <div className='text-gray-800 p-5 flex flex-col gap-4 '>
            <div className='flex gap-4  flex-wrap'>
               <div className='flex hover:scale-105 transition-all duration-300 cursor-pointer gap-2 grow items-center'>
                    <IoPersonCircleOutline className='text-5xl bg-blue-500/50 rounded-full p-2' />
                    <div className='flex flex-col gap-1'>
                        <div className='text-sm text-[#718EBF]'>Total Patients</div>
                        <div className='text-2xl font-bold'>{data.total_patients}</div>
                    </div>
               </div>

               <div className='flex hover:scale-105 transition-all duration-300 cursor-pointer gap-2 grow items-center'>
                    <FaCalendarCheck className='text-5xl bg-green-500/50 rounded-full p-2' />
                    <div className='flex flex-col gap-1'>
                        <div className='text-sm text-[#718EBF]'>Total Visits</div>
                        <div className='text-2xl font-bold'>{data.total_visits}</div>
                    </div>
               </div>

               <div className='flex hover:scale-105 transition-all duration-300 cursor-pointer gap-2 grow items-center'>
                    <FaStethoscope className='text-5xl bg-purple-500/50 rounded-full p-2' />
                    <div className='flex flex-col gap-1'>
                        <div className='text-sm text-[#718EBF]'>Prescriptions</div>
                        <div className='text-2xl font-bold'>{data.total_prescriptions}</div>
                    </div>
               </div>
            </div>
            <div className='flex flex-wrap gap-4'>
                <div className='grow'>
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-semibold mb-4">Weekly Admission</h2>
                        <div style={{ width: '100%', height: 400 }}>
                            <ResponsiveContainer>
                                <BarChart
                                    data={chartData}
                                    margin={{
                                        top: 20,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis 
                                        dataKey="day"
                                        stroke="#718EBF"
                                        style={{ fontSize: '0.875rem' }}
                                    />
                                    <YAxis
                                        stroke="#718EBF" 
                                        style={{ fontSize: '0.875rem' }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#fff',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '0.5rem'
                                        }}
                                    />
                                    <Legend
                                        wrapperStyle={{
                                            paddingTop: '20px'
                                        }}
                                    />
                                    <Bar
                                        dataKey="Male"
                                        fill="#3b82f6"
                                        radius={[4, 4, 0, 0]}
                                    />
                                    <Bar
                                        dataKey="Female"
                                        fill="#ec4899"
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="bg-white grow rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Case</h2>
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-4 hover:scale-105 transition-all duration-300 cursor-pointer bg-yellow-50 p-4 rounded-lg shadow-sm">
                            <div className="bg-yellow-100 p-3 rounded flex items-center justify-center">
                                <FaVirusCovid className="text-2xl text-yellow-600" />
                            </div>
                            <div className="flex-grow">
                                <div className="text-lg font-medium">Maleria</div>
                                <div className="text-sm text-gray-500">300</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 hover:scale-105 transition-all duration-300 cursor-pointer">
                            <div className="bg-blue-100 p-3 rounded flex items-center justify-center">
                                <FaVirusCovid className="text-2xl text-blue-600" />
                            </div>
                            <div className="flex-grow">
                                <div className="text-lg font-medium">Hypertension</div>
                                <div className="text-sm text-gray-500">20</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 hover:scale-105 transition-all duration-300 cursor-pointer">
                            <div className="bg-cyan-100 p-3 rounded flex items-center justify-center">
                                <FaVirusCovid className="text-2xl text-cyan-600" />
                            </div>
                            <div className="flex-grow">
                                <div className="text-lg font-medium">Influenza</div>
                                <div className="text-sm text-gray-500">10</div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
