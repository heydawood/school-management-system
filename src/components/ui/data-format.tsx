'use client'
import { format } from 'date-fns'

interface DateFormatChangeProps {
  dateString: any
  formatStyle?: string
}

const DateFormatChange: React.FC<DateFormatChangeProps> = ({
  dateString,
  formatStyle = 'dd MMMM yyyy',
}) => {
  const date = new Date(dateString)
  const formattedDate = format(date, formatStyle)

  return <span className=''>{formattedDate}</span>
}

export default DateFormatChange
