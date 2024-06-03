import theme from '@/utils/theme'
import { Button, ButtonProps, ButtonTypeMap, ExtendButtonBase } from '@mui/material'
import { ReactNode } from 'react'

interface BlackOutlinedButtonProps extends Partial<ButtonProps> {
    children: ReactNode;
  }

const BlackOutlinedButton = ({ children, ...props }: BlackOutlinedButtonProps ) => {
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
