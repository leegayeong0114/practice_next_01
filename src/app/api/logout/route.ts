import { TokenResponse } from '@/types/Token'
import {NextRequest, NextResponse} from 'next/server'
import { cookies } from 'next/headers'

export async function POST(
    req: NextRequest,
    res: NextResponse,
) {
    if (req.method === 'POST') {
        try {
            const { access_token, refresh_token } = await req.json() as TokenResponse
            if (access_token && refresh_token) {

                const cookieStore = cookies()

                cookieStore.set('accessToken', access_token, {
                    path: '/',
                    maxAge: 60 * 60 * 24,
                    httpOnly: false,
                    secure: process.env.NODE_ENV === 'production', // 배포 환경일 때만 secure: true
                    sameSite: 'lax',
                })

                cookieStore.set('refreshToken', refresh_token, {
                    path: '/',
                    maxAge: 60 * 60 * 24,
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production', // 배포 환경일 때만 secure: true
                    sameSite: 'lax',
                })

                return NextResponse.json({
                    status: 200,
                    message: '토큰 저장 성공',
                })
            } else {
                return NextResponse.json({
                    status: 500,
                    message: '토큰 저장 실패 | 토큰이 존재하지 않습니다.',
                })
            }
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