import React from 'react'
import UserRegistration from './_components/user-registration'
import RepairOrder from './_components/repair-order'
import SettingsInterface from './_components/settings-interface'
 
 const page = () => {
   return (
     <div className='max-h-[100vh] overflow-auto '>
      <UserRegistration />
      <RepairOrder />
      <SettingsInterface />
     </div>
   )
 }
 
 export default page