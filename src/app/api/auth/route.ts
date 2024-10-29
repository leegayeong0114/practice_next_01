import { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from 'cookies-next'
import { TokenResponse } from '@/types/Token'
import { NextResponse } from 'next/server'

export async function POST(
    req: NextApiRequest,
    res: NextApiResponse,
) {

    console.log('==========================================================')
    console.log('/api/auth 입장')
    if (req.method === 'POST') {
        try {
            const { access_token, refresh_token } = await req.body as TokenResponse
            if (access_token && refresh_token) {
                setCookie('accessToken', access_token, {
                    req,
                    res,
                    path: '/',
                    maxAge: 60 * 60 * 24,
                    httpOnly: false,
                    secure: process.env.NODE_ENV === 'production', // 배포 환경일 때만 secure: true
                    sameSite: 'lax',
                })

                setCookie('refreshToken', refresh_token, {
                    req,
                    res,
                    path: '/',
                    maxAge: 60 * 60 * 24,
                    httpOnly: false,
                    secure: process.env.NODE_ENV === 'production', // 배포 환경일 때만 secure: true
                    sameSite: 'lax',
                })

                return NextResponse.json({
                    status: 200,
                    message: '토큰 저장 성공',
                })
            } else {
                // return res.json({
                //     status: 'success',
                //     message: '토큰 저장 실패 | 토큰이 존재하지 않습니다.'
                // })
                // res.statusCode = 500
                // res.statusMessage = '토튼 저장 실패 | 토큰이 존재하지 않습니다.'
                // return res
                return NextResponse.json({
                    status: 500,
                    message: '토큰 저장 실패1 | 토큰이 존재하지 않습니다.',
                })
            }
        } catch (error) {
            // return res.json({
            //     status: 'success',
            //     message: '토큰 저장 실패'
            // })
            // res.statusCode = 500
            // res.statusMessage = '토튼 저장 실패'
            // return res
            return NextResponse.json({
                status: 500,
                message: '토큰 저장 실패2',
            })
        }
    } else {
        // res.setHeader('Allow', ['POST'])
        // res.status(405)
        // res.end(`Method ${req.method} Not Allowed`)
        return NextResponse.json({
            status: 500,
            message: '토큰 저장 실패3',
        })
    }
}