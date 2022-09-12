import React from 'react'
import { AppBar, Box, Container, Grid, MenuItem, Paper, Toolbar, Typography } from '@mui/material'
import RamenDiningIcon from '@mui/icons-material/RamenDining';

import Image from '../../images/hero--image.jpg'

export default function HomeIP() {
    const pages = ['Meal Plans', 'Recipes', 'Ingredients', 'Sign In', 'Sign Up']

    return (
        <>
            <AppBar position="static">
                <Container maxwidth="x1">
                    <Toolbar disableGutters>
                        <RamenDiningIcon sx={{display: {xs: 'none', md: 'flex', }, mr: 1}} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#"
                            sx={{
                                mr: 2,
                                display: {xs: 'none', md: 'flex'},
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                            >
                                ThymeToCook
                            </Typography>
                            <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                                {pages.map(page => (
                                    <MenuItem key={page}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Paper
            sx={{
                position: 'relative',
                backgroundColor: 'grey.800',
                color: '#fff',
                mb: 4,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url(${Image})`
            }}>
            {<img src={`url(${Image})`} alt="" />}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    backgroundColor: 'rgba(0,0,0,.3)',
                }}
            />
            <Grid container>
                <Grid item md={6}>
                    <Box
                        sx={{
                            position: 'relative',
                            p: {xs: 3, md:6},
                            pr: {md: 0}
                        }}
                    >
                        <Typography
                            component="h1"
                            variant="h3"
                            color="inherit"
                            paragraph>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </Typography>
                    </Box>
                </Grid>
            </Grid>

        </Paper>
        </>
    )
}

