import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashAdvertisements from '../components/DashAdvertisements';
import DashUsers from '../components/DashUsers';

export default function DashboardPage() {

  const location = useLocation();
  const [tab, setTab] = useState('')
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        <DashSidebar />
      </div>
      {tab === 'profile' && <DashProfile />}
      {tab === 'advertisements' && <DashAdvertisements />}
      {tab === 'users' && <DashUsers />}

    </div>
  )
}
