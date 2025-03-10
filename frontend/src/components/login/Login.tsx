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

            router.push('/')
    }
    return (
        <div>
            <div className='flex dark:bg-gray-900 justify-center items-center min-h-[100vh]'>
                <div className=''>
                    {
                        loading ?
                            <>
                                <div className='text-gray-800 dark:text-gray-300'>
                                    <div className='flex justify-center items-center'>
                                        <ClockLoader size={20} color="white" />
                                    </div>
                                    <div className='text-center'>
                                        Loging you in...please wait..
                                    </div>
                                </div>
                            </>
                            :

                            <>

                                <form onSubmit={(e) => LoginFunc(e)} className='flex text-gray-800 dark:text-gray-300 shadow-md  bg-transparent border border-gray-800 dark:border-gray-400 p-5 rounded-md w-[full] min-w-[400px] flex-col gap-4'>
                                    <div className='text-center  font-bold text-2xl'>Login </div>
                                    <TextField
                                        name='email'
                                        id="input-email" label="Email"
                                        type='email' variant="standard" />
                                    <TextField
                                        name='password'
                                        id="input-password" label="Password"
                                        type='password'
                                        variant="standard" />
                                    <button disabled={loading} type='submit' className='bg-blue-500 dark:bg-blue-600 text-white rounded-md p-2'>
                                        Login
                                    </button>
                                </form>
                            </>

                    }
                </div>
            </div>
        </div>
    )
}
