import { CustomButtonProps } from '@/types/Types'
import theme from '@/utils/theme'
import { Button } from '@mui/material'

const BlackOutlinedButton = ({ children, ...props }: CustomButtonProps ) => {
  return (
    <Button variant="outlined" size="large" 
    {...props}
    sx={
        {
        ':hover':{
         backgroundColor: theme.palette.background.black,
         color: "white",
        },
        border: `2px solid ${theme.palette.background.black} !important`,
        width: "150px"
    }}
    >
      {children}
    </Button>
  )
}

export default BlackOutlinedButton
