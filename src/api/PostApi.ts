import {axiosInstance} from '@/api/axiosInstance'

/**
 *  목록 조회
 */
export const getPostList = async ()  => {
    const { data } = await axiosInstance.get('/boards/notice/writes?bo_table=notice')
    return data
}