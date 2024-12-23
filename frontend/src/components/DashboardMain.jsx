import React, { useEffect, useState } from 'react'
import { HiAnnotation, HiArrowNarrowUp, HiDocumentText, HiOutlineUserGroup } from 'react-icons/hi'
import { HiMiniArrowSmallRight } from 'react-icons/hi2'
import { useSelector } from 'react-redux'
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";


export default function DashboardMain() {

    const { currentUser } = useSelector((state) => state.user)
    const [users, setUsers] = useState([])
    const [comments, setComments] = useState([])
    const [advertisements, setAdvertisements] = useState([])
    const [totalUsers, setTotalUsers] = useState(0)
    const [totalAdvertisements, setTotalAdvertisements] = useState(0)
    const [totalComments, setTotalComments] = useState(0)
    const [lastMonthUsers, setLastMonthUsers] = useState(0)
    const [lastMonthAdvertisements, setLastMonthAdvertisements] = useState(0)
    const [lastMonthComments, setLastMonthComments] = useState(0)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('/api/user/getusers?limit=5')
                const data = await res.json()
                if (res.ok) {
                    setUsers(data.users)
                    setTotalUsers(data.totalUsers)
                    setLastMonthUsers(data.lastMonthUsers)
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        const fetchAdvertisements = async () => {
            try {
                const res = await fetch('/api/advertisement/getadvertisements?limit=5')
                const data = await res.json()
                if (res.ok) {
                    setAdvertisements(data.advertisements)
                    setTotalAdvertisements(data.totalAdvertisements)
                    setLastMonthAdvertisements(data.lastMonthAdvertisements)
                }
            } catch (error) {
                console.log(error.message);
            }

        };

        const fetchComments = async () => {
            try {
                const res = await fetch('/api/comment/getcomments?limit=5')
                const data = await res.json()
                if (res.ok) {
                    setComments(data.comments)
                    setTotalComments(data.totalComments)
                    setLastMonthComments(data.lastMonthComments)
                }
            } catch (error) {
                console.log(error.message);
            }
        };


        if (currentUser.isAdmin) {
            fetchUsers();
            fetchAdvertisements();
            fetchComments();
        }
    }, [currentUser]);

    return (
        <div className='p-3 md:mx-auto'>

            <div className='flex flex-wrap gap-4 justify-center'>
                <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
                    <div className='flex justify-between'>
                        <div>
                            <h3 className='text-gray-500 text-md uppercase'>Total Users</h3>
                            <p className='text-2xl'>{totalUsers}</p>
                        </div>
                        <HiOutlineUserGroup className='bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg' />
                    </div>
                    <div className='flex gap-2 text-sm'>
                        <span className={`${lastMonthUsers === 0 ? 'text-gray-500' : 'text-green-500'} flex items-center`}>
                            {lastMonthUsers === 0 ? <HiMiniArrowSmallRight /> : <HiArrowNarrowUp />}
                            {lastMonthUsers}
                        </span>
                        <div className='text-gray-500  dark:text-gray-400'>Last month</div>
                    </div>
                </div>
                <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
                    <div className='flex justify-between'>
                        <div>
                            <h3 className='text-gray-500 text-md uppercase'>Total Advertisements</h3>
                            <p className='text-2xl'>{totalAdvertisements}</p>
                        </div>
                        <HiDocumentText className='bg-indigo-600 text-white rounded-full text-5xl p-3 shadow-lg' />
                    </div>
                    <div className='flex gap-2 text-sm'>
                        <span className={`${lastMonthAdvertisements === 0 ? 'text-gray-500' : 'text-green-500'} flex items-center`}>
                            {lastMonthAdvertisements === 0 ? <HiMiniArrowSmallRight /> : <HiArrowNarrowUp />}
                            {lastMonthAdvertisements}
                        </span>
                        <div className='text-gray-500 dark:text-gray-400'>Last month</div>
                    </div>
                </div>
                <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
                    <div className='flex justify-between'>
                        <div>
                            <h3 className='text-gray-500 text-md uppercase'>Total Comments</h3>
                            <p className='text-2xl'>{totalComments}</p>
                        </div>
                        <HiAnnotation className='bg-lime-600 text-white rounded-full text-5xl p-3 shadow-lg' />
                    </div>
                    <div className='flex gap-2 text-sm'>
                        <span className={`${lastMonthComments === 0 ? 'text-gray-500' : 'text-green-500'} flex items-center`}>
                            {lastMonthComments === 0 ? <HiMiniArrowSmallRight /> : <HiArrowNarrowUp />}
                            {lastMonthComments}
                        </span>
                        <div className='text-gray-500  dark:text-gray-400'>Last month</div>
                    </div>
                </div>
            </div>

            <div className='flex flex-wrap gap-4 py-3 mx-auto justify-center'>
                <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
                    <div className='flex justify-between p-3 text-ms font-semibold'>
                        <h1 className='text-center p-2'>Recent Users</h1>
                        <Button outline gradientDuoTone='purpleToPink'>
                            <Link to={"/dashboard?tab=users"}>See all</Link>
                        </Button>
                    </div>
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>User Image</Table.HeadCell>
                            <Table.HeadCell>Username</Table.HeadCell>
                        </Table.Head>
                        {users && users.map((user) => (
                            <Table.Body key={user._id} className='divide-y'>
                                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                    <Table.Cell>
                                        <img src={user.profilePicture} alt="user" className='w-10 h-10 rounded-full bg-gray-100' />
                                    </Table.Cell>
                                    <Table.Cell>
                                        {user.username}
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        ))}
                    </Table>
                </div>
                <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
                    <div className='flex justify-between p-3 text-ms font-semibold'>
                        <h1 className='text-center p-2'>Recent Advertisements</h1>
                        <Button outline gradientDuoTone='purpleToPink'>
                            <Link to={"/dashboard?tab=advertisements"}>See all</Link>
                        </Button>
                    </div>
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>Advertisement Image</Table.HeadCell>
                            <Table.HeadCell>Advertisement Title</Table.HeadCell>
                        </Table.Head>
                        {advertisements && advertisements.map((advertisement) => (
                            <Table.Body key={advertisement._id} className='divide-y'>
                                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                    <Table.Cell>
                                        <img src={advertisement.image} alt="user" className='w-20 h-10 object-cover rounded-md bg-gray-100' />
                                    </Table.Cell>
                                    <Table.Cell className='w-96'>
                                        <p className='line-clamp-2'>{advertisement.title}</p>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        ))}
                    </Table>
                </div>
                <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
                    <div className='flex justify-between p-3 text-ms font-semibold'>
                        <h1 className='text-center p-2'>Recent Comments</h1>
                        <Button outline gradientDuoTone='purpleToPink'>
                            <Link to={"/dashboard?tab=comments"}>See all</Link>
                        </Button>
                    </div>
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>Commnet Content</Table.HeadCell>
                            <Table.HeadCell>Likes</Table.HeadCell>
                        </Table.Head>
                        {comments && comments.map((comment) => (
                            <Table.Body key={comment._id} className='divide-y'>
                                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                    <Table.Cell className='w-96'>
                                        <p className='line-clamp-2'>{comment.content}</p>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {comment.numberOfLikes}
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        ))}
                    </Table>
                </div>

            </div>
        </div>


    )
}
