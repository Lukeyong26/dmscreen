import React from 'react'
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

function Footer() {
    const [value, setValue] = React.useState(0);
    return (
        <Box sx={{ position: 'fixed', bottom: 0, right: 0}}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
            }}
        >
                <BottomNavigationAction label="Recents"/>
                <BottomNavigationAction label="Favorites" />
                <BottomNavigationAction label="Nearby"/>
            </BottomNavigation>
        </Box>
    )
}

export default Footer