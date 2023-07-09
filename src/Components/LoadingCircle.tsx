import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function LoadingCircle() {
  return (
    <Box sx={{display: "flex", height: "70vh", alignItems: "center", width: "50%", justifyContent: "center"}}>
      <CircularProgress color="primary" size={100} sx={{ zIndex: 500001 }} />
    </Box>
  );
}