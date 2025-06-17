import React from 'react'
import { Outlet } from 'react-router-dom'
import ProfileItems from './ProfileItems'

function Profile() {
  return (
    <div className="flex h-screen">
      <ProfileItems/>
      <div className="flex-1 overflow-y-auto">
        <Outlet/>
      </div>
    </div>
  )
}

export default Profile