'use client'
import NavigationLayout from '@/components/Navigation/NavigationLayout'
import { StuffPage } from '@/components/stuff/StuffPage'
import { getUserRole } from '@/lib'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const page = () => {
  const role = getUserRole()
  return (
    <NavigationLayout>
      {
        role != 'nurse' && (
          <StuffPage />
        )
      }
    </NavigationLayout>
  )
}

export default page