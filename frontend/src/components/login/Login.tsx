'use client'
import { TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'

export const LoginPage = () => {
    const [loading, setLoading] = useState(false)

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
    }
    return (
        <div>
            <div className='flex justify-center items-center min-h-[100vh]'>
                <div className=''>
                    {
                        loading ?
                            <>
                                <div>
                                    Loging you in...please wait..
                                </div>
                            </>
                            :

                            <>

                                <form onSubmit={(e) => LoginFunc(e)} className='flex shadow-gray-400 shadow-md bg-gray-200 p-5 rounded-md w-[full] min-w-[400px] flex-col gap-4'>
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
                                    <button disabled={loading} type='submit' className='bg-blue-500 text-white rounded-md p-2'>
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
