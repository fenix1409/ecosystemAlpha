"use client"
import getAll from '@/service/getAll'
import { ProductsType } from '@/types/prodcutsType'
import React, { useState, useEffect } from 'react'
import SingleCard from '@/components/ui/SingleCard'
import { ChevronLeft, ChevronRight } from 'lucide-react' // Iconlar uchun
import clsx from 'clsx' // Dinamik class qo'shish uchun

const ITEMS_PER_PAGE = 8

const ProductCard = () => {
    const { data, isLoading, error } = getAll()
    const [currentPage, setCurrentPage] = useState(1)
    const [paginatedData, setPaginatedData] = useState<ProductsType[]>([])

    useEffect(() => {
        if (data && Array.isArray(data)) {
            const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
            const endIndex = startIndex + ITEMS_PER_PAGE
            setPaginatedData(data.slice(startIndex, endIndex))
        }
    }, [data, currentPage])

    const totalPages = Math.ceil((data?.length || 0) / ITEMS_PER_PAGE)

    return (
        <div className="p-6">
            {isLoading ? (
                <p>Loading products...</p>
            ) : error ? (
                <p>Error loading products</p>
            ) : (
                <div>
                    <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                        {paginatedData.map((item: ProductsType, index: number) => (
                            <SingleCard key={index} item={item} />
                        ))}
                    </div>
                    
                    {/* Pagination */}
                    <div className="flex justify-center mt-8">
                        <div className="flex items-center space-x-2 bg-gray-100 p-2 rounded-lg shadow-md">
                            <button 
                                className={`px-3 py-2 rounded-lg ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-300"} transition`} 
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            >
                                <ChevronLeft size={20} />
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    className={clsx(
                                        "px-4 py-2 rounded-lg transition",
                                        currentPage === i + 1
                                            ? "bg-blue-500 text-white font-bold"
                                            : "hover:bg-gray-200 text-gray-700"
                                    )}
                                    onClick={() => setCurrentPage(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button 
                                className={`px-3 py-2 rounded-lg ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-300"} transition`} 
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductCard