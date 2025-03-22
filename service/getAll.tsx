"use client"
import { instance } from '@/hook/instance'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

const getAll = () => {
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
    return { data, error, isLoading }
}

export default getAll