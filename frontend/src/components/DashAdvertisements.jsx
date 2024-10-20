import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Table } from 'flowbite-react'
import { Link } from 'react-router-dom'

export default function DashAdvertisements() {

  const { currentUser } = useSelector((state) => state.user)
  const [userAdvertisements, setUserAdvertisements] = useState([])

  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        const res = await fetch(`/api/advertisement/getadvertisements?userId=${currentUser._id}`)
        const data = await res.json()
        if (res.ok) {
          setUserAdvertisements(data.advertisements)
        }

      } catch (error) {
        console.log(error.message)
      }
    };
    if (currentUser.isAdmin) {
      fetchAdvertisements();
    }
  }, [currentUser._id])

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && userAdvertisements.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Advertisement Image</Table.HeadCell>
              <Table.HeadCell>Advertisement Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell><span>Edit</span></Table.HeadCell>

            </Table.Head>
            {userAdvertisements.map((advertisement) => (
              <Table.Body key={advertisement._id} className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>{new Date(advertisement.updatedAt).toLocaleDateString() + ' ' + new Date(advertisement.updatedAt).toLocaleTimeString()}</Table.Cell>
                  <Table.Cell>
                    <Link to={`/advertisement/${advertisement.slug}`}>
                      <img src={advertisement.image} alt={advertisement.title} className='w-20 h-10 object-cover bg-gray-500' />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link className='font-medium text-gray-900 dark:text-white' to={`/advertisement/${advertisement.slug}`}>{advertisement.title}</Link>
                  </Table.Cell>
                  <Table.Cell>
                    {advertisement.category}
                  </Table.Cell>
                  <Table.Cell>
                    <span className='font-medium text-red-500 hover:underline cursor-pointer'>Delete</span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link className='text-teal-500 hover:underline' to={`/update-advertisement/${advertisement._id}`}>
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>

                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </>
      ) : (<p>You hane no advertisement yet!</p>)
      }
    </div >
  )
}
