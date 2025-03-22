import { instance } from '@/hook/instance'
import { ProductsType } from '@/types/prodcutsType'
import { Card, CardBody, CardFooter } from '@heroui/card'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import React from 'react'

const getAll = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: () => instance().get('/products').then((res) => res.data)
    })
    return (
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
            {data.map((item: ProductsType, index: number) => (
                <Card key={index} isPressable shadow="sm" onPress={() => console.log("item pressed")}>
                    <CardBody className="overflow-visible p-0">
                        <Image alt={item.title} className="w-full object-cover h-[140px]" height={100} src={item.image} width={100} />
                    </CardBody>
                    <CardFooter className="text-small justify-between">
                        <b>{item.title}</b>
                        <p className="text-default-500">{item.price}</p>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}

export default getAll