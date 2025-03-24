'use client'
import { TextField } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { ClockLoader } from 'react-spinners';

export const LoginPage = () => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const LoginFunc = (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true)
        e.preventDefault()
        // Extract form data
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        // console.log({ email: data.email, password: data.password });

        axios.post('http://localhost:5000/login', { email: data.email, password: data.password })
            .then((res) => {
                if (res.data) {
                    console.log(res)
                }
            }).
            catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setLoading(false)
            })
``
            router.push('/')
    }
    return (
        <div>
            <div className='flex bg-gray-200 justify-center items-center min-h-[100vh]'>
                <div className=''>
                    {
                        loading ?
                            <>
                                <div className='text-gray-800 '>
                                    <div className='flex justify-center items-center'>
                                        <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                                    </div>
                                    <div className='text-center'>
                                        Logging you in...please wait..
                                    </div>
                                </div>
                            </>
                            :

                            <>

                                <form onSubmit={(e) => LoginFunc(e)} className='flex text-gray-800  shadow-md  bg-transparent  p-5 rounded-md w-[full] min-w-[400px] flex-col gap-4'>
                                <div className='flex flex-col gap-1 items-center'>
                                    <div className='text-2xl font-bold'>TMDb</div>
                                    <div  className='text-gray-800 '>login</div>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor="email">Email</label>
                                        <input type="email" name='email' className='w-full p-2 rounded-md border border-gray-800 dark:border-gray-400' placeholder='Email' />
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor="password">Password</label>
                                        <input type="password" name='password' className='w-full p-2 rounded-md border border-gray-800 dark:border-gray-400' placeholder='Password' />
                                    </div>
                                    <div className='flex justify-center items-center'>
                                        <button className='bg-blue-500 text-white p-2 w-full rounded-md' type='submit'>Login</button>
                                    </div>
                                </div>
                                </form>
                            </>

                    }
                </div>
            </div>
        </div>
    )
}
