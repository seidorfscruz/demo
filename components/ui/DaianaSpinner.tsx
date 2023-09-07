import React from 'react'
import DaianaLogoLoader from '@/assets/img/brand/daiana-logo-loader-192x192.png'
import Image from 'next/image'

const DaianaSpinner = () => {
  return (
    <div className="relative flex justify-center items-center">
        <div className="absolute animate-spin rounded-full h-60 w-60 border-t-4 border-b-4 border-sky-500"></div>
        <Image src={ DaianaLogoLoader } alt='Loading...' className="h-40 w-40 pt-0" />
    </div>
  )
}

export default DaianaSpinner