"use client"
import { instance } from '@/hook/instance'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeftCircle } from 'lucide-react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'

const SingleProductPage = () => {
    const { id }: any = useParams()
    const router = useRouter()
    const { data, error, isLoading } = useQuery({
        queryKey: ['single_product', id],
        queryFn: () => instance().get(`/products/${id}`).then(res => res.data)
    })

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen"><p>Loading...</p></div>
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen"><p>Error loading product</p></div>
    }

    return (
        <div className="px-[202px] py-[100px] mx-auto">
            <button onClick={() => router.back()} className='w-[40px] mb-[30px] cursor-pointer'>
                <ArrowLeftCircle size={'large'} />
            </button>
            {data && (
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="w-full lg:w-1/2">
                        <Image src={data.image} alt={data.title} width={367} height={438} className="rounded-lg shadow-lg" />
                    </div>
                    <div className="w-full lg:w-1/2">
                        <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
                        <p className="text-lg text-gray-700 mb-6">{data.description}</p>
                        <p className="text-2xl font-semibold text-green-600 mb-6">${data.price}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SingleProductPage