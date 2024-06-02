import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';

type SubmitBtnProps = {
    onClick: () => void;
    text?: string;
};

const SubmitBtn: React.FC<SubmitBtnProps> = ({ onClick }) => {
    return (
            <Button
                sx={{
                    width: "100%",
                    height: "56px",
                    borderRadius: "8px",
                }}
                color='secondary'
                onClick={onClick}
                variant="contained"
            >
                Submit
            </Button>
    );
};

export default SubmitBtn;
