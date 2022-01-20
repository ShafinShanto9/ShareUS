import React, { useEffect, useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { HiMenu } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import logo from '../assests/logo.png';
import { client } from '../client';
import Sidebar from '../components/Sidebar';
import { userQuery } from '../utils/data';


const Home = () => {
    const [toggleSidebar, setToggleSidebar] = useState(false)
    const [user, setUser] = useState(null)
    const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear()

    useEffect(()=>{
        const query = userQuery(userInfo?.googleId)
        client.fetch(query)
        .then((data) => {
            setUser(data[0])
        })
    },[])
    return (
        <div className='flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out'>
        <div className='hidden md:flex h-screen flex-initial'>
            <Sidebar user={user && user}/>
        </div>
        <div className='flex md:hidden flex-row'>
            <HiMenu fontSize={40} className='cursor-pointer' onClick={()=>setToggleSidebar(true)}/>
            <Link to = "/">
                <img src={logo} alt='log' className='w-28'/>
            </Link>
            <Link to = {`user-profile/${user?._id}`}>
                <img src={user?.image} alt='log' className='w-28'/>
            </Link>
        </div>
        {
            toggleSidebar && (
                <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
                    <div className='absolute w-full flex justify-end items-center p-2'>
                        <AiFillCloseCircle fontSize={30} className='cursor-pointer' onClick={()=>setToggleSidebar(false)}/>
                    </div>
                    <Sidebar user={user && user} closeToggle = {setToggleSidebar}/>
                </div>
            )
        }
    </div>
    )
}

export default Home