import React from 'react'
import UserMenu from '../components/UserMenu'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const user = useSelector(state => state.user)

  console.log("user dashboard",user)
  return (
    <section className='bg-white'>
        <div className='container mx-auto  grid lg:grid-cols-[250px,1fr]  '>
                {/**left for menu */}

                {/**right for content */}
                <div className='bg-white min-h-[75vh] '>
                    <Outlet/>
                </div>
        </div>
    </section>
  )
}

export default Dashboard