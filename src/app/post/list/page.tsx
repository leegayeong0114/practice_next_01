import { getPostList } from '@/api/PostApi'
import { ResponseBoardListModel } from '@/types/Post'

export default async function PostList() {

    const response: ResponseBoardListModel = await getPostList()
    console.log(response)

    return (
        <div className="bg-gray-50 py-24 sm:py-32 min-h-svh">
            <div>{response.total_records}</div>
            <div>{response.total_pages}</div>
            <div>{response.board.bo_table}</div>
        </div>
    )
}
