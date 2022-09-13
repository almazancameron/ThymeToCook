import React from 'react'

import Paper from '@mui/material'
import Image from '../../images/hero--image.jpg'


export default function Hero() {
    return(
        <Paper
            sx={{
                position: 'relative',
                backgroundColor: 'grey.800',
                color: '#fff',
                mb: 4,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url(${Image})`,
                marginBottom: '10px'
            }}>
        </Paper>
    )
}