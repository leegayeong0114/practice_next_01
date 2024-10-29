'use client'
import { usePathname, useSearchParams } from 'next/navigation'

function Page() {

    const pathname = usePathname()
    const searchParams = useSearchParams()

    return (
        <div>
            유저 정보 id
            <div>
                pathname: {pathname}
            </div>
            <div>
                searchParams: {searchParams}
            </div>
        </div>
    )
}

export default Page