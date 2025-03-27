import NavigationLayout from '@/components/Navigation/NavigationLayout'
import React from 'react'
import { Patients } from '@/components/patients/Patients'

const page = () => {
  return (
    <NavigationLayout>
        <Patients />
    </NavigationLayout>
  )
}

export default page