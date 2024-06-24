import { CustomHeadingProps } from '@/types/Types'
import { Typography } from '@mui/material'

const TitleHeadings = ({ children, ...props }: CustomHeadingProps ) => {
  return (
    <Typography
    {...props}
    variant="h3" fontWeight={500} sx={{ mb: 2 }}>
        {children}
      </Typography>
  )
}

export default TitleHeadings
