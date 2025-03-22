"use client"
import { instance } from '@/hook/instance'
import { ProductsType } from '@/types/prodcutsType'
import { Card, CardBody, CardFooter } from '@heroui/card'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import React, { useEffect } from 'react'

const ProductCard = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await instance().get('/products');
            console.log("Response Data:", response.data);
            return response.data;
        }
    })
    useEffect(() => {
        console.log("Fetched Data:", data);
    }, [data]);

    return (
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4">
            {isLoading ? (
                <p>Loading products...</p>
            ) : error ? (
                <p>Error loading products</p>
            ) : (
                data && Array.isArray(data) && data.length > 0 ? (
                    data.map((item: ProductsType, index: number) => (
                        <Card key={index} isPressable shadow="lg" className="transition-transform transform hover:scale-105">
                            <CardBody className="overflow-hidden p-0">
                                <Image
                                    alt={item.title}
                                    className="w-full object-cover h-[200px]"
                                    height={200}
                                    src={item.image}
                                    width={300}
                                />
                            </CardBody>
                            <CardFooter className="text-small justify-between p-4">
                                <b className="text-lg">{item.title}</b>
                                <p className="text-default-500">{item.price}$</p>
                            </CardFooter>
                        </Card>
                    ))
                ) : (
                    <p>No products available</p>
                )
            )}
        </div>
    )
}

export default ProductCard