

export const handleClose = (clearMessages: ()=> void, event?: React.SyntheticEvent | Event, reason?: string,) => {
    if (reason === 'clickaway') {
      return;
    }
    clearMessages();
};
