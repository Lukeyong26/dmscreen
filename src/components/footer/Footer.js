import React from 'react'
import Box from '@mui/material/Box';
import { Button } from '@mui/material';

function Footer() {
    return (
        <Box sx={{
            position: 'fixed', 
            width:1, height: 60,
            bottom: 0, 
            bgcolor: 'black',
        }}>
            <Box sx={{ 
                position: 'absolute',
                right: '10px',
                top: '10px',
                bgcolor: 'white'
            }}>
                <Button>Add</Button>
            </Box>
        </Box>
    )
}

export default Footer