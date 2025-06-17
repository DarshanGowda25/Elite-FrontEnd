import React, { useState } from 'react';
import AdminNav from './AdminNav';
import { Outlet } from 'react-router-dom';

function AdminWrapper() {
  const [openNav, setOpenNav] = useState(true);

  return (
    <div className='w-full max-w-[1800px] flex flex-row '>
    <div className={`  transition-all duration-500
        ${openNav ? "md:w-[22%]":"md:w-[10%]"}`}>
      <AdminNav openNav={openNav} setOpenNav={setOpenNav} />
    </div>
      <div className={` overflow-y-auto transition-all duration-500  ${openNav ? "w-[78%]" : "w-[90%]"}`}>
        <Outlet />
      </div>
    </div>
  );
}

export default AdminWrapper;
