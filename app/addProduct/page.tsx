"use client"
import { instance } from '@/hook/instance'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'

const AddProduct = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (newProduct: { title: string, description: string, price: number, category: string, image: string }) => {
      return instance().post('/products', newProduct, {
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => console.log(res))
        .catch(err => console.log(err))
    },
    onSuccess: (newProduct) => {
      console.log("Products query invalidated!");
      queryClient.invalidateQueries(['products'])
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newProduct = { title, description, price: parseFloat(price), category: "electronics", image }
    mutation.mutate(newProduct)
  }


  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Add New Product</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter product title" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter product description" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
            Price
          </label>
          <input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter product price" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
            Image URL
          </label>
          <input id="image" type="file" onChange={(e) => setImage(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Product</button>
        </div>
      </form>
    </div>
  )
}

export default AddProduct