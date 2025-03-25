"use client"
import { instance } from '@/hook/instance'
import { useQuery } from '@tanstack/react-query'

const getAll = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await instance().get('/products')
            return response.data
        }
    })
    return { data, error, isLoading }
}

export default getAll