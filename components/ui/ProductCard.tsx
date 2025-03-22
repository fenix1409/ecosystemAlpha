"use client"
import getAll from '@/service/getAll'
import { ProductsType } from '@/types/prodcutsType'
import { Card, CardBody, CardFooter } from '@heroui/card'
import Image from 'next/image'
import React from 'react'

const ProductCard = () => {
    const { data, isLoading, error } = getAll()

    return (
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4">
            {isLoading ? (
                <p>Loading products...</p>
            ) : error ? (
                <p>Error loading products</p>
            ) : (data && Array.isArray(data) && data.length > 0 ? (
                data.map((item: ProductsType, index: number) => (
                    <Card key={index} isPressable shadow="lg" className="block transition-transform transform hover:scale-105">
                        <CardBody className="overflow-hidden p-0">
                            <Image alt={item.title} className="w-full object-cover h-[200px]" height={200} src={item.image} width={300} />
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


// "use client";
// import getAll from '@/service/getAll';
// import { ProductsType } from '@/types/prodcutsType';
// import { Card, CardBody, CardFooter } from '@heroui/card';
// import Image from 'next/image';
// import React, { useState } from 'react';

// const MAX_TITLE_LENGTH = 40; // Maksimal harflar soni

// const ProductCard = () => {
//     const { data, isLoading, error } = getAll();

//     return (
//         <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4">
//             {isLoading ? (
//                 <p>Loading products...</p>
//             ) : error ? (
//                 <p>Error loading products</p>
//             ) : (data && Array.isArray(data) && data.length > 0 ? (
//                 data.map((item: ProductsType, index: number) => (
//                     <SingleCard key={index} item={item} />
//                 ))
//             ) : (
//                 <p>No products available</p>
//             ))}
//         </div>
//     );
// };

// const SingleCard = ({ item }: { item: ProductsType }) => {
//     const [isExpanded, setIsExpanded] = useState(false);

//     const truncatedTitle = item.title.length > MAX_TITLE_LENGTH
//         ? item.title.slice(0, MAX_TITLE_LENGTH) + "..."
//         : item.title;

//     return (
//         <Card isPressable shadow="lg" className="h-[300px] flex flex-col justify-between">
//             <CardBody className="overflow-hidden p-0 flex justify-center items-center">
//                 <Image
//                     alt={item.title}
//                     className="w-full object-cover h-[200px]"
//                     height={200}
//                     src={item.image}
//                     width={300}
//                 />
//             </CardBody>
//             <CardFooter className="text-small justify-between p-4 flex flex-col items-center">
//                 <b className="text-lg">{isExpanded ? item.title : truncatedTitle}</b>
//                 {item.title.length > MAX_TITLE_LENGTH && (
//                     <button
//                         onClick={() => setIsExpanded(!isExpanded)}
//                         className="text-blue-500 text-sm mt-1 underline"
//                     >
//                         {isExpanded ? "Show Less" : "Read More"}
//                     </button>
//                 )}
//                 <p className="text-default-500">{item.price}$</p>
//             </CardFooter>
//         </Card>
//     );
// };

// export default ProductCard;
