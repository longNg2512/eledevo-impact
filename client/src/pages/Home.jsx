import React, { Component } from 'react'
import Button from '@mui/material/Button'
import Grid2 from '@mui/material/Unstable_Grid2'
import { Link } from 'react-router-dom'

export default class Home extends Component {
    render() {
        return (
            <div>
                <Grid2
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{ minHeight: '100vh' }}
                >
                    <Link to="user">
                        <Button color={'success'} variant="outlined">
                            Login
                        </Button>
                    </Link>
                </Grid2>
            </div>
        )
    }
}
