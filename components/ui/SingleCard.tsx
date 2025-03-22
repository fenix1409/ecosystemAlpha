import { Card, CardBody, CardFooter } from '@heroui/card'
import Image from 'next/image'
import React, { useState } from 'react'
import { ProductsType } from '@/types/prodcutsType'

const MAX_TITLE_LENGTH = 40

const SingleCard = ({ item }: { item: ProductsType }) => {
    const [isExpanded, setIsExpanded] = useState(false)

    const truncatedTitle = item.title.length > MAX_TITLE_LENGTH ? item.title.slice(0, MAX_TITLE_LENGTH) + "..." : item.title

    return (
        <Card shadow="lg" className="h-[320px] flex flex-col justify-between rounded-xl overflow-hidden border border-gray-200 bg-white hover:shadow-2xl transition-transform transform hover:scale-105">
            <CardBody className="overflow-hidden p-0 flex justify-center items-center bg-gray-100">
                <Image alt={item.title} className="w-full object-cover h-[180px] rounded-t-xl" height={180} src={item.image} width={300} />
            </CardBody>
            <CardFooter className="p-4 flex flex-col items-center">
                <b className="text-[18px] font-semibold text-gray-800">{isExpanded ? item.title : truncatedTitle}</b>
                {item.title.length > MAX_TITLE_LENGTH && (
                    <div onClick={() => setIsExpanded(!isExpanded)} className="text-white text-sm bg-blue-500 px-3 py-1 rounded-lg mt-2 hover:bg-blue-600 transition">
                        {isExpanded ? "Show Less" : "Read More"}
                    </div>
                )}
                <p className="text-green-600 font-bold text-[18px] mt-2">{item.price}$</p>
            </CardFooter>
        </Card>
    )
}

export default SingleCard