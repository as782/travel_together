/**
 * 计算从给定时间字符串到当前时间的天数差异。
 * @param dateString 要计算差异的时间字符串，应为 ISO 8601 格式（例如："1990-05-14T15:00:00.000Z"）。
 * @returns 返回从给定时间字符串到当前时间的天数差异。
 */
function calculateDiffDate(dateString: string | undefined): number {

    if (!dateString) {
        return NaN;
    }

  // 解析给定的时间字符串
  const givenDate: Date = new Date(dateString)

  // 获取当前时间
  const currentDate: Date = new Date()

  // 计算时间差异（以毫秒为单位）
  const timeDifference: number = currentDate.getTime() - givenDate.getTime()

  // 将毫秒转换为天数
  const daysDifference: number = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

  return daysDifference
}

export { calculateDiffDate }
