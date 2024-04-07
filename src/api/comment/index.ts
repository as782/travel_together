import { http, type Result } from '@/utils/http/request'
import type { PostCommentParams } from './types'

/** 发布动态评论 */
export const publishDynamicPostComment = (data: PostCommentParams) => {
    return http.post<Result<any>>('/comment/publishDynamicComment', data)
}

/** 发布组队评论 */
export const publishTeamPostComment = (data:PostCommentParams)=>{
    return http.post<Result<any>>('/comment/publishTeamComment',data)
}