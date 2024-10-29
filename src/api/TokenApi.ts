import { axiosInstance } from '@/api/axiosInstance'
import { NextResponse } from 'next/server'

/**
 *  토큰 발급
 */
export const requestToken = async (payload: FormData)  => {
    try {
        return await axiosInstance.post('/token', payload)
    } catch (error: any) {
        return ({
            status: error.status,
            data: error.response.data
        })
    }
}