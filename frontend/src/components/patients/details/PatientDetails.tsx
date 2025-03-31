'use client'
import { visits } from '@/modals/visit';
import { Diagnosis } from '@/modals/Diagnosis';
import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi';
import axios from 'axios';
import { getUserDataCookie } from '@/lib';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { ArrowDownCircleIcon } from '@heroicons/react/16/solid';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { prescriptionDataType } from '@/modals/Prescription';

export const PatientDetails = ({ data, setSeachResult, func }: { data: any, setSeachResult: any, func: (any: any) => any }) => {
    const userData = getUserDataCookie()
    const [visits, setVisits] = useState<visits[]>([]);
    const [medicalHistory, setMedicalHistory] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);
    const [visitData, setVisitData] = useState<any>([]);
    const [success, setSuccess] = useState(false)
    const [createVisit, setCreateVisit] = useState(false)

    const [patientId, setPatientId] = useState('')
    const [clinicianId, setClinicianId] = useState('')
    const [bloodPressure, setBloodPressure] = useState('')
    const [temperature, setTemperature] = useState('')
    const [weight, setWeight] = useState('')
    const [visitType, setVisitType] = useState('')
    const [deletePopupVisible, setDeletePopupVisible] = useState(false)
    const [reasonForVisit, setReasonForVisit] = useState('')

    const [medicationName, setMedicationName] = useState("");
    const [dosage, setDosage] = useState("");
    const [instructions, setInstructions] = useState("");
    const [quantity, setQuantity] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [prescriptionPopup, setPrescriptionPopup] = useState(false)
    const [selectedVisitId, setSelectedVisitId] = useState<number | null>(null)

    const addPrescription = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(selectedVisitId)
        axios.post(`http://localhost:8000/api/visits/${selectedVisitId}/prescriptions/`, {
            visit: selectedVisitId,
            medication_name: medicationName,
            dosage: dosage,
            quantity: quantity,
            start_date: startDate,
            end_date: endDate,
            instructions: instructions
        })
        .then((res)=>{
            console.log(res.data)
            setPrescriptionPopup(false)
            getVisits()
        })
        .catch((err)=>{
            console.log(err)
        })  

    };


    const addVisit = (e: React.FormEvent<HTMLFormElement>) => {
        setLoading2(true)
        e.preventDefault()
        console.log("add visit")
        axios.post('http://localhost:8000/api/patients/' + data.patient_id + '/visits/', {

            patient: data.patient_id,
            clinician: userData.id,
            blood_pressure: bloodPressure,
            temperature: temperature,
            weight: weight,
            visit_type: visitType,
            reason_for_visit: reasonForVisit
        })
            .then((res) => {
                // console.log(res.data)
                getVisits()
                clearFields()
                setCreateVisit(false)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setLoading2(false)
            })
    }
    const clearFields = () => {
        setPatientId('')
        setClinicianId('')
        setBloodPressure('')
        setTemperature('')
        setWeight('')
    }

    const deleteData = () => {
        setLoading2(true)
        axios.delete('http://localhost:8000/api/patient/' + data.patient_id + '/')
            .then((res) => {
                console.log(data.patient_id)
                func(1)
                setSeachResult()
                if (res) {
                }
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setLoading2(false)
            })
    }


    const getVisits = () => {
        axios.get('http://localhost:8000/api/patients/' + data.patient_id + '/visits')
            .then((res) => setVisitData(res.data))
            .catch((err) => console.log(err))
    }


    const addDiagnosis = () => {

    }

    const Prescription = ({ data }: { data: any }) => {
        const [prescriptionData, setPrescriptionData] = useState<prescriptionDataType>()
        const getPrescriptionData = () => {
            axios.get(`http://localhost:8000/api/visits/${data}/prescriptions`)
                .then((res) => {
                    setPrescriptionData(res.data[0])
                    console.log(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
                .finally(() => {

                })
        }

        useEffect(() => {
            getPrescriptionData()
        }, [])


        return (
            <>
                <div>
                    {prescriptionData ?
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<MdKeyboardArrowDown color='black' size={20} />}
                            >
                                <Typography variant="subtitle1" fontWeight="bold">
                                    {prescriptionData?.medication_name} - {prescriptionData?.dosage}
                                </Typography>
                            </AccordionSummary>

                            <AccordionDetails>
                                <Typography>
                                    <strong>Instructions:</strong>
                                    {prescriptionData?.instructions}
                                </Typography>
                                <Typography>
                                    <strong>Quantity:</strong>
                                    {prescriptionData?.quantity}
                                </Typography>
                                <Typography>
                                    <strong>Start Date:</strong>
                                    {prescriptionData?.start_date}
                                </Typography>
                                <Typography>
                                    <strong>End Date:</strong>
                                    {prescriptionData?.end_date}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        :
                        <></>
                    }
                </div>
            </>
        )
    }


  
    useEffect(() => {
        getVisits()
    }, [])

    return (
        <>
            {
                createVisit ?
                    <div className='fixed top-0 flex left-0 justify-center bg-[#00000050] items-center bottom-0 w-full z-[999]'>
                        {
                            loading2 ?
                                <div className='flex justify-center items-center'>
                                    <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                                </div>
                                :
                                <div className='bg-white md:w-1/2 w-3/4 rounded-md  absolute p-4 z-[9999]'>
                                    <form onSubmit={addVisit} className="text-sm space-y-5">
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
                                                <label className="text-gray-600">Blood Pressure</label>
                                                <div className="border border-gray-300 rounded-lg">
                                                    <input
                                                        name="blood_pressure"
                                                        type="text"
                                                        onChange={(e: any) => setBloodPressure(e.target.value)}
                                                        required
                                                        placeholder="Enter blood pressure (e.g. 120/80)"
                                                        className="p-2 w-full text-gray-600 outline-none"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex grow flex-col">
                                                <label className="text-gray-600">Temperature</label>
                                                <div className="border border-gray-300 rounded-lg">
                                                    <input
                                                        name="temperature"
                                                        type="number"
                                                        step="0.1"
                                                        onChange={(e: any) => setTemperature(e.target.value)}
                                                        required
                                                        placeholder="Enter temperature (e.g. 36.6)"
                                                        className="p-2 w-full text-gray-600 outline-none"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='flex gap-2'>
                                            <div className="flex grow flex-col">
                                                <label className="text-gray-600">Weight</label>
                                                <div className="border border-gray-300 rounded-lg">
                                                    <input
                                                        name="weight"
                                                        type="number"
                                                        step="0.1"
                                                        onChange={(e: any) => setWeight(e.target.value)}
                                                        required
                                                        placeholder="Enter weight (e.g. 75.5)"
                                                        className="p-2 w-full text-gray-600 outline-none"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex grow flex-col">
                                                <label className="text-gray-600">Visit Type</label>
                                                <div className="border border-gray-300 rounded-lg">
                                                    <select
                                                        onChange={(e: any) => setVisitType(e.target.value)}
                                                        name="visit_type"
                                                        className="p-2 w-full text-gray-600 outline-none"
                                                    >
                                                        <option value="">Select Visit Type</option>
                                                        <option value="Emergency">Emergency</option>
                                                        <option value="Routine">Routine</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col">
                                            <label className="text-gray-600">Reason for Visit</label>
                                            <div className="border border-gray-300 rounded-lg">
                                                <textarea
                                                    name="reason_for_visit"
                                                    onChange={(e: any) => setReasonForVisit(e.target.value)}
                                                    required
                                                    placeholder="Enter reason for visit"
                                                    className="p-2 w-full  text-gray-600 outline-none"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex gap-3">
                                            <button type="submit" className="grow bg-green-600 p-2 rounded-md text-white">
                                                Save
                                            </button>
                                            <button onClick={() => { setCreateVisit(false); clearFields(); setSuccess(false) }} type="button" className="grow bg-blue-600 p-2 rounded-md text-white">
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

            {
                deletePopupVisible ?
                    <div className={`bg-[#00000090] p-3 flex items-center justify-center z-[90] fixed top-0 bottom-0 left-0 right-0 ${deletePopupVisible ? '' : 'hidden'}`}>
                        <div className="p-3 max-w-[400px] bg-white  rounded-lg shadow">
                            <div className="text-gray-700 p-5 dark:text-gray-200 text-center">
                                <div className="font-medium text-lg text-red-600">Are you sure you want to delete this item?</div>
                                <div className="text-gray-600 mt-2">all data related to this patient will be deleted</div>
                                <div className="text-gray-600 mt-2">NOTE: This action is irreversible.</div>
                            </div>
                            <div className="flex gap-3 mt-4">
                                <button
                                    onClick={deleteData} // Call function to confirm deletion
                                    className="grow bg-red-600 p-2 rounded-md text-white hover:bg-red-700 transition-all duration-200"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => setDeletePopupVisible(false)} // Close the popup without deleting
                                    className="grow bg-gray-600 p-2 rounded-md text-white hover:bg-gray-700 transition-all duration-200"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                    :
                    <></>
            }


            {
                prescriptionPopup ?
                    <div className='fixed top-0 left-0 flex justify-center items-center w-full h-full bg-[#00000050] z-50'>
                        <div className='bg-white md:w-1/2 w-3/4 rounded-md p-4 z-[9999]'>
                            <form onSubmit={addPrescription} className="text-sm space-y-5">
                                <div className='flex flex-col'>
                                    <label className='text-gray-600'>Medication Name</label>
                                    <input
                                        type='text'
                                        value={medicationName}
                                        onChange={(e) => setMedicationName(e.target.value)}
                                        required
                                        className='p-2 border border-gray-300 rounded-lg w-full outline-none'
                                        placeholder='Enter medication name'
                                    />
                                </div>

                                <div className='flex gap-2'>
                                    <div className='flex flex-col grow'>
                                        <label className='text-gray-600'>Dosage</label>
                                        <input
                                            type='text'
                                            value={dosage}
                                            onChange={(e) => setDosage(e.target.value)}
                                            required
                                            className='p-2 border border-gray-300 rounded-lg w-full outline-none'
                                            placeholder='Enter dosage (e.g. 500mg)'
                                        />
                                    </div>
                                    <div className='flex flex-col grow'>
                                        <label className='text-gray-600'>Quantity</label>
                                        <input
                                            type='number'
                                            value={quantity}
                                            onChange={(e) => setQuantity(e.target.value)}
                                            required
                                            className='p-2 border border-gray-300 rounded-lg w-full outline-none'
                                            placeholder='Enter quantity'
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    <label className='text-gray-600'>Instructions</label>
                                    <textarea
                                        value={instructions}
                                        onChange={(e) => setInstructions(e.target.value)}
                                        required
                                        className='p-2 border border-gray-300 rounded-lg w-full outline-none'
                                        placeholder='Enter instructions'
                                    />
                                </div>
                                <div className='flex gap-2'>
                                    <div className='flex flex-col grow'>
                                        <label className='text-gray-600'>Start Date</label>
                                        <input
                                            type='date'
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            required
                                            className='p-2 border border-gray-300 rounded-lg w-full outline-none'
                                        />
                                    </div>
                                    <div className='flex flex-col grow'>
                                        <label className='text-gray-600'>End Date</label>
                                        <input
                                            type='date'
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            required
                                            className='p-2 border border-gray-300 rounded-lg w-full outline-none'
                                        />
                                    </div>
                                </div>

                                <div className='flex gap-3'>
                                    <button type='submit' className='grow bg-green-600 p-2 rounded-md text-white'>Save</button>
                                    <button type='button' onClick={() => setPrescriptionPopup(false)} className='grow bg-blue-600 p-2 rounded-md text-white'>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    :
                    <></>
            }
            <div className='flex flex-col gap-5 p-5'>
                <div className='flex justify-between '>
                    <div onClick={() => func(1)} className='bg-white items-center flex hover:scale-[1.01] transition-all duration-300 p-2 px-5 rounded-md'>
                        <BiArrowBack className='' />
                    </div>
                    <div className='flex gap-2'>
                        <button onClick={() => setCreateVisit(true)} className='bg-green-300 hover:scale-[1.01] transition-all duration-300 p-2 px-5 rounded-md'>
                            Create Visit
                        </button>
                        <button onClick={() => setDeletePopupVisible(true)} className='bg-red-300 hover:scale-[1.01] transition-all duration-300 p-2 px-5 rounded-md'>
                            delete
                        </button>
                    </div>
                </div>
                <div>
                    <div className='space-y-2'>
                        <div className='flex grow-0 p-3    cursor-pointer flex-col gap-2'>
                            <div>
                                User Details
                            </div>
                            <hr className='border-gray-300' />
                            <div className='flex items-center gap-2'>
                                <div className="p-4 border rounded-lg shadow-md bg-white text-sm font-light">
                                    {/* Patient Name and ID */}
                                    <div className="font-medium text-base mb-2">
                                        {data.first_name} {data.last_name}
                                    </div>
                                    {/* Grid Layout for Details */}
                                    <div className="grid grid-cols-2 gap-4">
                                        {/* Left Column */}
                                        <div className="space-y-1">
                                            <div className="text-gray-600">Patient ID: {data.patient_id}</div>
                                            <div className="text-gray-600">Date of Birth: {data.dob}</div>
                                            <div className="text-gray-600">Gender: {data.gender}</div>
                                            <div className="text-gray-600">Patient Type: {data.patient_type}</div>
                                        </div>

                                        {/* Right Column */}
                                        <div className="space-y-1">
                                            <div className="text-gray-600">Email: {data.email}</div>
                                            <div className="text-gray-600">Phone: {data.phone_number}</div>
                                            <div className="text-gray-600">Address: {data.address}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* visit history */}
                        <div className='flex grow-0 p-3 cursor-pointer flex-col gap-2'>
                            <div>
                                Visit History
                            </div>
                            <hr className='border-gray-300' />
                            <div className='p-4 border space-y-2 rounded-lg shadow-md bg-white text-sm font-light'>
                                {
                                    visitData.map((visit: any, key:any) =>
                                        <>
                                            <div key={visit.id + key} className='border-b border-gray-300 pb-2'>
                                                <div className='flex justify-end'>
                                                    <div className='flex'>

                                                        <button  className='bg-orange-300 hover:scale-[1.01] transition-all duration-300 p-2 px-5 rounded-l-md'>
                                                            add Diagnosis
                                                        </button>
                                                        <button onClick={() => {setPrescriptionPopup(true), setSelectedVisitId(visit.id)}} className='bg-blue-300 hover:scale-[1.01] transition-all duration-300 p-2 px-5'>
                                                            give Prescription
                                                        </button>
                                                        <button onClick={() => setDeletePopupVisible(true)} className='bg-red-300 hover:scale-[1.01] transition-all duration-300 p-2 px-5 rounded-r-md'>
                                                            delete
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className='font-medium text-base mb-2'>
                                                    Reason: {visit.reason_for_visit}
                                                </div>

                                                <div className='grid grid-cols-2 gap-4'>
                                                    {/* Left Column */}
                                                    <div className='space-y-1'>
                                                        <div className='text-gray-600'>Clinician ID: {visit.clinician}</div>
                                                        <div className='text-gray-600'>Blood Pressure: {visit.blood_pressure}</div>
                                                        <div className='text-gray-600'>Temperature: {visit.temperature} °C</div>
                                                    </div>

                                                    <div className='space-y-1'>
                                                        <div className='text-gray-600'>Weight: {visit.weight} kg</div>
                                                        <div className='text-gray-600'>Visit Type: {visit.visit_type}</div>
                                                        <div className='text-gray-600'></div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <Prescription data={visit.id} />
                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
