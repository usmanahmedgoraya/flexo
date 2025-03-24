import React from 'react'
import VatRateForm from './_components/vate-rate'
import PaymentMethods from './_components/payment-methods'
import LocalSettings from './_components/local-settings'

const page = () => {
  return (
    <div className='p-6 h-full max-h-screen overflow-auto   '> 
       <div className='w-full max-w-5xl flex flex-col md:flex-row justify-center      gap-6 md:gap-10   '>
       <VatRateForm/>
       <PaymentMethods/>
       </div>
        <LocalSettings/>
    </div>
  )
}

export default page