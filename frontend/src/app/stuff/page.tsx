'use client'
import NavigationLayout from '@/components/Navigation/NavigationLayout'
import { StuffPage } from '@/components/stuff/StuffPage'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const page = () => {
   
    return (
        <NavigationLayout>
          <StuffPage/>
        </NavigationLayout>
    )
}

export default page