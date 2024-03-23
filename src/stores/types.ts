/** 数据加载状态类型
 *  idle: 请求未开始
 *  loading:请求正在进行中
 *  succeeded: 请求成功我们现在有了我们需要的数据
 *  failed:请求失败，可能有错误信息
 */
export interface DataState<T> {
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  data: T
}
