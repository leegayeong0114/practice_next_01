import {NextRequest, NextResponse} from 'next/server'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
    if (req.method === 'POST') {
        try {
            const cookieStore = cookies()

            cookieStore.delete('accessToken')
            cookieStore.delete('refreshToken')

           return NextResponse.redirect('/')
        } catch (error) {
            return NextResponse.json({
                status: 500,
                message: error,
            })
        }
    } else {
        return NextResponse.json({
            status: 405,
            message: `Method ${req.method} Not Allowed`,
        })
    }
}