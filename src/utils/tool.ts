/**
 * 计算从给定时间字符串到当前时间的天数差异。
 * @param dateString 要计算差异的时间字符串，应为 ISO 8601 格式（例如："1990-05-14T15:00:00.000Z"）。
 * @returns 返回从给定时间字符串到当前时间的天数差异。
 */
function calculateDiffDate(dateString: string | undefined): number {
  if (!dateString) {
    return NaN
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

/** ISO birthday 妆化为年龄 */
function calculateAge(dateString: string | undefined): number {
  if (!dateString) {
    return NaN
  }
  const birthday: Date = new Date(dateString)
  const today: Date = new Date()
  const age: number = today.getFullYear() - birthday.getFullYear()

  return age
}

/**
 * 计算从给定时间字符串到当前时间的时间差异，并以秒、分钟、小时、天、月、年的形式返回。
 * @param dateString 要计算差异的时间字符串，应为 ISO 8601 格式（例如："1990-05-14T15:00:00.000Z"）。
 * @returns 返回从给定时间字符串到当前时间的时间差异。
 */
function getTimeDiffString(dateString: string | undefined): string {
  if (!dateString) {
    return 'Invalid date'
  }

  // 解析给定的时间字符串
  const givenDate: Date = new Date(dateString)
  const currentDate: Date = new Date()

  // 计算时间差异（以毫秒为单位）
  const timeDifference: number = currentDate.getTime() - givenDate.getTime()

  // 转换为秒
  const secondsDifference: number = Math.floor(timeDifference / 1000)
  if (secondsDifference < 60) {
    return secondsDifference + '秒前'
  }

  // 转换为分钟
  const minutesDifference: number = Math.floor(secondsDifference / 60)
  if (minutesDifference < 60) {
    return minutesDifference + '分钟前'
  }

  // 转换为小时
  const hoursDifference: number = Math.floor(minutesDifference / 60)
  if (hoursDifference < 24) {
    return hoursDifference + '小时前'
  }

  // 转换为天数
  const daysDifference: number = Math.floor(hoursDifference / 24)
  if (daysDifference < 30) {
    return daysDifference + '天前'
  }

  // 转换为月份
  const monthsDifference: number = Math.floor(daysDifference / 30)
  if (monthsDifference < 12) {
    return monthsDifference + '月前'
  }

  // 转换为年份
  const yearsDifference: number = Math.floor(monthsDifference / 12)
  return yearsDifference + '年前'
}

export { calculateDiffDate, calculateAge, getTimeDiffString }
