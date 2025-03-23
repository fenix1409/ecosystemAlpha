"use client"
import React from 'react'
import { useSelector } from 'react-redux'
import SingleCard from '@/components/ui/SingleCard'
import { ProductsType } from '@/types/prodcutsType'
import { RootState } from '@/store/store'

const Like = () => {
  const likedList = useSelector((state: RootState) => state.liked.orderList)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Liked Products</h1>
      {likedList.length === 0 ? (
        <p>No liked products</p>
      ) : (
        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {likedList.map((item: ProductsType, index: number) => (
            <SingleCard key={index} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Like