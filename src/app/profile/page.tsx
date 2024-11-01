import { getPostList } from '@/api/PostApi'
import { ResponseBoardListModel } from '@/types/Post'

export default async function PostList() {

    const response: ResponseBoardListModel = await getPostList()
    console.log(response)

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <div>{response.total_records}</div>
            <div>{response.total_pages}</div>
            <div>{response.board.bo_table}</div>
        </div>
    )
}
