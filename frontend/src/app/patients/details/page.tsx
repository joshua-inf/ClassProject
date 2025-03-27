import NavigationLayout from '@/components/Navigation/NavigationLayout'
import { PatientDetails } from '@/components/patients/details/PatientDetails'
import React from 'react'

const page = () => {
  return (
    <NavigationLayout>
    <PatientDetails />
    </NavigationLayout>
  )
}

export default page